// Content for the public pages. With a database (DATABASE_URL) it comes from what staff entered in
// the admin panel; without one, from the files in src/data. Public pages are built ahead of time,
// so these run during `astro build` (and on each page view in `astro dev`).
//
// If the database is set but can't be reached, the build fails on purpose: the previous version of
// the site stays online, instead of a version that has quietly lost the staff's changes.
import { hasDatabase, sql } from './db';
import { mediaUrl, type PhotoRef } from './photos';
import { activities as staticActivities } from '~/data/activities';
import { figures as staticFigures, type Figures } from '~/data/figures';
import { photoCaptions } from '~/data/photos';
import { org } from '~/data/site';
import { advisors as staticAdvisors, board as staticBoard, type Person } from '~/data/team';
import type { L } from '~/i18n/utils';

export type ActivityKind = 'campaign' | 'visit' | 'training' | 'notice' | 'compost';

export type SiteActivity = {
  id: string;
  date?: string;
  approx?: 'month' | 'year';
  kind: ActivityKind;
  title: L;
  /** Paragraphs separated by a blank line. */
  body: L;
  facts: { label: L; value: L }[];
  photos: { ref: PhotoRef; alt: L }[];
  photoNote?: L;
};

export type Contact = { email: string; phones: string[]; address: L; hours: L; facebook: string };

export type Notice = { id: string; title: L; body: L; link?: { url: string; label: L }; startsOn?: string; endsOn?: string };

/** Fills an empty language with the other one, so a page never shows a blank. */
const pair = (en: string | null | undefined, ne: string | null | undefined): L => ({ en: en || ne || '', ne: ne || en || '' });

const optionalPair = (en: string, ne: string): L | undefined => (en || ne ? pair(en, ne) : undefined);

// Each build reads the database once, however many pages use the data. `astro dev` reads it on every
// page view, so edits show up on reload. The admin panel asks for `fresh` data.
function once<T>(load: () => Promise<T>): (fresh?: boolean) => Promise<T> {
  let cached: Promise<T> | null = null;
  return (fresh = false) => (fresh || import.meta.env.DEV ? load() : (cached ??= load()));
}

/* ---------------- Settings ---------------- */

const loadSettings = once(async () => {
  if (!hasDatabase) return new Map<string, unknown>();
  const rows = await sql`select key, value from site_settings`;
  return new Map(rows.map((r) => [r.key as string, r.value as unknown]));
});

export async function getContact(fresh = false): Promise<Contact> {
  const fallback: Contact = { email: org.email, phones: org.phones, address: org.address, hours: org.hours, facebook: org.facebook };
  const saved = (await loadSettings(fresh)).get('contact') as Partial<Contact> | undefined;
  if (!saved) return fallback;
  return {
    email: saved.email || fallback.email,
    phones: saved.phones?.length ? saved.phones : fallback.phones,
    address: saved.address ? pair(saved.address.en, saved.address.ne) : fallback.address,
    hours: saved.hours ? pair(saved.hours.en, saved.hours.ne) : fallback.hours,
    facebook: saved.facebook || fallback.facebook,
  };
}

export async function getFigures(fresh = false): Promise<Figures> {
  const saved = (await loadSettings(fresh)).get('figures') as Partial<Figures> | undefined;
  return { ...staticFigures, ...saved };
}

/* ---------------- Activities ---------------- */

type ActivityRow = {
  slug: string;
  date: string | null;
  approx: 'month' | 'year' | null;
  kind: ActivityKind;
  title_en: string;
  title_ne: string;
  body_en: string;
  body_ne: string;
  facts: { label: L; value: L }[];
  photos: { src: string; caption_en: string; caption_ne: string }[];
  photo_note_en: string;
  photo_note_ne: string;
};

