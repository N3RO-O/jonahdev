# Design pass — typography, layout, motion

Scope: 14 files, no copy/content changes, no new dependencies (framer-motion's
`MotionConfig` was already in your installed version).

## 1. Frame-index numerals on every section (SectionHeader.jsx, index.css)
Every section used identical headers (pulsing dot → eyebrow → title →
subtitle), which is the main reason the page felt templated no matter how
good each individual section was. Added a large, faint mono numeral
("01"–"10") beside each header on `lg+` screens, with a thin accent rule —
a nod to contact-sheet frame numbers that fits the photography motif and
the existing code-comment eyebrow style (`// about`, `// skills`, etc.).
Hidden below `lg` so mobile layout is untouched.

New `index` prop on `<SectionHeader>`, wired into all 10 call sites
(About, Skills, Projects, Experience, Creative, Education, Testimonials,
FAQ, Blog, Contact) in reading order.

## 2. Fluid type scale (index.css, Hero.jsx)
`.section-title` and the Hero `<h1>` moved from fixed Tailwind breakpoints
(`text-3xl sm:text-4xl`, `text-4xl sm:text-5xl lg:text-6xl`) to `clamp()`
based sizing. They now scale continuously with viewport width instead of
jumping at 640px/1024px, and the hero headline has a bit more presence at
the top end (max ~72px vs. the old 60px cap) without breaking the
two-column layout next to the portrait.

## 3. Staggered, consistent-easing reveals (SectionHeader.jsx, Hero.jsx, main.jsx)
- SectionHeader's index/eyebrow/title/subtitle now animate in as a
  sequence (`staggerChildren`) instead of one flat block — reads as more
  deliberate on scroll.
- Both Hero and SectionHeader now use the same `cubic-bezier(0.22, 1, 0.36, 1)`
  "expo-out" curve already used for the intro overlay and scroll-to
  behavior, so first-impression motion and scroll-reveal motion feel like
  the same hand instead of two different easing defaults.
- Wrapped the app in `<MotionConfig reducedMotion="user">` (main.jsx) so
  *every* framer-motion animation respects `prefers-reduced-motion`
  automatically. Previously only Hero checked this explicitly — Section
  reveals, Testimonials, Creative's grid, etc. did not.

## 4. Flagship weight on two sections (SectionHeader.jsx, index.css, About.jsx, Projects.jsx)
Giving all ten sections a numeral fixed the "identical header" problem, but
they were still all the same *size*. Added an optional `size="lg"` variant
on `<SectionHeader>` — a bigger title and index numeral, used only on
**About** (right after the Hero, so it carries some of that energy forward)
and **Projects** (your featured-work section, the one that should carry
the most visual weight). Everything else stays at the standard size, so
the two flagship sections read as genuine high points in the scroll rather
than the whole page getting louder.

## 5. Fluid hero portrait + CTA rhythm (Hero.jsx)
The portrait was fixed at `h-64 w-64` on mobile and jumped straight to
`h-80 w-80` at the `sm` breakpoint — a visible size-jump on resize/rotation.
It now scales continuously with `clamp(15rem, 12rem + 10vw, 21rem)`, same
technique as the section titles, so the headline and the portrait scale as
one system instead of two different sizing strategies. The CTA button
row's top margin got the same fluid treatment for consistency.

## How to apply
Drop `src/index.css`, `src/main.jsx`, and everything in `src/components/`
here into the matching paths in your project (overwriting the existing
ones), then:

```
npm install
npm run dev
```

Verified with `npm run build` — no errors, no new dependencies.

## Where I'd go next
- Extend the `size="lg"` treatment thinking to Contact (the closing CTA)
  if you want the page to end on the same weight it opens with.
- Creative's grid could pick up a similar rhythm break — e.g. one larger
  "hero" tile in the grid instead of every tile being identical size.
- A per-section accent shift (same gold, different intensity/motif per
  section) would reinforce the numbering device even further.
