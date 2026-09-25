// Admin sign-in: email and password, then a 6-digit code from an authenticator app.
// The browser holds a random session token; the database keeps only its hash.
import type { AstroCookies } from 'astro';
import { sql } from './db';
import { logEvent, logQuery, recentEvents, type Actor } from './audit';
import { decryptSecret, encryptSecret } from './secrets';
import { hashRecoveryCode, newRecoveryCodes, newTotpSecret, verifyTotp } from './totp';
import { hashPassword, hashToken, newToken, verifyPassword } from './tokens';

export type AdminRole = 'owner' | 'editor';
export type AdminUser = { email: string; name: string; role: AdminRole; totpEnabled: boolean };

/** How far a visitor has got: no session → password accepted → authenticator set up → code entered. */
export type AuthStage = 'signed-out' | 'needs-setup' | 'needs-code' | 'ok';

export type AdminAccess = { stage: AuthStage; admin: AdminUser | null; tokenHash: string | null };

const SIGNED_OUT: AdminAccess = { stage: 'signed-out', admin: null, tokenHash: null };

// `__Host-` cookies must be Secure, which the local http:// server can't provide.
export const COOKIE = import.meta.env.DEV ? 'nc_admin' : '__Host-nc_admin';
/** A sign-in lasts a working day; after that the password and code are asked for again. */
const SESSION_HOURS = 12;
export const LOCK_MINUTES = 15;
/** Wrong passwords or codes allowed per person, per device (IP address), before a pause. */
const MAX_FAILURES_PER_EMAIL = 5;
/** Looser limits across all devices, so someone who knows an email can't easily keep that person locked out. */
const MAX_FAILURES_EMAIL_ANY_IP = 30;
const MAX_FAILURES_PER_IP = 20;

const tooMany = (f: { byEmail: number; byIp: number; byEmailIp: number }) =>
  f.byEmailIp >= MAX_FAILURES_PER_EMAIL || f.byEmail >= MAX_FAILURES_EMAIL_ANY_IP || f.byIp >= MAX_FAILURES_PER_IP;

export const normalizeEmail = (value: unknown) => String(value ?? '').trim().toLowerCase().slice(0, 160);

type UserRow = { email: string; name: string; role: AdminRole; totp_enabled: boolean };
const toAdmin = (row: UserRow): AdminUser => ({ email: row.email, name: row.name, role: row.role, totpEnabled: row.totp_enabled });

/* ---------------- Sessions ---------------- */

export async function findAdmin(email: string): Promise<AdminUser | null> {
  const [row] = (await sql`select email, name, role, totp_enabled from admin_users where email = ${email} and not disabled`) as UserRow[];
  return row ? toAdmin(row) : null;
}

/** Works out how far this request's session has got through sign-in. */
export async function resolveAccess(cookies: AstroCookies): Promise<AdminAccess> {
  const token = cookies.get(COOKIE)?.value;
  if (!token) return SIGNED_OUT;
  const tokenHash = hashToken(token);
  const [row] = (await sql`
    select u.email, u.name, u.role, u.totp_enabled, coalesce(s.code_ok_until > now(), false) as code_ok
    from admin_sessions s join admin_users u on u.email = s.email
    where s.token_hash = ${tokenHash} and s.expires_at > now() and not u.disabled and u.password_hash is not null`) as (UserRow & {
    code_ok: boolean;
  })[];
  if (!row) {
    cookies.delete(COOKIE, { path: '/' });
    return SIGNED_OUT;
  }
  const stage: AuthStage = !row.totp_enabled ? 'needs-setup' : row.code_ok ? 'ok' : 'needs-code';
  return { stage, admin: toAdmin(row), tokenHash };
}

async function startSession(cookies: AstroCookies, actor: Actor, email: string) {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_HOURS * 3600_000);
  await sql.transaction([
    sql`delete from admin_sessions where expires_at < now() - interval '1 day'`,
    sql`insert into admin_sessions (token_hash, email, expires_at, ip, user_agent)
        values (${hashToken(token)}, ${email}, ${expires}, ${actor.ip}, ${actor.userAgent})`,
  ]);
  cookies.set(COOKIE, token, {
    path: '/',
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: 'lax',
    expires,
  });
}

export async function signOut(cookies: AstroCookies, access: AdminAccess, actor: Actor) {
  if (access.tokenHash) await sql`delete from admin_sessions where token_hash = ${access.tokenHash}`;
  if (access.admin) await logEvent(actor, 'signed_out');
  cookies.delete(COOKIE, { path: '/' });
}

