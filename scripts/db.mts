// Database maintenance. `npm run db:dev -- <command>` works on the Neon "dev" branch
// (.env.development.local); `npm run db -- <command>` on the live database (.env.local).
//
//   migrate                          apply pending files in db/migrations
//   status                           list applied and pending migrations, and row counts
//   seed                             copy the content in src/data into empty tables
//   invite <email> [owner|editor] [name]   one-time link to set a password (valid 7 days)
//   reset-password <email>           one-time link to choose a new password (valid 24 hours)
//   reset-2fa <email>                emergency: lost phone and recovery codes
import { readdir, readFile } from 'node:fs/promises';
import { Pool, type PoolClient } from '@neondatabase/serverless';
import { hashToken, newToken } from '../src/lib/tokens';
import { activities } from '../src/data/activities';
import { photoCaptions } from '../src/data/photos';
import { advisors, board } from '../src/data/team';
import { org } from '../src/data/site';
import { figures } from '../src/data/figures';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is missing. Use: npm run db:dev -- <command>');
  process.exit(1);
}
const siteUrl = (process.env.SITE_URL ?? 'https://nepcemac.org.np').replace(/\/$/, '');

const pool = new Pool({ connectionString: url });
const dir = new URL('../db/migrations/', import.meta.url);
const [command = 'status', ...args] = process.argv.slice(2);

async function inTransaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('begin');
    const result = await work(client);
    await client.query('commit');
    return result;
  } catch (err) {
    await client.query('rollback');
    throw err;
  } finally {
    client.release();
  }
}

async function migrationState() {
  await pool.query(`create table if not exists schema_migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )`);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();
  const { rows } = await pool.query('select name from schema_migrations');
  return { files, applied: new Set(rows.map((r) => r.name as string)) };
}

async function migrate() {
  const { files, applied } = await migrationState();
  const pending = files.filter((f) => !applied.has(f));
  if (pending.length === 0) return console.log('Database is up to date.');
  for (const file of pending) {
    const sql = await readFile(new URL(file, dir), 'utf8');
    await inTransaction(async (client) => {
      await client.query(sql);
      await client.query('insert into schema_migrations (name) values ($1)', [file]);
    }).catch((err) => {
      throw new Error(`${file} failed: ${err.message}`);
    });
    console.log(`Applied ${file}`);
  }
}

async function status() {
  const { files, applied } = await migrationState();
  console.log(`Database: ${new URL(url!).host}`);
  for (const f of files) console.log(`${applied.has(f) ? '  applied' : '  PENDING'}  ${f}`);
  if (files.every((f) => applied.has(f))) {
    const { rows } = await pool.query(`select
      (select count(*) from admin_users)::int as admins, (select count(*) from activities)::int as activities,
      (select count(*) from team_members)::int as team, (select count(*) from notices)::int as notices,
      (select count(*) from requests)::int as requests, (select count(*) from media)::int as photos`);
    console.log(Object.entries(rows[0]).map(([k, v]) => `${k}: ${v}`).join(' · '));
  }
}

/** Copies the site's current content into the database. Tables that already have rows are left alone. */
async function seed() {
  await inTransaction(async (client) => {
    const count = async (table: string) => Number((await client.query(`select count(*)::int as n from ${table}`)).rows[0].n);

    const settings: Record<string, unknown> = {
      contact: { email: org.email, phones: org.phones, address: org.address, hours: org.hours, facebook: org.facebook },
      figures,
    };
    for (const [key, value] of Object.entries(settings)) {
      const { rowCount } = await client.query(
        `insert into site_settings (key, value, updated_by) values ($1, $2, 'seed') on conflict (key) do nothing`,
        [key, JSON.stringify(value)],
      );
      console.log(rowCount ? `Settings: added ${key}` : `Settings: ${key} already set`);
    }

    if ((await count('activities')) === 0) {
      for (const a of activities) {
        await client.query(
          `insert into activities (slug, date, approx, kind, title_en, title_ne, body_en, body_ne, facts, photos,
             photo_note_en, photo_note_ne, updated_by)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'seed')`,
          [
            a.id,
            a.date ?? null,
            a.approx ?? null,
            a.kind,
            a.title.en,
            a.title.ne,
            a.text.map((p) => p.en).join('\n\n'),
            a.text.map((p) => p.ne).join('\n\n'),
            JSON.stringify(a.facts ?? []),
            JSON.stringify(
              a.photos.map((slug) => ({ src: `photo:${slug}`, caption_en: photoCaptions[slug]?.en ?? '', caption_ne: photoCaptions[slug]?.ne ?? '' })),
            ),
            a.photoNote?.en ?? '',
            a.photoNote?.ne ?? '',
          ],
        );
      }
      console.log(`Activities: added ${activities.length}`);
    } else console.log('Activities: already filled, left as they are');

    if ((await count('team_members')) === 0) {
      const people = [...board.map((p) => ({ ...p, grp: 'board' })), ...advisors.map((p) => ({ ...p, grp: 'advisor' }))];
      let order = 0;
      for (const p of people) {
        order += 10;
        await client.query(
          `insert into team_members (grp, name_en, name_ne, role_en, role_ne, note_en, note_ne, photo, sort_order, updated_by)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'seed')`,
          [p.grp, p.name.en, p.name.ne, p.role.en, p.role.ne, p.note?.en ?? '', p.note?.ne ?? '', p.photo ? `team:${p.photo}` : null, order],
        );
      }
      console.log(`Team: added ${people.length}`);
    } else console.log('Team: already filled, left as they are');
  });
}

