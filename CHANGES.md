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
