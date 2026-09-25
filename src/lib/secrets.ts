// Encrypts small secrets (authenticator keys) before they are stored in the database.
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from 'node:crypto';
import { ADMIN_SECRETS_KEY } from 'astro:env/server';

function key() {
  if (!ADMIN_SECRETS_KEY) throw new Error('ADMIN_SECRETS_KEY is not set.');
  return createHash('sha256').update(`nepcemac-admin-secrets:${ADMIN_SECRETS_KEY}`).digest();
}

/** AES-256-GCM, stored as "v1.iv.tag.data" (base64url). */
export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return ['v1', iv, cipher.getAuthTag(), data].map((part) => (typeof part === 'string' ? part : part.toString('base64url'))).join('.');
}

export function decryptSecret(stored: string): string {
  const [version, iv, tag, data] = stored.split('.');
  if (version !== 'v1' || !iv || !tag || !data) throw new Error('Unreadable secret');
  const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64url')), decipher.final()]).toString('utf8');
}

/** Visitor addresses are kept only as this keyed hash, enough to slow down repeated form posts. */
export function hashIp(ip: string | null): string | null {
  if (!ip || !ADMIN_SECRETS_KEY) return null;
  return createHmac('sha256', key()).update(`ip:${ip}`).digest('base64url').slice(0, 22);
}
