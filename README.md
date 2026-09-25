# nepcemac.org.np

Website of the Nepal Pollution Control and Environment Management Centre (NEPCEMAC),
an NGO working in solid waste management in Nepal since 1997.

Built with [Astro](https://astro.build), in English (`/`) and Nepali (`/ne/`), and deployed
on Netlify from the `main` branch.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

- Page words and records live in `src/data/*.ts` (each value has `en` and `ne`).
- Photos are enhanced, pre-sized WebP files in `public/images/photos/` (480px, 960px, 1400px and original width).
  `src/data/photo-sizes.json` holds each photo's sizes, average colour (shown while loading) and smart focal
  point (used as object-position when cropped); captions are in `src/data/photos.ts`.
- Partners and records (`src/data/partners.ts`) must each come from a written source.
- Old addresses from earlier NEPCEMAC sites are redirected in `netlify.toml`.
