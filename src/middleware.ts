import { defineMiddleware } from 'astro:middleware';
import type { AuthStage } from './lib/auth';
import { CODE, LOGIN, OPEN_PAGES, OWNER_ONLY, SETUP, isAdminArea, safeNext, trimSlash } from './lib/admin-routes';

/** The page this sign-in stage belongs on, or null if the requested page may be shown. */
function redirectFor(stage: AuthStage, path: string, url: URL): string | null {
  const here = path === LOGIN || path === CODE ? url.searchParams.get('next') : path + url.search;
  const withNext = (page: string) => {
    const next = safeNext(here);
    return next === '/admin' ? page : `${page}?next=${encodeURIComponent(next)}`;
  };
  switch (stage) {
    case 'ok':
      return path === LOGIN || path === CODE ? safeNext(url.searchParams.get('next')) : null;
    case 'needs-code':
      return path === CODE ? null : withNext(CODE);
    case 'needs-setup':
      return path === SETUP ? null : SETUP;
    default:
      return path === LOGIN ? null : withNext(LOGIN);
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.admin = null;
  context.locals.access = null;
  const { pathname } = context.url;
  if (context.isPrerendered || !isAdminArea(pathname)) return next();

  const path = trimSlash(pathname);
  const headers = (response: Response) => {
    // Copy so headers are writable.
    const out = new Response(response.body, response);
    out.headers.set('Cache-Control', 'private, no-store');
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    out.headers.set('Referrer-Policy', 'same-origin');
    out.headers.set('X-Frame-Options', 'DENY');
    return out;
  };

  // Loaded only for admin requests, so building the public pages never needs the admin secrets.
  const { hasDatabase } = await import('./lib/db');
  if (!hasDatabase) {
    return headers(new Response('The admin panel needs a database (DATABASE_URL is not set).', { status: 503 }));
  }
  const { findAdmin, resolveAccess } = await import('./lib/auth');
  const access = await resolveAccess(context.cookies);

  // Local development only: act as an existing account without password or code (DEV_ADMIN_EMAIL in
  // .env.development.local), to check pages in a browser. Production builds leave this branch out.
  if (import.meta.env.DEV && access.stage !== 'ok' && import.meta.env.DEV_ADMIN_EMAIL) {
    const devAdmin = await findAdmin(String(import.meta.env.DEV_ADMIN_EMAIL).toLowerCase());
    if (devAdmin) Object.assign(access, { stage: 'ok', admin: devAdmin });
  }
  context.locals.access = access;
  context.locals.admin = access.stage === 'ok' ? access.admin : null;

  const ownerOnly = OWNER_ONLY.some((p) => path === p || path.startsWith(`${p}/`));
  const allowed = !ownerOnly || access.admin?.role === 'owner';
  const json = (message: string, status: number) =>
    new Response(JSON.stringify({ message }), { status, headers: { 'content-type': 'application/json' } });

  if (path.startsWith('/api/admin/')) {
    if (access.stage !== 'ok') return headers(json('Sign in required', 401));
    return headers(allowed ? await next() : json('Only the owner can do this', 403));
  }
  if (OPEN_PAGES.has(path)) {
    // Someone already signed in who opens the sign-in page goes on to the panel.
    const target = path === LOGIN ? redirectFor(access.stage, path, context.url) : null;
    return headers(target ? context.redirect(target, 303) : await next());
  }
  const target = redirectFor(access.stage, path, context.url);
  if (target) return headers(context.redirect(target, 303));
  if (!allowed) return headers(context.redirect('/admin?denied=1', 303));
  return headers(await next());
});
