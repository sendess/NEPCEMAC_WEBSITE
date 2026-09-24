// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Level 1: a fully static site. Pages keep their content in src/data so an admin
// panel (Level 2, like nepsemyak.com.np) can take it over section by section.
export default defineConfig({
  site: 'https://nepcemac.org.np',
  trailingSlash: 'ignore',

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
    }),
  ],
});
