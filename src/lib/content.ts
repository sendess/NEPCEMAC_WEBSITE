// What staff edit in the admin panel: activities, notices, team, contact details and figures.
// Changes are saved straight away but reach the public site only when someone presses "Publish".
import { NETLIFY_BUILD_HOOK } from 'astro:env/server';
import { sql } from './db';
import { logQuery, type Actor } from './audit';
import { FormReader, slugify, type FieldErrors } from './forms';
import { removeUnusedMedia } from './media';
import type { ActivityKind, Contact } from './site-data';
import type { Figures } from '~/data/figures';
import type { L } from '~/i18n/utils';

export const ACTIVITY_KINDS: Record<ActivityKind, string> = {
  campaign: 'Clean-up campaign',
  visit: 'Visit',
  training: 'Training',
  notice: 'Notice',
  compost: 'Composting',
};

type Saved<T> = { ok: true; id: string; data: T } | { ok: false; errors: FieldErrors; data: T };

/** Photo in an activity: a built-in photo ("photo:<slug>") or an upload ("media:<uuid>"). */
export type ActivityPhoto = { src: string; caption_en: string; caption_ne: string };

/* ---------------- Activities ---------------- */

export type ActivityForm = {
  kind: ActivityKind;
  date: string | null;
  approx: '' | 'month' | 'year';
  title_en: string;
  title_ne: string;
  body_en: string;
  body_ne: string;
  facts: { label: L; value: L }[];
  photos: ActivityPhoto[];
  photo_note_en: string;
  photo_note_ne: string;
  visible: boolean;
};

export type ActivityListRow = {
  id: string;
  slug: string;
  date: string | null;
  approx: string | null;
  kind: ActivityKind;
  title_en: string;
  title_ne: string;
  visible: boolean;
  photo_count: number;
  first_photo: string | null;
  updated_at: string;
  updated_by: string | null;
};

export async function listActivities(): Promise<ActivityListRow[]> {
  return (await sql`
    select id::text, slug, to_char(date, 'YYYY-MM-DD') as date, approx, kind, title_en, title_ne, visible,
      jsonb_array_length(photos) as photo_count, photos->0->>'src' as first_photo, updated_at, updated_by
    from activities order by date desc nulls last, created_at desc`) as ActivityListRow[];
}

export async function getActivity(id: string): Promise<(ActivityForm & { id: string; slug: string }) | null> {
  if (!isUuid(id)) return null;
  const [row] = await sql`
    select id::text, slug, kind, to_char(date, 'YYYY-MM-DD') as date, coalesce(approx, '') as approx, title_en, title_ne,
      body_en, body_ne, facts, photos, photo_note_en, photo_note_ne, visible
    from activities where id = ${id}`;
  return (row as ActivityForm & { id: string; slug: string }) ?? null;
}

export const emptyActivity = (): ActivityForm => ({
  kind: 'campaign',
  date: null,
  approx: '',
  title_en: '',
  title_ne: '',
  body_en: '',
  body_ne: '',
  facts: [],
  photos: [],
  photo_note_en: '',
  photo_note_ne: '',
  visible: true,
});

