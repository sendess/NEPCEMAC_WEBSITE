// Photos uploaded in the admin panel. The browser resizes them before upload (src/scripts/image-upload.ts),
// so each is stored as a large copy (up to 1600 px) and a small one (640 px) of roughly 150 KB and 40 KB.
import { sql } from './db';
import { logQuery, type Actor } from './audit';

export type MediaType = 'image/webp' | 'image/jpeg' | 'image/png';

export const MEDIA_MAX_BYTES = 2_000_000;
export const MEDIA_SMALL_MAX_BYTES = 400_000;
/** Neon's free plan allows about 0.5 GB for the whole database. */
export const STORAGE_LIMIT_BYTES = 512 * 1024 * 1024;

/** Check the file signature, not just the declared type. */
export function sniffImageType(b: Uint8Array): MediaType | null {
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50)
    return 'image/webp';
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  return null;
}

export async function createMedia(
  actor: Actor,
  file: { bytes: Uint8Array; type: MediaType },
  small: Uint8Array | null,
  width: number | null,
  height: number | null,
) {
  const [row] = await sql`
    insert into media (content_type, bytes, small_bytes, width, height, size_bytes, created_by)
    values (${file.type}, ${Buffer.from(file.bytes)}, ${small ? Buffer.from(small) : null}, ${width}, ${height},
      ${file.bytes.length + (small?.length ?? 0)}, ${actor.email})
    returning id::text`;
  const id = String(row.id);
  await logQuery(actor, 'upload', { entity: 'media', entityId: id, label: `${Math.round(file.bytes.length / 1024)} KB` });
  return id;
}

export async function getMedia(id: string, small: boolean): Promise<{ bytes: Buffer; content_type: MediaType } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [row] = small
    ? await sql`select coalesce(small_bytes, bytes) as bytes, content_type from media where id = ${id}`
    : await sql`select bytes, content_type from media where id = ${id}`;
  return (row as { bytes: Buffer; content_type: MediaType }) ?? null;
}

/**
 * Removes uploads nothing uses any more (photos taken out of an activity, replaced portraits, uploads in
 * forms that were never saved). Uploads from the last day are kept: someone may still be filling in a form.
 */
export async function removeUnusedMedia() {
  await sql`
    delete from media m
    where m.created_at < now() - interval '1 day'
      and not exists (select 1 from activities a where a.photos::text like '%' || m.id::text || '%')
      and not exists (select 1 from team_members t where t.photo = 'media:' || m.id::text)`;
}

export async function storageUsed(): Promise<{ photos: number; bytes: number; database: number }> {
  const [row] = await sql`
    select count(*)::int as photos, coalesce(sum(size_bytes), 0)::bigint as bytes, pg_database_size(current_database()) as database
    from media`;
  return { photos: Number(row.photos), bytes: Number(row.bytes), database: Number(row.database) };
}
