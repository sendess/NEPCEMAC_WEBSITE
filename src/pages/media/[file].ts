import type { APIRoute } from 'astro';
import { cacheImmutable } from '~/lib/cache';
import { getMedia } from '~/lib/media';

export const prerender = false;

/**
 * Uploaded photos: /media/<id>.webp (large) and /media/<id>-sm.webp (small).
 * An id never points at different bytes, so browsers and Netlify's CDN keep them for a year.
 */
export const GET: APIRoute = async ({ params }) => {
  const match = /^([0-9a-f-]{36})(-sm)?\.webp$/i.exec(params.file ?? '');
  const media = match ? await getMedia(match[1], Boolean(match[2])) : null;
  if (!media) return new Response('Not found', { status: 404, headers: { 'cache-control': 'no-store' } });
  const headers = new Headers({ 'content-type': media.content_type, 'x-content-type-options': 'nosniff' });
  cacheImmutable(headers);
  return new Response(new Uint8Array(media.bytes), { headers });
};
