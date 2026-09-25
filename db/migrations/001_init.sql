-- NEPCEMAC admin: people who sign in, the content they manage, requests sent from the website,
-- uploaded photos and an append-only activity log.

-- ---------------------------------------------------------------- Admin accounts
create table admin_users (
  email text primary key check (email = lower(email)),
  name text not null default '',
  role text not null check (role in ('owner', 'editor')),
  -- scrypt hash, null until the person accepts their invitation
  password_hash text,
  -- authenticator key, AES-GCM encrypted with ADMIN_SECRETS_KEY
  totp_secret text,
  totp_enabled boolean not null default false,
  -- last accepted time step, so a code can't be used twice
  totp_last_step bigint,
  -- sha256 hashes of unused one-time recovery codes
  recovery_codes jsonb not null default '[]',
  disabled boolean not null default false,
  created_at timestamptz not null default now(),
  last_sign_in_at timestamptz
);

create table admin_sessions (
  -- sha256 of the cookie value; the value itself is never stored
  token_hash text primary key,
  email text not null references admin_users (email) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  -- the authenticator code was checked in this session until this time
  code_ok_until timestamptz,
  -- authenticator key being set up (encrypted), before it is confirmed
  pending_totp_secret text,
  ip text,
  user_agent text
);
create index admin_sessions_email on admin_sessions (email);

-- One-time links for new staff (invite) and forgotten passwords (reset). Only the hash is stored.
create table admin_invites (
  token_hash text primary key,
  email text not null references admin_users (email) on delete cascade,
  purpose text not null check (purpose in ('invite', 'reset')),
  created_by text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

-- ---------------------------------------------------------------- Activity log
create table audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor_email text,
  action text not null,
  entity text,
  entity_id text,
  label text,
  ip text,
  user_agent text
);
create index audit_log_at on audit_log (at desc);
create index audit_log_action on audit_log (action, at desc);

create function audit_log_append_only() returns trigger language plpgsql as $$
begin
  raise exception 'audit_log is append-only';
end $$;
create trigger audit_log_no_change before update or delete on audit_log
  for each row execute function audit_log_append_only();

-- ---------------------------------------------------------------- Site content
-- Small editable values: contact details and headline figures (one row per key).
create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- Uploaded photos. `bytes` is the large copy (longest side up to 1600 px), `small_bytes` a 640 px copy.
create table media (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('image/webp', 'image/jpeg', 'image/png')),
  bytes bytea not null,
  small_bytes bytea,
  width int,
  height int,
  size_bytes int not null,
  created_by text,
  created_at timestamptz not null default now()
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  date date,
  approx text check (approx in ('month', 'year')),
  kind text not null check (kind in ('campaign', 'visit', 'training', 'notice', 'compost')),
  title_en text not null default '',
  title_ne text not null default '',
  -- paragraphs separated by a blank line
  body_en text not null default '',
  body_ne text not null default '',
  -- [{ "label": {en, ne}, "value": {en, ne} }]
  facts jsonb not null default '[]',
  -- [{ "src": "photo:<slug>" | "media:<uuid>", "caption_en": "", "caption_ne": "" }]
  photos jsonb not null default '[]',
  photo_note_en text not null default '',
  photo_note_ne text not null default '',
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);
create index activities_date on activities (date desc nulls last);

-- Announcements shown as a banner across the site between the start and end dates.
create table notices (
  id uuid primary key default gen_random_uuid(),
  title_en text not null default '',
  title_ne text not null default '',
  body_en text not null default '',
  body_ne text not null default '',
  link_url text,
  link_label_en text not null default '',
  link_label_ne text not null default '',
  starts_on date,
  ends_on date,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  grp text not null check (grp in ('board', 'advisor')),
  name_en text not null default '',
  name_ne text not null default '',
  role_en text not null default '',
  role_ne text not null default '',
  note_en text not null default '',
  note_ne text not null default '',
  -- "team:<slug>" for the photos shipped with the site, "media:<uuid>" for uploads, or null
  photo text,
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);
create index team_members_order on team_members (grp, sort_order);

-- ---------------------------------------------------------------- Requests from the website
create table requests (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  type text not null check (type in ('programme', 'volunteer', 'partner', 'research', 'copy', 'other')),
  name text not null,
  org text not null default '',
  phone text not null default '',
  email text not null default '',
  area text not null default '',
  preferred_date text not null default '',
  people int,
  message text not null default '',
  lang text not null default 'en' check (lang in ('en', 'ne')),
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'spam')),
  -- hashed with ADMIN_SECRETS_KEY; used only to limit how often one address can send
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index requests_status on requests (status, created_at desc);
create index requests_ip on requests (ip_hash, created_at);

create table request_notes (
  id bigint generated always as identity primary key,
  request_id uuid not null references requests (id) on delete cascade,
  author text,
  body text not null,
  created_at timestamptz not null default now()
);
create index request_notes_request on request_notes (request_id, created_at);

-- ---------------------------------------------------------------- Publishing
-- Each press of "Publish" (which rebuilds the public site through a Netlify build hook).
create table site_publishes (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  by_email text,
  ok boolean not null,
  message text
);