/** The code counts for the rest of this session. */
async function markCodeOk(access: AdminAccess) {
  await sql.transaction([
    sql`update admin_sessions set code_ok_until = expires_at, pending_totp_secret = null where token_hash = ${access.tokenHash}`,
    sql`update admin_users set last_sign_in_at = now() where email = ${access.admin!.email}`,
  ]);
}

/* ---------------- Password ---------------- */

export type SignInResult = { ok: true } | { ok: false; message: string };

export async function signIn(cookies: AstroCookies, actor: Actor, email: string, password: string): Promise<SignInResult> {
  if (tooMany(await recentEvents('sign_in_failed', email, actor.ip, LOCK_MINUTES))) {
    await logEvent(actor, 'sign_in_blocked');
    return { ok: false, message: `Too many failed attempts. Try again in ${LOCK_MINUTES} minutes.` };
  }
  const [row] = await sql`select password_hash, disabled from admin_users where email = ${email}`;
  // The password is checked even for unknown emails, so response times don't reveal who has an account.
  const passwordOk = await verifyPassword(password, row?.password_hash ?? null);
  if (!row || row.disabled || !passwordOk) {
    const why = !row ? 'No account with this email' : row.disabled ? 'Account is turned off' : 'Wrong password';
    await logEvent(actor, 'sign_in_failed', { label: why });
    return { ok: false, message: 'Wrong email or password.' };
  }
  await startSession(cookies, actor, email);
  await logEvent(actor, 'sign_in', { label: 'Password accepted' });
  return { ok: true };
}

/* ---------------- Authenticator code ---------------- */

const looksLikeRecoveryCode = (input: string) => /[a-z]/i.test(input) && input.replace(/[^a-z0-9]/gi, '').length === 10;

export type CodeResult = { ok: true; recoveryLeft?: number } | { ok: false; message: string; signedOut?: boolean };

/** A code from the app, or one of the printed recovery codes. */
export async function checkCode(cookies: AstroCookies, access: AdminAccess, actor: Actor, input: string): Promise<CodeResult> {
  const email = access.admin!.email;
  if (tooMany(await recentEvents('code_failed', email, actor.ip, LOCK_MINUTES))) {
    // Start again from the password, after the pause.
    await signOut(cookies, access, actor);
    return { ok: false, signedOut: true, message: `Too many wrong codes. Try again in ${LOCK_MINUTES} minutes.` };
  }

  if (looksLikeRecoveryCode(input)) {
    const hash = hashRecoveryCode(input);
    const [used] = await sql`
      update admin_users set recovery_codes = recovery_codes - ${hash}::text
      where email = ${email} and recovery_codes ? ${hash}::text
      returning jsonb_array_length(recovery_codes) as left`;
    if (!used) {
      await logEvent(actor, 'code_failed', { label: 'Recovery code not valid' });
      return { ok: false, message: 'That recovery code is not valid or was already used.' };
    }
    await markCodeOk(access);
    await logEvent(actor, 'recovery_code_used', { label: `${used.left} recovery codes left` });
    return { ok: true, recoveryLeft: Number(used.left) };
  }

  const [row] = await sql`select totp_secret, totp_last_step from admin_users where email = ${email}`;
  const step = row?.totp_secret
    ? verifyTotp(decryptSecret(row.totp_secret), input, row.totp_last_step === null ? null : Number(row.totp_last_step))
    : null;
  // Each code works once: the step is stored only if it is newer than the last one used.
  const accepted =
    step !== null &&
    (await sql`update admin_users set totp_last_step = ${step}
       where email = ${email} and (totp_last_step is null or totp_last_step < ${step}) returning 1`).length === 1;
  if (!accepted) {
    await logEvent(actor, 'code_failed');
    return { ok: false, message: 'That code is not right. Check the time on your phone and use the newest code.' };
  }
  await markCodeOk(access);
  await logEvent(actor, 'code_passed');
  return { ok: true };
}

/* ---------------- Setting up the authenticator ---------------- */

/** The key being set up; the same one is shown again if the page is reloaded. */
export async function pendingTotpSecret(access: AdminAccess): Promise<string> {
  const [row] = await sql`select pending_totp_secret from admin_sessions where token_hash = ${access.tokenHash}`;
  if (row?.pending_totp_secret) {
    try {
      return decryptSecret(row.pending_totp_secret);
    } catch {
      // Encryption key changed since; start again below.
    }
  }
  const secret = newTotpSecret();
  await sql`update admin_sessions set pending_totp_secret = ${encryptSecret(secret)} where token_hash = ${access.tokenHash}`;
  return secret;
}

