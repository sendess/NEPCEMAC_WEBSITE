// Staff accounts: the owner invites people, changes roles and turns accounts off.
// Everyone can change their own password and recovery codes on "My account".
import { sql } from './db';
import { logQuery, type Actor } from './audit';
import { createLink, normalizeEmail, type AdminRole } from './auth';
import { hashPassword, passwordProblem, verifyPassword } from './tokens';

export type UserRow = {
  email: string;
  name: string;
  role: AdminRole;
  totp_enabled: boolean;
  disabled: boolean;
  has_password: boolean;
  created_at: string;
  last_sign_in_at: string | null;
  invite_expires_at: string | null;
};

export async function listUsers(): Promise<UserRow[]> {
  return (await sql`
    select u.email, u.name, u.role, u.totp_enabled, u.disabled, u.password_hash is not null as has_password,
      u.created_at, u.last_sign_in_at,
      (select max(i.expires_at) from admin_invites i
       where i.email = u.email and i.used_at is null and i.expires_at > now()) as invite_expires_at
    from admin_users u
    order by u.disabled, u.role = 'owner' desc, u.name, u.email`) as UserRow[];
}

export const emailProblem = (email: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : 'Enter a valid email address.');

/** Adds (or re-invites) a person. Returns the one-time link to send them. */
export async function inviteUser(actor: Actor, rawEmail: string, role: AdminRole, name: string) {
  const email = normalizeEmail(rawEmail);
  const [existing] = await sql`select password_hash is not null as active from admin_users where email = ${email}`;
  if (existing?.active) return { error: `${email} already has an account. Use “Reset password” if they are locked out.` };
  await sql.transaction([
    sql`insert into admin_users (email, role, name) values (${email}, ${role}, ${name})
        on conflict (email) do update set role = excluded.role, name = coalesce(nullif(excluded.name, ''), admin_users.name),
          disabled = false`,
    logQuery(actor, 'user_invited', { entity: 'admin_users', entityId: email, label: `${email} as ${role}` }),
  ]);
  return { link: await createLink(actor, email, 'invite'), email };
}

/** An owner can't lock themselves out, and there is always at least one working owner account. */
async function wouldLeaveNoOwner(email: string) {
  const [row] = await sql`
    select count(*)::int as n from admin_users
    where role = 'owner' and not disabled and password_hash is not null and email <> ${email}`;
  return Number(row.n) === 0;
}

export async function setRole(actor: Actor, email: string, role: AdminRole) {
  if (email === actor.email) return 'You can’t change your own role.';
  if (role !== 'owner' && (await wouldLeaveNoOwner(email))) return 'There must be at least one owner.';
  await sql.transaction([
    sql`update admin_users set role = ${role} where email = ${email}`,
    logQuery(actor, 'user_updated', { entity: 'admin_users', entityId: email, label: `Role set to ${role}` }),
  ]);
  return null;
}

export async function setDisabled(actor: Actor, email: string, disabled: boolean) {
  if (email === actor.email) return 'You can’t turn off your own account.';
  if (disabled && (await wouldLeaveNoOwner(email))) return 'There must be at least one owner.';
  await sql.transaction([
    sql`update admin_users set disabled = ${disabled} where email = ${email}`,
    // Turning an account off signs it out and cancels any unused link.
    ...(disabled
      ? [
          sql`delete from admin_sessions where email = ${email}`,
          sql`update admin_invites set used_at = now() where email = ${email} and used_at is null`,
        ]
      : []),
    logQuery(actor, disabled ? 'user_disabled' : 'user_enabled', { entity: 'admin_users', entityId: email, label: email }),
  ]);
  return null;
}

/** The person sets up their authenticator app again at next sign-in (lost phone). */
export async function resetTwoFactor(actor: Actor, email: string) {
  await sql.transaction([
    sql`update admin_users set totp_secret = null, totp_enabled = false, totp_last_step = null, recovery_codes = '[]'
        where email = ${email}`,
    sql`delete from admin_sessions where email = ${email}`,
    logQuery(actor, 'two_factor_reset', { entityId: email, label: `For ${email}` }),
  ]);
}

export async function removeUser(actor: Actor, email: string) {
  if (email === actor.email) return 'You can’t remove your own account.';
  if (await wouldLeaveNoOwner(email)) return 'There must be at least one owner.';
  const [row] = await sql`select password_hash is not null as active from admin_users where email = ${email}`;
  // People who have signed in stay in the list (turned off), so the activity log still makes sense.
  if (row?.active) return 'This person has signed in before. Turn the account off instead.';
  await sql.transaction([
    sql`delete from admin_users where email = ${email}`,
    logQuery(actor, 'user_removed', { entity: 'admin_users', entityId: email, label: `Invitation for ${email} withdrawn` }),
  ]);
  return null;
}

/* ---------------- My account ---------------- */

export async function changePassword(actor: Actor, email: string, current: string, next: string, keepTokenHash: string | null) {
  const [row] = await sql`select password_hash from admin_users where email = ${email}`;
  if (!(await verifyPassword(current, row?.password_hash ?? null))) {
    await logQuery(actor, 'password_change_failed');
    return 'Your current password is not right.';
  }
  const problem = passwordProblem(next, email);
  if (problem) return problem;
  await sql.transaction([
    sql`update admin_users set password_hash = ${await hashPassword(next)} where email = ${email}`,
    // Other devices must sign in again with the new password.
    sql`delete from admin_sessions where email = ${email} and token_hash is distinct from ${keepTokenHash}`,
    logQuery(actor, 'password_changed'),
  ]);
  return null;
}

export async function signOutOtherDevices(actor: Actor, email: string, keepTokenHash: string | null) {
  await sql.transaction([
    sql`delete from admin_sessions where email = ${email} and token_hash is distinct from ${keepTokenHash}`,
    logQuery(actor, 'sessions_revoked', { label: 'Signed out on other devices' }),
  ]);
}

export async function renameSelf(email: string, name: string) {
  await sql`update admin_users set name = ${name} where email = ${email}`;
}

export async function userExists(email: string): Promise<boolean> {
  return (await sql`select 1 from admin_users where email = ${email}`).length === 1;
}