export function readActivityForm(form: FormData): { data: ActivityForm; errors: FieldErrors } {
  const r = new FormReader(form);
  const all = (name: string) => form.getAll(name).map((v) => String(v).trim());
  const data: ActivityForm = {
    kind: r.choice('kind', Object.keys(ACTIVITY_KINDS) as ActivityKind[], 'campaign'),
    date: r.date('date', { label: 'Date' }),
    approx: r.choice('approx', ['', 'month', 'year'] as const, ''),
    title_en: r.text('title_en', { max: 200, label: 'Title' }),
    title_ne: r.text('title_ne', { max: 200, label: 'Title (Nepali)' }),
    body_en: r.text('body_en', { max: 6000, label: 'Text' }),
    body_ne: r.text('body_ne', { max: 6000, label: 'Text (Nepali)' }),
    facts: [],
    photos: [],
    photo_note_en: r.text('photo_note_en', { max: 300 }),
    photo_note_ne: r.text('photo_note_ne', { max: 300 }),
    visible: r.checkbox('visible'),
  };
  r.requireOneOf(data.title_en, data.title_ne, 'title_en', 'A title');

  const [labelEn, labelNe, valueEn, valueNe] = ['fact_label_en', 'fact_label_ne', 'fact_value_en', 'fact_value_ne'].map(all);
  labelEn.forEach((_, i) => {
    const fact = { label: { en: labelEn[i], ne: labelNe[i] ?? '' }, value: { en: valueEn[i] ?? '', ne: valueNe[i] ?? '' } };
    if (fact.label.en || fact.label.ne || fact.value.en || fact.value.ne) data.facts.push(fact);
  });
  data.facts = data.facts.slice(0, 6).map((f) => ({
    label: { en: (f.label.en || f.label.ne).slice(0, 80), ne: (f.label.ne || f.label.en).slice(0, 80) },
    value: { en: (f.value.en || f.value.ne).slice(0, 80), ne: (f.value.ne || f.value.en).slice(0, 80) },
  }));

  const [src, capEn, capNe] = ['photo_src', 'photo_caption_en', 'photo_caption_ne'].map(all);
  src.forEach((s, i) => {
    if (/^(photo:[a-z0-9-]+|media:[0-9a-f-]{36})$/.test(s)) {
      data.photos.push({ src: s, caption_en: (capEn[i] ?? '').slice(0, 300), caption_ne: (capNe[i] ?? '').slice(0, 300) });
    }
  });
  data.photos = data.photos.slice(0, 24);
  return { data, errors: r.errors };
}

async function uniqueSlug(base: string, exceptId: string | null): Promise<string> {
  const root = base || 'activity';
  const rows = await sql`select slug from activities where (slug = ${root} or slug like ${root + '-%'}) and id::text is distinct from ${exceptId}`;
  const taken = new Set(rows.map((r) => r.slug as string));
  if (!taken.has(root)) return root;
  for (let n = 2; ; n++) if (!taken.has(`${root}-${n}`)) return `${root}-${n}`;
}

export async function saveActivity(actor: Actor, id: string | null, form: FormData): Promise<Saved<ActivityForm>> {
  const { data, errors } = readActivityForm(form);
  if (Object.keys(errors).length) return { ok: false, errors, data };
  const d = data;
  const label = d.title_en || d.title_ne;
  let savedId = id;
  if (id) {
    await sql.transaction([
      sql`update activities set kind = ${d.kind}, date = ${d.date}, approx = ${d.approx || null}, title_en = ${d.title_en},
            title_ne = ${d.title_ne}, body_en = ${d.body_en}, body_ne = ${d.body_ne}, facts = ${JSON.stringify(d.facts)}::jsonb,
            photos = ${JSON.stringify(d.photos)}::jsonb, photo_note_en = ${d.photo_note_en}, photo_note_ne = ${d.photo_note_ne},
            visible = ${d.visible}, updated_at = now(), updated_by = ${actor.email}
          where id = ${id}`,
      logQuery(actor, 'update', { entity: 'activities', entityId: id, label }),
    ]);
  } else {
    // The address (…/activities/#slug) comes from the English title, or the date.
    const slug = await uniqueSlug(slugify(d.title_en) || (d.date ? `activity-${d.date}` : 'activity'), null);
    const [row] = await sql`
      insert into activities (slug, kind, date, approx, title_en, title_ne, body_en, body_ne, facts, photos,
        photo_note_en, photo_note_ne, visible, updated_by)
      values (${slug}, ${d.kind}, ${d.date}, ${d.approx || null}, ${d.title_en}, ${d.title_ne}, ${d.body_en}, ${d.body_ne},
        ${JSON.stringify(d.facts)}::jsonb, ${JSON.stringify(d.photos)}::jsonb, ${d.photo_note_en}, ${d.photo_note_ne},
        ${d.visible}, ${actor.email})
      returning id::text`;
    savedId = String(row.id);
    await logQuery(actor, 'create', { entity: 'activities', entityId: savedId, label });
  }
  await removeUnusedMedia();
  return { ok: true, id: savedId!, data };
}

