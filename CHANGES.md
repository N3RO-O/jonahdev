# Nero redesign — October 2026

The portfolio is rebranded from **NeroSec** to **Nero** and redesigned after nerochain.io, with red as the brand colour.

- **Look.** White canvas, black type and red (`#D81111`) accents. Uppercase headings in Tomorrow, pixel `//` accents in VT323, labels in Fragment Mono, and rounded soft-grey cards. The dark editorial theme (grain, terracotta, Instrument Serif) is retired.
- **Brand.** A new pixel-"N" mark and NERO lockup in `public/assets/brand/`, plus a new favicon, app icons and social card (`nero-social.png`). Every NeroSec string is renamed, including the meta tags, manifest, console prompt (`nero ~ $`), 404 page and project titles.
- **Motion, taken from the reference:**
  - Lenis smooth scrolling, with anchor links that glide to their section.
  - A particle-wave hero canvas.
  - Pixel headings that decode from scrambled glyphs.
  - Selected work as a pinned horizontal reel, driven by scrolling.
  - A card stack that fans out as you scroll.
  - A stack marquee, rise-in reveals and a red reading-progress bar.

  All of these respect reduced motion, and on phones the reel and fan become simple grids.
- **New sections.** "What I do" service cards, principles next to a halftone portrait, "Your idea. Your system. Built with care.", skill cards with chips, social pills, and a black contact panel with the form inside.
- **Cleanup.** The unused v1 components and hooks (`Hero.jsx`, `Navbar.jsx`, `Projects.jsx` and the others) are removed, along with the editorial cursor and effects that are no longer used.

---

# NeroSec editorial redesign — October 2026

Brand: every surface now reads **NeroSec**, the digital identity of Jonah Mark Tabuzo.

- **Palette.** Charcoal canvas `#121214`, bone text `#F4F4F0`, zinc `#A1A1AA`, hairlines
  `rgba(255,255,255,.08)` and a vintage terracotta accent `#D97757` replace the pure red.
  Text on the paper spread uses a deeper terracotta (`#9A4529`) to keep 4.5:1 contrast.
- **Grain.** The global `.bg-grain` noise layer is applied site-wide, with a coarser
  fibre pass on the paper section and the project art.
- **Type.** DM Sans, DM Mono and Instrument Serif are self-hosted via Fontsource
  (no Google Fonts request). Small labels have an 11px floor (10.5px on phones), body copy
  sits at 15–17px, and form fields are 16px so iOS Safari no longer zooms on focus.
- **System Console badge.** The hero badge shows a live prompt, online status and the
  current time in the Philippines. Press `/` anywhere to open the console.
- **Navigation.** The header stays visible while scrolling, blurs over content, and shows a
  terracotta reading-progress line. Active section links get an underline.
- **Work.** Project cards use a set of warm tones (terracotta, espresso, clay, bone,
  charcoal). The 33-entry archive shows 8 entries first; search or filters reveal the rest.
- **Details.** The discipline strip is now a slow marquee (paused on hover, static with
  reduced motion). The contact asterisk sits on the headline. Dialogs ease in.
- **404.** It's rebuilt in the new identity and moved to `public/404.html`, so Vite now ships it.
  Its old links pointed to a `#work` anchor that doesn't exist.
- **Social card + icons.** They're regenerated in terracotta.
- **NS logo.** The asterisk is replaced by a "Console" monogram: NS in DM Mono, a terracotta cursor
  and crop marks. Source SVGs (mark, light, transparent, favicon, lockups) live in
  `public/assets/brand/`. The header uses `src/components/NsMark.jsx`, and the hero and contact
  headlines end in the same blinking cursor. The favicon, app icons, apple-touch icon, social
  card and 404 page all use the new mark. `scripts/render_brand_assets.py` is removed because it
  would redraw the old asterisk icons.
- **Résumé download check.** The three CV links now open a dialog where you press and hold
  (mouse, touch, or Space/Enter) for about a second before the PDF downloads. There's no plain
  link to the PDF in the page until then. `vercel.json` sends `X-Robots-Tag: noindex` for the PDF
  and `robots.txt` disallows it. This keeps crawlers and scrapers off the file, but the PDF is
  still public to anyone who already has the URL.
- **Effects** (all turned off with reduced motion):
  - **Moving grain.** The noise layer shifts in small steps, like projected film.
  - **Darkroom reveal.** Sections fade in, rise and come into focus as you scroll. Headlines wipe up line by line.
  - **Hero entrance.** The hero comes in with a short staggered fade on first load.
  - **Light leak.** A warm leak drifts across the portrait.
  - **Crop marks.** Printer's crop marks frame project art on hover or keyboard focus.
  - **Photo colour.** Photographs move from a faded print to full colour on hover.
  - **Link underline.** Text links draw a terracotta underline on hover.
  - **Loupe cursor.** On desktop with a mouse, a terracotta ring follows the cursor. It reads "View", "Play" or "Open" over work samples. The system cursor stays visible.

Styling lives in `src/styles/editorial.css`, which loads after `src/index.css`.

---

# Design pass — what changed

No copy, data, or layout structure was touched — only visual polish. Five files:
3 modified, 1 new hook, 1 new hook wired into App.jsx.

## 1. Cursor-tracking spotlight on every card (new)
`src/hooks/useCardSpotlight.js` (new) + additions to `src/index.css` (`.card::after`)
+ one line in `src/App.jsx`.

A soft warm-gold glow now follows your cursor across any `.card` element
(Skills, About highlights, Projects, Testimonials) — the same effect used on
sites like Linear/Vercel. It's a single delegated `mousemove` listener (not
one per card), so it's cheap even with dozens of cards on the page, and it's
automatically skipped on touch devices and for anyone with "reduce motion"
enabled.

## 2. Faint film-grain texture (index.css)
A very subtle (3.5% opacity, 5% in dark mode) noise layer sits over the
existing dot-grid background. It's a quiet nod to the photography side of
the site — reads as texture, not noise, and never competes with content.

## 3. Branded scrollbar (index.css)
The browser scrollbar is now a thin, accent-gold thumb instead of the
default grey, in both Chromium (`::-webkit-scrollbar`) and Firefox
(`scrollbar-color`).

## 4. Viewfinder corners now "breathe" (index.css)
The always-visible viewfinder brackets around the hero portrait get a slow,
subtle glow pulse (3.6s cycle) instead of sitting static — small bit of life
for the recurring photography motif. Skipped for reduced-motion. The
hover-only viewfinders elsewhere (project galleries, etc.) are untouched —
they only light up on interaction, as before.

## 5. Ambient glow orbs on Skills & Contact (Skills.jsx, Contact.jsx)
The Hero section already had soft blurred accent-color orbs in the
background. Skills and Contact now get the same treatment (two blurred
circles each, `pointer-events-none`, `aria-hidden`) so that ambient warmth
bookends the page instead of living only in the hero.

## How to apply
Drop these files into the matching paths in your project (overwriting the
existing ones), then:

```
npm install
npm run dev
```

Everything degrades gracefully — reduced-motion and touch users simply don't
get the spotlight/pulse effects, no layout shift either way.
