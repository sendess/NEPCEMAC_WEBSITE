# nepcemac.org.np

Website of the Nepal Pollution Control and Environment Management Centre (NEPCEMAC),
an NGO working in solid waste management in Nepal since 1997.

Built with [Astro](https://astro.build), in English (`/`) and Nepali (`/ne/`), and deployed
on Netlify from the `main` branch.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # public pages in dist/, admin panel as a Netlify function
```

- Page words and records live in `src/data/*.ts` (each value has `en` and `ne`).
- Photos are enhanced, pre-sized WebP files in `public/images/photos/` (480px, 960px, 1400px and original width).
  `src/data/photo-sizes.json` holds each photo's sizes, average colour (shown while loading) and smart focal
  point (used as object-position when cropped); captions are in `src/data/photos.ts`.
- Partners and records (`src/data/partners.ts`) must each come from a written source.
- Old addresses from earlier NEPCEMAC sites are redirected in `netlify.toml`.

## Admin panel (`/admin`)

Staff manage part of the site without touching code:

| Area | What it changes |
| --- | --- |
| Requests | Inbox for the request form on the Contact page (status, notes for the team). Arrives straight away. |
| Activities | Entries and photos on the Activities page and the latest three on the home page. |
| Notices | A banner above every page between a start and end date. |
| Team | Executive committee and advisors, their order and portraits. |
| Contact & figures | Email, phones, address, office hours, Facebook page, and the home page figures. |
| Publish | Rebuilds the public site with the saved changes (about two minutes). |
| Staff accounts, Activity log | Owner only: invite people, reset passwords and authenticators, read the full log. |

How it fits together:

- Content is stored in a Neon Postgres database (`db/migrations/`). Public pages stay static: they read the
  database **at build time** (`src/lib/site-data.ts`), so "Publish" calls a Netlify build hook. Without
  `DATABASE_URL` the site builds from `src/data` exactly as before.
- Admin pages, `/api/*` and `/media/*` (uploaded photos) run on demand as a Netlify function.
- Sign-in is email + password (scrypt) and then a 6-digit code from an authenticator app, with ten
  one-time recovery codes. Sessions last 12 hours; the database keeps only hashes of session tokens and
  one-time links. Wrong passwords and codes are rate-limited. Every sign-in and change is written to an
  append-only activity log.
- Photos are resized in the browser before upload (1600 px and 640 px WebP, about 150 KB + 40 KB) and
  stored in the database. Uploads no longer used anywhere are removed after a day.
- Owners send invitations and password resets as one-time links (no email service needed).

### Settings (Netlify → Site configuration → Environment variables)

| Name | |
| --- | --- |
| `DATABASE_URL` | Neon connection string (pooled). Needed by builds and functions. |
| `ADMIN_SECRETS_KEY` | 32+ random characters. Encrypts authenticator keys. Changing it makes everyone set up their authenticator again. |
| `NETLIFY_BUILD_HOOK` | Build hook URL for the Publish button. |

For local work copy `.env.example` to `.env.development.local` and point it at a Neon **dev** branch.
`DEV_ADMIN_EMAIL` there opens the panel as that account without signing in (never used in production builds).

### Database commands

```bash
npm run db:dev -- migrate                          # dev branch (.env.development.local)
npm run db:dev -- seed                             # copy src/data into empty tables
npm run db -- status                               # live database (.env.local)
npm run db -- invite name@example.com owner "Name"  # one-time link to set a password
npm run db -- reset-password name@example.com
npm run db -- reset-2fa name@example.com           # lost phone and recovery codes
```
