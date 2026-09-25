// Passwords and one-time tokens. Plain Node crypto, so the command-line tools can use it too.
import { createHash, randomBytes, scrypt, timingSafeEqual, type BinaryLike, type ScryptOptions } from 'node:crypto';

/** Random value for cookies and one-time links (192 bits). */
export const newToken = () => randomBytes(24).toString('base64url');

/** Only this hash of a token is stored, so a copy of the database can't be used to sign in. */
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

// scrypt with 16 MB of memory per hash: slow for anyone guessing, quick enough for a sign-in.
const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 32;

const scryptAsync = (password: BinaryLike, salt: BinaryLike, options: ScryptOptions) =>
  new Promise<Buffer>((resolve, reject) =>
    scrypt(password, salt, KEY_LENGTH, options, (err, key) => (err ? reject(err) : resolve(key))),
  );

/** Stored as "scrypt$N$r$p$salt$hash" so the cost can be raised later without breaking old hashes. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password.normalize('NFKC'), salt, { N, r: R, p: P });
  return ['scrypt', N, R, P, salt.toString('base64url'), key.toString('base64url')].join('$');
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  const [kind, n, r, p, salt, hash] = (stored ?? '').split('$');
  if (kind !== 'scrypt' || !salt || !hash) {
    // Same work as a real check, so the response time doesn't show whether the account exists.
    await hashPassword(password);
    return false;
  }
  const expected = Buffer.from(hash, 'base64url');
  const key = await scryptAsync(password.normalize('NFKC'), Buffer.from(salt, 'base64url'), {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return key.length === expected.length && timingSafeEqual(key, expected);
}

export const PASSWORD_MIN_LENGTH = 10;

export function passwordProblem(password: string, email = ''): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  if (password.length > 128) return 'Use at most 128 characters.';
  if (/^(.)\1*$/.test(password)) return 'Choose a less predictable password.';
  if (email && password.toLowerCase().includes(email.split('@')[0].toLowerCase())) return 'Don’t use your email name in the password.';
  return null;
}

/** "NC-7K3M9Q": reference number given to people who send a request. No 0/O or 1/I. */
export function newRequestRef(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  return `NC-${[...randomBytes(6)].map((b) => alphabet[b % alphabet.length]).join('')}`;
}