export async function deleteActivity(actor: Actor, id: string) {
  const [row] = await sql`delete from activities where id = ${id} returning coalesce(nullif(title_en, ''), title_ne) as label`;
  if (row) await logQuery(actor, 'delete', { entity: 'activities', entityId: id, label: row.label });
}

/* ---------------- Notices ---------------- */

export type NoticeForm = {
  title_en: string;
  title_ne: string;
  body_en: string;
  body_ne: string;
  link_url: string | null;
  link_label_en: string;
  link_label_ne: string;
  starts_on: string | null;
  ends_on: string | null;
  visible: boolean;
};

export type NoticeRow = NoticeForm & { id: string; updated_at: string; updated_by: string | null; state: 'showing' | 'scheduled' | 'ended' | 'hidden' };

export const emptyNotice = (): NoticeForm => ({
  title_en: '',
  title_ne: '',
  body_en: '',
  body_ne: '',
  link_url: null,
  link_label_en: '',
  link_label_ne: '',
  starts_on: null,
  ends_on: null,
  visible: true,
});

const noticeColumns = sql`id::text, title_en, title_ne, body_en, body_ne, link_url, link_label_en, link_label_ne,
  to_char(starts_on, 'YYYY-MM-DD') as starts_on, to_char(ends_on, 'YYYY-MM-DD') as ends_on, visible, updated_at, updated_by,
  case when not visible then 'hidden'
       when ends_on < (now() at time zone 'Asia/Kathmandu')::date then 'ended'
       when starts_on > (now() at time zone 'Asia/Kathmandu')::date then 'scheduled'
       else 'showing' end as state`;

export async function listNotices(): Promise<NoticeRow[]> {
  return (await sql`select ${noticeColumns} from notices order by (ends_on is null or ends_on >= current_date) desc,
    coalesce(starts_on, created_at::date) desc`) as NoticeRow[];
}

export async function getNotice(id: string): Promise<NoticeRow | null> {
  if (!isUuid(id)) return null;
  const [row] = await sql`select ${noticeColumns} from notices where id = ${id}`;
  return (row as NoticeRow) ?? null;
}

export async function saveNotice(actor: Actor, id: string | null, form: FormData): Promise<Saved<NoticeForm>> {
  const r = new FormReader(form);
  const d: NoticeForm = {
    title_en: r.text('title_en', { max: 160, label: 'Title' }),
    title_ne: r.text('title_ne', { max: 160 }),
    body_en: r.text('body_en', { max: 600, label: 'Text' }),
    body_ne: r.text('body_ne', { max: 600 }),
    link_url: r.url('link_url', { label: 'Link' }),
    link_label_en: r.text('link_label_en', { max: 60 }),
    link_label_ne: r.text('link_label_ne', { max: 60 }),
    starts_on: r.date('starts_on', { label: 'Start date' }),
    ends_on: r.date('ends_on', { label: 'End date' }),
    visible: r.checkbox('visible'),
  };
  r.requireOneOf(d.title_en, d.title_ne, 'title_en', 'A title');
  if (d.starts_on && d.ends_on && d.ends_on < d.starts_on) r.errors.ends_on = 'The end date is before the start date.';
  if (!r.ok) return { ok: false, errors: r.errors, data: d };
  const label = d.title_en || d.title_ne;
  if (id) {
    await sql.transaction([
      sql`update notices set title_en = ${d.title_en}, title_ne = ${d.title_ne}, body_en = ${d.body_en}, body_ne = ${d.body_ne},
            link_url = ${d.link_url}, link_label_en = ${d.link_label_en}, link_label_ne = ${d.link_label_ne},
            starts_on = ${d.starts_on}, ends_on = ${d.ends_on}, visible = ${d.visible}, updated_at = now(), updated_by = ${actor.email}
          where id = ${id}`,
      logQuery(actor, 'update', { entity: 'notices', entityId: id, label }),
    ]);
    return { ok: true, id, data: d };
  }
  const [row] = await sql`
    insert into notices (title_en, title_ne, body_en, body_ne, link_url, link_label_en, link_label_ne, starts_on, ends_on, visible, updated_by)
    values (${d.title_en}, ${d.title_ne}, ${d.body_en}, ${d.body_ne}, ${d.link_url}, ${d.link_label_en}, ${d.link_label_ne},
      ${d.starts_on}, ${d.ends_on}, ${d.visible}, ${actor.email})
    returning id::text`;
  await logQuery(actor, 'create', { entity: 'notices', entityId: row.id, label });
  return { ok: true, id: String(row.id), data: d };
}

