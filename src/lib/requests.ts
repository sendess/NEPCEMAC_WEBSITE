// Requests sent with the form on the Contact page, and the admin inbox that handles them.
import { sql, type Query } from './db';
import { logQuery, type Actor } from './audit';
import { newRequestRef } from './tokens';

export const REQUEST_TYPES = {
  programme: 'Awareness programme',
  volunteer: 'Volunteering',
  partner: 'Partnership',
  research: 'Research or study visit',
  copy: 'Copy of a publication',
  other: 'Something else',
} as const;
export type RequestType = keyof typeof REQUEST_TYPES;

export const REQUEST_STATUSES = {
  new: 'New',
  in_progress: 'In progress',
  done: 'Done',
  spam: 'Spam',
} as const;
export type RequestStatus = keyof typeof REQUEST_STATUSES;

/** Colour of each status label in the admin panel. */
export const STATUS_TAG: Record<RequestStatus, string> = { new: 'tag-amber', in_progress: 'tag-blue', done: 'tag-green', spam: 'tag-grey' };

/** Per address per hour, and for the whole site per day — enough for real use, a brake on floods. */
const MAX_PER_IP_HOUR = 5;
const MAX_PER_DAY = 200;

export type NewRequest = {
  type: RequestType;
  name: string;
  org: string;
  phone: string;
  email: string;
  area: string;
  preferred_date: string;
  people: number | null;
  message: string;
  lang: 'en' | 'ne';
};

const text = (value: unknown, max: number) =>
  String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .trim()
    .slice(0, max);

/** Reads and checks what the form sent. Returns the cleaned request, or a message for the sender. */
export function readRequest(body: Record<string, unknown>): NewRequest | { error: string } {
  const type = String(body.type ?? '') as RequestType;
  const peopleText = text(body.people, 7);
  const people = /^\d+$/.test(peopleText) ? Math.min(Number(peopleText), 100000) : null;
  const request: NewRequest = {
    type: type in REQUEST_TYPES ? type : 'other',
    name: text(body.name, 120),
    org: text(body.org, 160),
    phone: text(body.phone, 40),
    email: text(body.email, 160),
    area: text(body.area, 160),
    preferred_date: text(body.date, 80),
    people,
    message: text(body.message, 4000),
    lang: body.lang === 'ne' ? 'ne' : 'en',
  };
  if (!request.name) return { error: 'Please write your name.' };
  if (!request.phone && !request.email) return { error: 'Please give a phone number or an email address.' };
  if (request.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) return { error: 'Please check the email address.' };
  return request;
}

export async function tooManyRequests(ipHash: string | null): Promise<boolean> {
  const [row] = await sql`
    select count(*) filter (where ip_hash = ${ipHash} and created_at > now() - interval '1 hour')::int as by_ip,
           count(*) filter (where created_at > now() - interval '1 day')::int as by_day
    from requests where created_at > now() - interval '1 day'`;
  return (ipHash !== null && Number(row.by_ip) >= MAX_PER_IP_HOUR) || Number(row.by_day) >= MAX_PER_DAY;
}

/** Stores the request and returns its reference number. */
export async function saveRequest(r: NewRequest, ipHash: string | null): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const [row] = await sql`
      insert into requests (ref, type, name, org, phone, email, area, preferred_date, people, message, lang, ip_hash)
      values (${newRequestRef()}, ${r.type}, ${r.name}, ${r.org}, ${r.phone}, ${r.email}, ${r.area}, ${r.preferred_date},
        ${r.people}, ${r.message}, ${r.lang}, ${ipHash})
      on conflict (ref) do nothing
      returning ref`;
    if (row) return row.ref as string;
  }
  throw new Error('Could not create a reference number');
}

/* ---------------- Admin inbox ---------------- */

export type RequestRow = NewRequest & {
  id: string;
  ref: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  note_count: number;
};

export async function requestCounts(): Promise<Record<RequestStatus | 'all', number>> {
  const rows = await sql`select status, count(*)::int as n from requests group by status`;
  const counts = { all: 0, new: 0, in_progress: 0, done: 0, spam: 0 };
  for (const r of rows) {
    counts[r.status as RequestStatus] = Number(r.n);
    if (r.status !== 'spam') counts.all += Number(r.n);
  }
  return counts;
}

export async function listRequests({ status, q, page, pageSize = 30 }: { status: string; q: string; page: number; pageSize?: number }) {
  const conds: Query[] = [];
  if (status in REQUEST_STATUSES) conds.push(sql`status = ${status}`);
  // "All" leaves out spam; the Spam tab shows it.
  else conds.push(sql`status <> 'spam'`);
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    conds.push(sql`(ref ilike ${like} or name ilike ${like} or org ilike ${like} or phone ilike ${like} or email ilike ${like}
      or area ilike ${like} or message ilike ${like})`);
  }
  const where = conds.reduce((acc, c) => sql`${acc} and ${c}`, sql`true`);
  const rows = (await sql`
    select r.*, (select count(*) from request_notes n where n.request_id = r.id)::int as note_count,
      count(*) over()::int as total_count
    from requests r where ${where}
    order by (status = 'new') desc, created_at desc
    limit ${pageSize} offset ${(page - 1) * pageSize}`) as (RequestRow & { total_count: number })[];
  return { rows, total: rows.length ? Number(rows[0].total_count) : 0, pageSize };
}

export type RequestNote = { id: number; author: string | null; author_name: string | null; body: string; created_at: string };

export async function getRequest(id: string): Promise<{ request: RequestRow; notes: RequestNote[] } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [request] = (await sql`select r.*, 0 as note_count from requests r where id = ${id}`) as RequestRow[];
  if (!request) return null;
  const notes = (await sql`
    select n.id, n.author, u.name as author_name, n.body, n.created_at
    from request_notes n left join admin_users u on u.email = n.author
    where n.request_id = ${id} order by n.created_at`) as RequestNote[];
  return { request, notes };
}

export async function setRequestStatus(actor: Actor, id: string, status: RequestStatus, ref: string) {
  await sql.transaction([
    sql`update requests set status = ${status}, updated_at = now() where id = ${id}`,
    logQuery(actor, 'status', { entity: 'requests', entityId: id, label: `${ref} → ${REQUEST_STATUSES[status]}` }),
  ]);
}

export async function addRequestNote(actor: Actor, id: string, body: string, ref: string) {
  await sql.transaction([
    sql`insert into request_notes (request_id, author, body) values (${id}, ${actor.email}, ${body})`,
    // Writing a note on a new request means someone has picked it up.
    sql`update requests set updated_at = now(), status = case when status = 'new' then 'in_progress' else status end where id = ${id}`,
    logQuery(actor, 'note', { entity: 'requests', entityId: id, label: ref }),
  ]);
}
