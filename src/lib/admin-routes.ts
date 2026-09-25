export const LOGIN = '/admin/login';
export const CODE = '/admin/code';
export const SETUP = '/admin/two-factor';

/** Pages anyone may open: signing in and out, and the one-time links for invitations and password resets. */
export const OPEN_PAGES = new Set([LOGIN, '/admin/logout', '/admin/welcome']);

/** Only the owner manages accounts and reads the full activity log. */
export const OWNER_ONLY = ['/admin/users', '/admin/log'];

/** Only same-site admin paths may be returned to after signing in. */
export function safeNext(next: string | null | undefined): string {
  return next && /^\/admin(\/[\w\-/]*)?(\?[\w\-=&%.]*)?$/.test(next) && !next.startsWith(LOGIN) ? next : '/admin';
}

export const isAdminArea = (path: string) => path === '/admin' || path.startsWith('/admin/') || path.startsWith('/api/admin/');

export const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);