export async function deleteNotice(actor: Actor, id: string) {
  const [row] = await sql`delete from notices where id = ${id} returning coalesce(nullif(title_en, ''), title_ne) as label`;
  if (row) await logQuery(actor, 'delete', { entity: 'notices', entityId: id, label: row.label });
}

/* ---------------- Team ---------------- */

export const TEAM_GROUPS = { board: 'Executive committee', advisor: 'Advisors' } as const;
export type TeamGroup = keyof typeof TEAM_GROUPS;

export type TeamForm = {
  grp: TeamGroup;
  name_en: string;
  name_ne: string;
  role_en: string;
  role_ne: string;
  note_en: string;
  note_ne: string;
  photo: string | null;
  visible: boolean;
};

export type TeamRow = TeamForm & { id: string; sort_order: number; updated_at: string; updated_by: string | null };

export const emptyTeamMember = (grp: TeamGroup = 'board'): TeamForm => ({
  grp,
  name_en: '',
  name_ne: '',
  role_en: '',
  role_ne: '',
  note_en: '',
  note_ne: '',
  photo: null,
  visible: true,
});

export async function listTeam(): Promise<TeamRow[]> {
  return (await sql`select id::text, grp, name_en, name_ne, role_en, role_ne, note_en, note_ne, photo, visible, sort_order,
    updated_at, updated_by from team_members order by grp = 'advisor', sort_order, created_at`) as TeamRow[];
}

export async function getTeamMember(id: string): Promise<TeamRow | null> {
  if (!isUuid(id)) return null;
  const [row] = await sql`select id::text, grp, name_en, name_ne, role_en, role_ne, note_en, note_ne, photo, visible, sort_order,
    updated_at, updated_by from team_members where id = ${id}`;
  return (row as TeamRow) ?? null;
}

