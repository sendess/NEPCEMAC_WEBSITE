/** Content that never changes at a given URL (uploaded photos). */
export function cacheImmutable(headers: Headers) {
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Netlify-CDN-Cache-Control', 'public, durable, max-age=31536000, immutable');
}

export function noStore(headers: Headers) {
  headers.set('Cache-Control', 'private, no-store');
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