/** Turns the authenticator on once the first code matches. Returns recovery codes, or null if the code is wrong. */
export async function confirmTotpSetup(access: AdminAccess, actor: Actor, code: string): Promise<string[] | null> {
  const [row] = await sql`select pending_totp_secret from admin_sessions where token_hash = ${access.tokenHash}`;
  if (!row?.pending_totp_secret) return null;
  const step = verifyTotp(decryptSecret(row.pending_totp_secret), code, null);
  if (step === null) {
    await logEvent(actor, 'code_failed', { label: 'While setting up the authenticator' });
    return null;
  }
  const codes = newRecoveryCodes();
  await sql.transaction([
    sql`update admin_users set totp_secret = ${row.pending_totp_secret}, totp_enabled = true, totp_last_step = ${step},
          recovery_codes = ${JSON.stringify(codes.map(hashRecoveryCode))}::jsonb, last_sign_in_at = now()
        where email = ${access.admin!.email}`,
    sql`update admin_sessions set code_ok_until = expires_at, pending_totp_secret = null where token_hash = ${access.tokenHash}`,
    // Other sessions (e.g. an old phone) must enter a code from the new key.
    sql`update admin_sessions set code_ok_until = null where email = ${access.admin!.email} and token_hash <> ${access.tokenHash}`,
    logQuery(actor, 'two_factor_enabled'),
  ]);
  return codes;
}

export async function replaceRecoveryCodes(actor: Actor, email: string): Promise<string[]> {
  const codes = newRecoveryCodes();
  await sql.transaction([
    sql`update admin_users set recovery_codes = ${JSON.stringify(codes.map(hashRecoveryCode))}::jsonb where email = ${email}`,
    logQuery(actor, 'recovery_codes_created'),
  ]);
  return codes;
}

export async function recoveryCodesLeft(email: string): Promise<number> {
  const [row] = await sql`select jsonb_array_length(recovery_codes) as n from admin_users where email = ${email}`;
  return Number(row?.n ?? 0);
}

/* ---------------- One-time links (invitations and password resets) ---------------- */

export type LinkInfo = { email: string; purpose: 'invite' | 'reset'; name: string; role: AdminRole };

export async function findLink(token: string): Promise<LinkInfo | null> {
  if (!token) return null;
  const [row] = await sql`
    select i.email, i.purpose, u.name, u.role from admin_invites i join admin_users u on u.email = i.email
    where i.token_hash = ${hashToken(token)} and i.used_at is null and i.expires_at > now() and not u.disabled`;
  return (row as LinkInfo) ?? null;
}

/** Creates a link and cancels any earlier unused one for the same person. Returns the path to send. */
export async function createLink(actor: Actor, email: string, purpose: 'invite' | 'reset'): Promise<string> {
  const token = newToken();
  const hours = purpose === 'invite' ? 24 * 7 : 24;
  await sql.transaction([
    sql`update admin_invites set used_at = now() where email = ${email} and used_at is null`,
    sql`insert into admin_invites (token_hash, email, purpose, created_by, expires_at)
        values (${hashToken(token)}, ${email}, ${purpose}, ${actor.email}, now() + make_interval(hours => ${hours}))`,
    ...(purpose === 'reset' ? [logQuery(actor, 'password_reset_link', { entityId: email, label: `For ${email}` })] : []),
  ]);
  return `/admin/welcome?token=${token}`;
}

/** Sets the password from a link, then signs the person in (they still need their authenticator). */
export async function useLink(cookies: AstroCookies, actor: Actor, token: string, link: LinkInfo, name: string, password: string) {
  const hash = await hashPassword(password);
  const used = await sql`
    update admin_invites set used_at = now() where token_hash = ${hashToken(token)} and used_at is null and expires_at > now()
    returning 1`;
  if (used.length === 0) return false;
  await sql.transaction([
    sql`update admin_users set password_hash = ${hash}, name = coalesce(nullif(${name}, ''), name) where email = ${link.email}`,
    sql`delete from admin_sessions where email = ${link.email}`,
    logQuery({ ...actor, email: link.email }, 'password_set', {
      label: link.purpose === 'invite' ? 'Accepted invitation' : 'Chose a new password',
    }),
  ]);
  await startSession(cookies, { ...actor, email: link.email }, link.email);
  return true;
}