async function oneTimeLink(email: string, purpose: 'invite' | 'reset', hours: number, client: PoolClient) {
  const token = newToken();
  await client.query(`update admin_invites set used_at = now() where email = $1 and used_at is null`, [email]);
  await client.query(
    `insert into admin_invites (token_hash, email, purpose, created_by, expires_at)
     values ($1, $2, $3, 'command line', now() + make_interval(hours => $4))`,
    [hashToken(token), email, purpose, hours],
  );
  return `${siteUrl}/admin/welcome?token=${token}`;
}

const readEmail = (value: string | undefined, usage: string) => {
  const email = value?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(`Usage: ${usage}`);
  return email;
};

async function invite() {
  const usage = 'invite <email> [owner|editor] [name]';
  const [rawEmail, role = 'editor', ...nameParts] = args;
  const email = readEmail(rawEmail, usage);
  if (!['owner', 'editor'].includes(role)) throw new Error(`Usage: ${usage}`);
  const link = await inTransaction(async (client) => {
    await client.query(
      `insert into admin_users (email, role, name) values ($1, $2, $3)
       on conflict (email) do update set role = excluded.role, name = coalesce(nullif(excluded.name, ''), admin_users.name), disabled = false`,
      [email, role, nameParts.join(' ')],
    );
    await client.query(
      `insert into audit_log (actor_email, action, entity, entity_id, label) values (null, 'user_invited', 'admin_users', $1, $2)`,
      [email, `Invited as ${role} from the command line`],
    );
    return oneTimeLink(email, 'invite', 24 * 7, client);
  });
  console.log(`${email} (${role}) — send them this link; it works once, for 7 days:\n\n  ${link}\n`);
}

async function resetPassword() {
  const email = readEmail(args[0], 'reset-password <email>');
  const link = await inTransaction(async (client) => {
    const { rowCount } = await client.query('select 1 from admin_users where email = $1', [email]);
    if (!rowCount) throw new Error(`${email} has no admin account.`);
    await client.query(
      `insert into audit_log (actor_email, action, entity, entity_id, label) values (null, 'password_reset_link', 'auth', $1, 'Created from the command line')`,
      [email],
    );
    return oneTimeLink(email, 'reset', 24, client);
  });
  console.log(`Password reset link for ${email}; it works once, for 24 hours:\n\n  ${link}\n`);
}

async function resetTwoFactor() {
  const email = readEmail(args[0], 'reset-2fa <email>');
  await inTransaction(async (client) => {
    const { rowCount } = await client.query(
      `update admin_users set totp_secret = null, totp_enabled = false, totp_last_step = null, recovery_codes = '[]' where email = $1`,
      [email],
    );
    if (!rowCount) throw new Error(`${email} has no admin account.`);
    await client.query('delete from admin_sessions where email = $1', [email]);
    await client.query(
      `insert into audit_log (actor_email, action, entity, entity_id, label) values (null, 'two_factor_reset', 'auth', $1, 'Reset from the command line')`,
      [email],
    );
  });
  console.log(`${email} will set up their authenticator app again at next sign-in.`);
}

const commands: Record<string, () => Promise<void>> = {
  migrate,
  status,
  seed,
  invite,
  'reset-password': resetPassword,
  'reset-2fa': resetTwoFactor,
};
try {
  if (!commands[command]) throw new Error(`Unknown command "${command}". Use: ${Object.keys(commands).join(', ')}`);
  await commands[command]();
} catch (err) {
  console.error((err as Error).message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