export const getActivities = once(async (): Promise<SiteActivity[]> => {
  if (!hasDatabase) {
    return staticActivities.map((a) => ({
      id: a.id,
      date: a.date,
      approx: a.approx,
      kind: a.kind,
      title: a.title,
      body: { en: a.text.map((p) => p.en).join('\n\n'), ne: a.text.map((p) => p.ne).join('\n\n') },
      facts: a.facts ?? [],
      photos: a.photos.map((slug) => ({ ref: slug, alt: photoCaptions[slug] })),
      photoNote: a.photoNote,
    }));
  }
  const rows = (await sql`
    select slug, to_char(date, 'YYYY-MM-DD') as date, approx, kind, title_en, title_ne, body_en, body_ne, facts, photos,
      photo_note_en, photo_note_ne
    from activities where visible
    order by date desc nulls last, created_at desc`) as ActivityRow[];
  const media = await mediaSizes(rows.flatMap((r) => r.photos.map((p) => p.src)));
  return rows.map((r) => {
    const title = pair(r.title_en, r.title_ne);
    return {
      id: r.slug,
      date: r.date ?? undefined,
      approx: r.approx ?? undefined,
      kind: r.kind,
      title,
      body: pair(r.body_en, r.body_ne),
      facts: r.facts,
      photos: r.photos.flatMap((p) => {
        const ref = photoRef(p.src, media);
        return ref ? [{ ref, alt: optionalPair(p.caption_en, p.caption_ne) ?? title }] : [];
      }),
      photoNote: optionalPair(r.photo_note_en, r.photo_note_ne),
    };
  });
});

type SizeMap = Map<string, { width: number; height: number }>;

/** Width and height of the uploaded photos among `srcs`, needed to lay out their <img> tags. */
async function mediaSizes(srcs: string[]): Promise<SizeMap> {
  const ids = srcs.filter((s) => s.startsWith('media:')).map((s) => s.slice(6));
  if (ids.length === 0) return new Map();
  const rows = await sql`select id::text, width, height from media where id = any(${ids}::uuid[])`;
  return new Map(rows.map((r) => [r.id as string, { width: Number(r.width) || 1600, height: Number(r.height) || 1067 }]));
}

/** "photo:<slug>" → slug; "media:<uuid>" → uploaded photo; null when the file is gone. */
function photoRef(src: string, media: SizeMap): PhotoRef | null {
  if (src.startsWith('photo:')) return src.slice(6) in photoCaptions ? src.slice(6) : null;
  if (src.startsWith('media:')) {
    const size = media.get(src.slice(6));
    return size ? { media: src.slice(6), ...size } : null;
  }
  return null;
}

/* ---------------- Team ---------------- */

type TeamRow = {
  grp: 'board' | 'advisor';
  name_en: string;
  name_ne: string;
  role_en: string;
  role_ne: string;
  note_en: string;
  note_ne: string;
  photo: string | null;
};

export const getTeam = once(async (): Promise<{ board: Person[]; advisors: Person[] }> => {
  if (!hasDatabase) return { board: staticBoard, advisors: staticAdvisors };
  const rows = (await sql`
    select grp, name_en, name_ne, role_en, role_ne, note_en, note_ne, photo
    from team_members where visible order by grp, sort_order, created_at`) as TeamRow[];
  const toPerson = (r: TeamRow): Person => ({
    name: pair(r.name_en, r.name_ne),
    role: pair(r.role_en, r.role_ne),
    note: optionalPair(r.note_en, r.note_ne),
    photo: r.photo?.startsWith('team:') ? r.photo.slice(5) : r.photo?.startsWith('media:') ? mediaUrl(r.photo.slice(6), true) : undefined,
  });
  return {
    board: rows.filter((r) => r.grp === 'board').map(toPerson),
    advisors: rows.filter((r) => r.grp === 'advisor').map(toPerson),
  };
});

/* ---------------- Notices ---------------- */

/**
 * Notices that are, or will become, current. The page is built ahead of time, so the browser
 * hides a notice before its start date or after its end date (see NoticeBar).
 */
export const getNotices = once(async (): Promise<Notice[]> => {
  if (!hasDatabase) return [];
  const rows = await sql`
    select id::text, title_en, title_ne, body_en, body_ne, link_url, link_label_en, link_label_ne,
      to_char(starts_on, 'YYYY-MM-DD') as starts_on, to_char(ends_on, 'YYYY-MM-DD') as ends_on
    from notices
    where visible and (ends_on is null or ends_on >= (now() at time zone 'Asia/Kathmandu')::date)
    order by coalesce(starts_on, created_at::date) desc, created_at desc
    limit 3`;
  return rows.map((r) => ({
    id: r.id,
    title: pair(r.title_en, r.title_ne),
    body: pair(r.body_en, r.body_ne),
    link: r.link_url ? { url: r.link_url, label: pair(r.link_label_en || 'Read more', r.link_label_ne || 'थप पढ्नुहोस्') } : undefined,
    startsOn: r.starts_on ?? undefined,
    endsOn: r.ends_on ?? undefined,
  }));
});
