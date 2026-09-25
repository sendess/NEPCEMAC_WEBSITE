// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// Public pages are built as static files. When DATABASE_URL is set they read their content
// (activities, notices, team, contact details) from the database at build time; the admin
// panel's "Publish" button starts a new build. Admin pages and APIs run on demand.
export default defineConfig({
  site: 'https://nepcemac.org.np',
  trailingSlash: 'ignore',

  adapter: netlify({
    // Build-time image optimisation only; uploaded photos are resized in the browser.
    imageCDN: false,
    devFeatures: { images: false, environmentVariables: false, edgeFunctions: false },
  }),
  // Astro sessions are unused (admin sign-in has its own session table).
  session: false,

  env: {
    schema: {
      // Without a database the site builds from the files in src/data (as before the admin panel).
      DATABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Encrypts authenticator keys and hashes visitor IP addresses. At least 32 characters.
      ADMIN_SECRETS_KEY: envField.string({ context: 'server', access: 'secret', optional: true, min: 32 }),
      // Netlify build hook URL, called by the admin "Publish" button.
      NETLIFY_BUILD_HOOK: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  fonts: [
    {
      name: 'Mukta',
      cssVariable: '--font-body',
      provider: fontProviders.google(),
      // 700 is for Nepali headings (see global.css).
      weights: [400, 600, 700],
      subsets: ['latin', 'devanagari'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'Poppins',
      cssVariable: '--font-display',
      provider: fontProviders.google(),
      weights: [600, 700],
      subsets: ['latin', 'devanagari'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  // Leaflet is imported lazily by the contact map; bundling it up front stops the dev
  // server from re-optimising mid-session and serving a stale copy.
  vite: {
    optimizeDeps: { include: ['leaflet'] },
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-NP', ne: 'ne-NP' } },
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