export async function saveTeamMember(actor: Actor, id: string | null, form: FormData): Promise<Saved<TeamForm>> {
  const r = new FormReader(form);
  const photo = String(form.get('photo') ?? '').trim();
  const d: TeamForm = {
    grp: r.choice('grp', ['board', 'advisor'] as const, 'board'),
    name_en: r.text('name_en', { max: 120, label: 'Name' }),
    name_ne: r.text('name_ne', { max: 120 }),
    role_en: r.text('role_en', { max: 120, label: 'Role' }),
    role_ne: r.text('role_ne', { max: 120 }),
    note_en: r.text('note_en', { max: 200 }),
    note_ne: r.text('note_ne', { max: 200 }),
    photo: /^(team:[a-z0-9-]+|media:[0-9a-f-]{36})$/.test(photo) ? photo : null,
    visible: r.checkbox('visible'),
  };
  r.requireOneOf(d.name_en, d.name_ne, 'name_en', 'A name');
  r.requireOneOf(d.role_en, d.role_ne, 'role_en', 'A role');
  if (!r.ok) return { ok: false, errors: r.errors, data: d };
  const label = d.name_en || d.name_ne;
  let savedId = id;
  if (id) {
    await sql.transaction([
      sql`update team_members set grp = ${d.grp}, name_en = ${d.name_en}, name_ne = ${d.name_ne}, role_en = ${d.role_en},
            role_ne = ${d.role_ne}, note_en = ${d.note_en}, note_ne = ${d.note_ne}, photo = ${d.photo}, visible = ${d.visible},
            updated_at = now(), updated_by = ${actor.email}
          where id = ${id}`,
      logQuery(actor, 'update', { entity: 'team_members', entityId: id, label }),
    ]);
  } else {
    // New people go to the end of their group.
    const [row] = await sql`
      insert into team_members (grp, name_en, name_ne, role_en, role_ne, note_en, note_ne, photo, visible, sort_order, updated_by)
      values (${d.grp}, ${d.name_en}, ${d.name_ne}, ${d.role_en}, ${d.role_ne}, ${d.note_en}, ${d.note_ne}, ${d.photo}, ${d.visible},
        (select coalesce(max(sort_order), 0) + 10 from team_members where grp = ${d.grp}), ${actor.email})
      returning id::text`;
    savedId = String(row.id);
    await logQuery(actor, 'create', { entity: 'team_members', entityId: savedId, label });
  }
  await removeUnusedMedia();
  return { ok: true, id: savedId!, data: d };
}

/** Swaps a person with the one above or below them in the same group. */
export async function moveTeamMember(actor: Actor, id: string, direction: 'up' | 'down') {
  const rows = (await sql`
    select id::text, sort_order, coalesce(nullif(name_en, ''), name_ne) as label from team_members
    where grp = (select grp from team_members where id = ${id}) order by sort_order, created_at`) as {
    id: string;
    sort_order: number;
    label: string;
  }[];
  const i = rows.findIndex((r) => r.id === id);
  const j = direction === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= rows.length) return;
  // Renumber the group so equal sort orders can't get stuck.
  [rows[i], rows[j]] = [rows[j], rows[i]];
  await sql.transaction([
    ...rows.map((r, n) => sql`update team_members set sort_order = ${(n + 1) * 10} where id = ${r.id}`),
    logQuery(actor, 'update', { entity: 'team_members', entityId: id, label: `${rows[j].label}: moved ${direction}` }),
  ]);
}

export async function deleteTeamMember(actor: Actor, id: string) {
  const [row] = await sql`delete from team_members where id = ${id} returning coalesce(nullif(name_en, ''), name_ne) as label`;
  if (row) await logQuery(actor, 'delete', { entity: 'team_members', entityId: id, label: row.label });
}

/* ---------------- Contact details and figures ---------------- */

export async function getSetting<T>(key: string): Promise<T | null> {
  const [row] = await sql`select value from site_settings where key = ${key}`;
  return (row?.value as T) ?? null;
}

async function putSetting(actor: Actor, key: string, value: unknown, label: string) {
  await sql.transaction([
    sql`insert into site_settings (key, value, updated_at, updated_by) values (${key}, ${JSON.stringify(value)}::jsonb, now(), ${actor.email})
        on conflict (key) do update set value = excluded.value, updated_at = now(), updated_by = excluded.updated_by`,
    logQuery(actor, 'update', { entity: 'site_settings', entityId: key, label }),
  ]);
}

