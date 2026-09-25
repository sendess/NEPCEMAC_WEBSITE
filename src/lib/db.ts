import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { DATABASE_URL } from 'astro:env/server';

/** Without DATABASE_URL the public site builds from src/data and the admin panel is unavailable. */
export const hasDatabase = Boolean(DATABASE_URL);

const missing = (() => {
  throw new Error('DATABASE_URL is not set, so the admin panel is unavailable.');
}) as unknown as NeonQueryFunction<false, false>;

/** One-shot SQL over HTTP — suited to serverless functions (no connection pool to manage). */
export const sql = DATABASE_URL ? neon(DATABASE_URL) : missing;

export type Query = ReturnType<typeof sql>;
