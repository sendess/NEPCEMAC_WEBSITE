import type { APIRoute } from 'astro';
import { json } from '~/lib/cache';
import { requestActor } from '~/lib/audit';
import { createMedia, MEDIA_MAX_BYTES, MEDIA_SMALL_MAX_BYTES, sniffImageType } from '~/lib/media';
import { mediaUrl } from '~/lib/photos';

export const prerender = false;

/**
 * Photo upload for admin forms. The browser resizes the photo and makes the small copy first
 * (see src/scripts/image-upload.ts); the server re-checks type and size.
 */
export const POST: APIRoute = async (ctx) => {
  const admin = ctx.locals.admin;
  if (!admin) return json({ message: 'Sign in required' }, 401);

  const form = await ctx.request.formData().catch(() => null);
  const file = form?.get('file');
  const small = form?.get('small');
  if (!(file instanceof File)) return json({ message: 'No photo received.' }, 400);
  if (file.size > MEDIA_MAX_BYTES) return json({ message: 'The photo is larger than 2 MB after resizing.' }, 413);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniffImageType(bytes);
  if (!type) return json({ message: 'Only WebP, JPEG and PNG photos are accepted.' }, 415);

  let smallBytes: Uint8Array | null = null;
  if (small instanceof File && small.size > 0 && small.size <= MEDIA_SMALL_MAX_BYTES) {
    const candidate = new Uint8Array(await small.arrayBuffer());
    if (sniffImageType(candidate)) smallBytes = candidate;
  }

  const dimension = (name: string) => {
    const n = Number(form?.get(name));
    return Number.isInteger(n) && n > 0 && n <= 10000 ? n : null;
  };
  const id = await createMedia(requestActor(ctx, admin.email), { bytes, type }, smallBytes, dimension('width'), dimension('height'));
  return json({ id, url: mediaUrl(id), small: mediaUrl(id, true) }, 201);
};
