# NeroSec — Jonah Mark Tabuzo

An editorial portfolio for a Full-Stack Web Developer, Systems Creator & Visual Storyteller. Built with React 18, Vite, Tailwind's base reset, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The development server runs at http://localhost:5173. Production files are generated in `dist/`. The existing `vercel.json` retains the Vite deployment configuration.

## Design and content

- `src/App.jsx`: portfolio sections, navigation, project filters, and modal entry points.
- `src/components/EditorialTools.jsx`: accessible native dialogs, project galleries, image/video viewer, system console, and contact form.
- `src/index.css`: the original dark grain canvas, bone-white type, and the requested black/red palette (`#000000`, `#3D0000`, `#950101`, `#FF0000`). Responsive layouts and reduced-motion preferences are supported.
- `src/data/siteData.js`: profile, original account URLs, original case studies, skills, experience, education, certificates, and creative assets.
- `src/data/projectCatalog.js`: 33 projects covering all 21 inventoried GitHub repositories, local tools, earlier editions, and five visual projects. Nine projects appear in the selected showcase.
- `src/components/ProjectIndex.jsx`: searchable project index with category filters and complete project details.
- `PROJECT_INVENTORY.md`: repository and local-folder coverage, duplicate mappings, attribution, and source notes.
- `src/data/blog.js`: field notes, rendered in a reading dialog.
- `public/assets/`: original photography, screenshots, video, and résumé, plus NeroSec brand assets.
- `index.html` and `public/manifest.json`: NeroSec metadata, social preview, structured identity data, and app icons.

The visual direction references [Graphic Design Portfolio 2025 by Sam Momin](https://www.behance.net/gallery/224632473/Graphic-Design-Portfolio-2025): large typography, portrait framing, paper textures, restrained color, and editorial composition.

## NeroSec System Console

Open the console badge beneath the hero. Supported commands: `help`, `whoami`, `projects`, `skills`, `contact`, `status`, `clear`, `go work`, `go archive`, `go about`, and `go contact`. Up/down arrows recall command history. Escape closes the dialog. Commands operate on portfolio content in the browser.

## Contact and analytics

The contact form keeps the existing Formspree endpoint, includes browser validation, and handles sending, success, failure, and request timeout. Update `site.formspree` to change its destination. The social links retain the owner's actual account URLs.

Microsoft Clarity remains optional and disabled unless `VITE_CLARITY_ID` is set in the environment.

## Brand assets

`public/assets/icons/nerosec.svg` is the vector mark. PNG app icons and the 1200×630 social image can be regenerated with `python scripts/render_brand_assets.py` (Pillow and Windows fonts required).