export async function saveContact(actor: Actor, form: FormData): Promise<Saved<Contact>> {
  const r = new FormReader(form);
  const phones = r
    .text('phones', { max: 200 })
    .split(/[\n,]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 4);
  const d: Contact = {
    email: r.text('email', { max: 160, required: true, label: 'Email' }).toLowerCase(),
    phones,
    address: { en: r.text('address_en', { max: 200 }), ne: r.text('address_ne', { max: 200 }) },
    hours: { en: r.text('hours_en', { max: 200 }), ne: r.text('hours_ne', { max: 200 }) },
    facebook: r.url('facebook', { label: 'Facebook page' }) ?? '',
  };
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) r.errors.email = 'Enter a valid email address.';
  if (phones.length === 0) r.errors.phones = 'Enter at least one phone number.';
  else if (phones.some((p) => !/^[+\d][\d\s-]{5,19}$/.test(p))) r.errors.phones = 'Phone numbers may contain only digits, spaces, - and +.';
  r.requireOneOf(d.address.en, d.address.ne, 'address_en', 'The address');
  if (!r.ok) return { ok: false, errors: r.errors, data: d };
  await putSetting(actor, 'contact', d, 'Contact details');
  return { ok: true, id: 'contact', data: d };
}

export async function saveFigures(actor: Actor, form: FormData): Promise<Saved<Figures>> {
  const r = new FormReader(form);
  const d = {
    families: r.int('families', { min: 0, max: 10_000_000, label: 'Households' }) ?? 0,
    trained: r.int('trained', { min: 0, max: 10_000_000, label: 'People trained' }) ?? 0,
    cities: r.int('cities', { min: 0, max: 1000, label: 'Municipalities' }) ?? 0,
  };
  if (!r.ok) return { ok: false, errors: r.errors, data: d };
  await putSetting(actor, 'figures', d, 'Home page figures');
  return { ok: true, id: 'figures', data: d };
}

/* ---------------- Publishing ---------------- */

const CONTENT_ENTITIES = ['activities', 'notices', 'team_members', 'site_settings'];

export type PublishState = {
  configured: boolean;
  last: { at: string; by_email: string | null; ok: boolean; message: string | null } | null;
  /** Content changes saved since the last successful publish. */
  pending: number;
  recent: { at: string; actor_email: string | null; action: string; entity: string; label: string | null }[];
};

export async function publishState(): Promise<PublishState> {
  const [last] = await sql`select at, by_email, ok, message from site_publishes order by at desc limit 1`;
  const [lastOk] = await sql`select at from site_publishes where ok order by at desc limit 1`;
  const since = lastOk?.at ?? '1970-01-01';
  const recent = await sql`
    select at, actor_email, action, entity, label from audit_log
    where entity = any(${CONTENT_ENTITIES}) and at > ${since} order by at desc limit 50`;
  return {
    configured: Boolean(NETLIFY_BUILD_HOOK),
    last: (last as PublishState['last']) ?? null,
    pending: recent.length,
    recent: recent as PublishState['recent'],
  };
}

/** Asks Netlify to rebuild the public site with the saved content (takes about two minutes). */
export async function publish(actor: Actor, name: string): Promise<{ ok: boolean; message: string }> {
  if (!NETLIFY_BUILD_HOOK) {
    return { ok: false, message: 'Publishing is not set up here (NETLIFY_BUILD_HOOK is missing). It works on the live site.' };
  }
  let ok = false;
  let message: string;
  try {
    const url = new URL(NETLIFY_BUILD_HOOK);
    url.searchParams.set('trigger_title', `Published from the admin panel by ${name}`.slice(0, 120));
    const res = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(10_000) });
    ok = res.ok;
    message = ok ? 'The website is being rebuilt. Changes appear in about two minutes.' : `Netlify answered ${res.status}. Try again in a minute.`;
  } catch {
    message = 'Could not reach Netlify. Try again in a minute.';
  }
  await sql.transaction([
    sql`insert into site_publishes (by_email, ok, message) values (${actor.email}, ${ok}, ${message})`,
    logQuery(actor, ok ? 'publish' : 'publish_failed', { entity: 'site', label: message }),
  ]);
  return { ok, message };
}

/* ---------------- Helpers ---------------- */

export const isUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
