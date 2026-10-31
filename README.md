# Nero — Jonah Mark Tabuzo

Portfolio of Jonah Mark Tabuzo (Nero): Full-Stack Web Developer, Systems Creator & Visual Storyteller. Built with React 18, Vite, Tailwind CSS 4 (base reset only), Lenis and Lucide icons.

The PCEC Connect case study was refreshed on 31 October 2026 with 54 current capabilities, six separately labelled future items, 13 actual interface captures and links to the live app and its nine-document reference library. Captures use an isolated sample backend. The feature snapshot lives in `src/data/pcecFeatureInventory.json`; planned integrations must stay separate from shipped functionality. Run `npm run check`, `npm run build`, then `npm run test:pcec` to verify the catalog, assets, mobile/desktop modal, feature search, gallery and close behavior. Playwright Chromium must be installed in the test environment (`npx playwright install chromium`).

## Run locally

```sh
npm install
npm run dev
npm run check
npm run build
npm run test:site   # Playwright end-to-end check of the built site
npm run test:pcec
```

The development server runs at http://localhost:5173. `npm run build` writes `dist/` and then `scripts/prerender.mjs` adds a copy of the page at `dist/work/<id>/index.html` for every project (own title, description and social image) plus `dist/sitemap.xml`. `vercel.json` rewrites `/work/<id>` to that file. The Playwright checks use the bundled Chromium; set `PLAYWRIGHT_CHANNEL=msedge` (or `chrome`) to use an installed browser instead.

## Structure

Products first: a compact hero, then nine featured products, the full archive of 22 projects, About, Experience, Toolkit, Visual storytelling and Contact.

- **Products.** `featuredProducts` in `src/data/projectCatalog.js`, ordered by `featured`. Each has a 16:10 cover in `public/assets/projects/covers/` (800 and 1600 px WebP), a one-line `summary`, a development `stage` (Released, Deployed, Completed, Testing, In development, Open source, Prototype, Local tool) and a `context`.
- **Case studies.** Every project opens at `/work/<id>` as a full-screen view (`src/components/CaseStudy.jsx`) with a screenshot gallery and viewer (`ScreenshotGallery.jsx`). Longer content sits in expandable sections. Live, documentation and source links appear only when the project data has a real URL.
- **Archive.** `src/components/ProjectIndex.jsx`: search plus filters for web, desktop, business systems, AI & automation, creative projects and experiments (`types` on each project).
- **Toolkit.** `toolkit` in `src/data/siteData.js`. "Used in" counts are calculated from project stacks.
- **PHILRADS Staff Portal.** `src/data/philradsPortal.js`, with screenshots in `public/assets/projects/philrads-portal/` taken from the production build with invented sample data.

PNG screenshots have WebP copies beside them, which the site loads; the PNGs are kept as originals.

## Design

Dark editorial minimalism around the Nero identity: charcoal surfaces, off-white Tomorrow type, the red pixel-N mark, VT323 for counts and the footer wordmark, Fragment Mono for technology stacks (all self-hosted through Fontsource). Screenshots carry the visual weight. The hero settles in once on load; everything else moves only in response to the visitor. Lenis smooth scrolling, the hero animation and all transitions switch off for reduced motion.

## Code map

- `src/App.jsx`: page sections, navigation, the floating contact button and dialogs.
- `src/hooks/useRoute.js`: the `/work/<id>` history router. `useLenis.js`: smooth scrolling.
- `src/components/`: `ProductGrid`, `CaseStudy`, `ScreenshotGallery`, `ProjectIndex`, `Toolkit`, `StageBadge`, and `EditorialTools` (dialogs, photo/video viewer, contact form, résumé download check).
- `src/components/nero/`: the Nero mark, scramble text and the portrait reveal.
- `src/styles/nero.css`: the theme. `src/index.css` only loads Tailwind.
- `src/data/`: profile, projects, Staff Portal case study, toolkit, experience and field notes.
- `PROJECT_INVENTORY.md`: which repositories and local folders map to which projects.

## Contact and analytics

The contact form posts to Formspree (`site.formspree`). The résumé downloads only after a press-and-hold check. Microsoft Clarity stays off unless `VITE_CLARITY_ID` is set.

## Brand assets

`public/assets/brand/` holds the pixel-N mark (red, black, glyph-only) and the NERO lockups (for light and dark backgrounds). `public/assets/icons/nero.svg` is the favicon. The PNG app icons and the 1200×630 social image (`nero-social.png`) are rendered from these.
