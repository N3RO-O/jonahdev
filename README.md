# Nero — Jonah Mark Tabuzo

Portfolio of Jonah Mark Tabuzo (Nero): Full-Stack Web Developer, Systems Creator & Visual Storyteller. Built with React 18, Vite, Tailwind CSS 4 (base reset only), Lenis and Lucide icons.

The PCEC Connect case study was refreshed on 31 October 2026 with 54 current capabilities, six separately labelled future items, 13 actual interface captures and links to the live app and its nine-document reference library. Captures use an isolated sample backend. The feature snapshot lives in `src/data/pcecFeatureInventory.json`; planned integrations must stay separate from shipped functionality. Run `npm run check`, `npm run build`, then `npm run test:pcec` to verify the catalog, assets, mobile/desktop modal, feature search, gallery and close behavior. Playwright Chromium must be installed in the test environment (`npx playwright install chromium`).

## Run locally

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The development server runs at http://localhost:5173. Production files are generated in `dist/`, which `vercel.json` deploys.

## Design

The look and motion follow [nerochain.io](https://nerochain.io/), with red as the brand colour: a white canvas, black type, uppercase headings in Tomorrow, pixel accents in VT323 and labels in Fragment Mono (all self-hosted through Fontsource).

Effects, all switched off for visitors who prefer reduced motion:

- **Smooth scrolling.** Lenis gives weighted scrolling, and anchor links glide to their section.
- **Portrait reveal.** Hovering the About portrait scatters its halftone dots and uncovers the clear colour photo.
- **Particle wave.** The hero has a canvas of dots rippling like a surface, with red and black nodes. It reacts to the pointer and pauses when off screen.
- **Scramble text.** Pixel headings decode from random glyphs when they scroll into view.
- **Pinned work reel.** Selected work scrolls sideways while the section stays pinned, with a progress counter. On phones it becomes a vertical grid.
- **Card fan.** The "Starts here" cards fan out as you scroll.
- **Smaller touches.** There's a stack marquee, rise-in reveals and a reading-progress bar.

## Code map

- `src/App.jsx`: page sections, navigation and the dialogs.
- `src/components/nero/`: the Nero mark, pixel icons, scramble text, particle wave, pinned reel and card fan.
- `src/hooks/`: Lenis, scroll-progress and reveal hooks.
- `src/styles/nero.css`: the theme. `src/index.css` only loads Tailwind.
- `src/components/EditorialTools.jsx`: native dialogs, project galleries, the image and video viewer, the contact form and the résumé download check.
- `src/components/ProjectIndex.jsx`: the searchable archive.
- `src/data/`: profile, projects (`projectCatalog.js`), skills, experience and field notes.
- `PROJECT_INVENTORY.md`: which repositories and local folders map to which projects.

## Contact and analytics

The contact form posts to Formspree (`site.formspree`). The résumé downloads only after a press-and-hold check. Microsoft Clarity stays off unless `VITE_CLARITY_ID` is set.

## Brand assets

`public/assets/brand/` holds the pixel-N mark (red, black, glyph-only) and the NERO lockups (for light and dark backgrounds). `public/assets/icons/nero.svg` is the favicon. The PNG app icons and the 1200×630 social image (`nero-social.png`) are rendered from these.
