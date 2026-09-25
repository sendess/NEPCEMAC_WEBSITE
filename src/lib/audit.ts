// Activity log: sign-ins, security events and every change made in the admin panel.
// The table refuses updates and deletes, so entries can't be quietly removed.
import { sql, type Query } from './db';

export type Actor = { email: string | null; ip: string | null; userAgent: string | null };

/** Who is making a request. `clientAddress` throws when unavailable, so it is read defensively. */
export function requestActor(ctx: { request: Request; clientAddress?: string }, email: string | null): Actor {
  let ip: string | null = null;
  try {
    ip = ctx.clientAddress ?? null;
  } catch {
    ip = null;
  }
  return {
    email,
    ip: ip?.slice(0, 64) ?? null,
    userAgent: ctx.request.headers.get('user-agent')?.slice(0, 300) ?? null,
  };
}

export type Detail = { entity?: string; entityId?: string | null; label?: string | null };

/** The insert on its own, to run inside a transaction with the change it describes. */
export function logQuery(actor: Actor, action: string, { entity = 'auth', entityId = null, label = null }: Detail = {}): Query {
  return sql`
    insert into audit_log (actor_email, action, entity, entity_id, label, ip, user_agent)
    values (${actor.email}, ${action}, ${entity}, ${entityId}, ${label?.slice(0, 300) ?? null}, ${actor.ip}, ${actor.userAgent})`;
}

export async function logEvent(actor: Actor, action: string, detail: Detail = {}) {
  await logQuery(actor, action, detail);
}

/** How often `action` happened in the last `minutes`: for this email, this IP address, and both together. */
export async function recentEvents(action: string, email: string | null, ip: string | null, minutes: number) {
  const [row] = await sql`
    select count(*) filter (where actor_email = ${email})::int as by_email,
           count(*) filter (where ip = ${ip})::int as by_ip,
           count(*) filter (where actor_email = ${email} and ip = ${ip})::int as by_email_ip
    from audit_log
    where action = ${action} and at > now() - make_interval(mins => ${minutes})`;
  return { byEmail: Number(row.by_email), byIp: Number(row.by_ip), byEmailIp: Number(row.by_email_ip) };
}

/* ---------------- Activity log page ---------------- */

export type AuditEntry = {
  id: number;
  at: string;
  actor_email: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  label: string | null;
  ip: string | null;
  user_agent: string | null;
};

export const AUDIT_KINDS = {
  changes: 'Content changes',
  'sign-ins': 'Sign-ins',
  security: 'Accounts and security',
} as const;

const SIGN_IN_ACTIONS = ['sign_in', 'sign_in_failed', 'sign_in_blocked', 'code_passed', 'code_failed', 'recovery_code_used', 'signed_out'];
const CHANGE_ENTITIES = ['activities', 'notices', 'team_members', 'site_settings', 'requests', 'media', 'site'];

export async function listAudit({ kind, person, page, pageSize = 50 }: { kind?: string; person?: string; page: number; pageSize?: number }) {
  const conds: Query[] = [];
  if (kind === 'changes') conds.push(sql`entity = any(${CHANGE_ENTITIES})`);
  else if (kind === 'sign-ins') conds.push(sql`action = any(${SIGN_IN_ACTIONS})`);
  else if (kind === 'security') conds.push(sql`not (entity = any(${CHANGE_ENTITIES})) and not (action = any(${SIGN_IN_ACTIONS}))`);
  if (person === 'system') conds.push(sql`actor_email is null`);
  else if (person) conds.push(sql`actor_email = ${person}`);
  const where = conds.reduce((acc, c) => sql`${acc} and ${c}`, sql`true`);
  const rows = (await sql`
    select id, at, actor_email, action, entity, entity_id, label, ip, user_agent, count(*) over()::int as total_count
    from audit_log where ${where}
    order by at desc, id desc
    limit ${pageSize} offset ${(page - 1) * pageSize}`) as (AuditEntry & { total_count: number })[];
  return { rows, total: rows.length ? Number(rows[0].total_count) : 0 };
}

/** Plain-language description of a log entry. */
export function describeAction(action: string): string {
  const words: Record<string, string> = {
    sign_in: 'Signed in (password)',
    sign_in_failed: 'Failed sign-in',
    sign_in_blocked: 'Sign-in paused after too many attempts',
    code_passed: 'Entered authenticator code',
    code_failed: 'Wrong authenticator code',
    recovery_code_used: 'Used a recovery code',
    signed_out: 'Signed out',
    two_factor_enabled: 'Set up authenticator app',
    two_factor_reset: 'Authenticator reset',
    recovery_codes_created: 'New recovery codes',
    password_changed: 'Changed password',
    password_change_failed: 'Password change failed',
    password_set: 'Set password from a link',
    password_reset_link: 'Password reset link created',
    user_invited: 'Invited',
    user_updated: 'Account changed',
    user_disabled: 'Account turned off',
    user_enabled: 'Account turned on',
    user_removed: 'Invitation withdrawn',
    sessions_revoked: 'Signed out everywhere',
    create: 'Added',
    update: 'Edited',
    delete: 'Deleted',
    status: 'Changed status',
    note: 'Added a note',
    upload: 'Uploaded a photo',
    publish: 'Published the website',
    publish_failed: 'Publishing failed',
  };
  return words[action] ?? action.replace(/_/g, ' ');
}
