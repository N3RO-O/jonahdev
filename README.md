# Jonah Tabuzo — Portfolio v2

Modern React portfolio built with **Vite**, **React 18**, **Tailwind CSS**, and **Framer Motion**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output → dist/
npm run preview  # preview production build
```

## Deploy to Vercel

1. Push this folder to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

## Customize content

Edit `src/data/siteData.js` for:

- Hero headline, availability banner, social links
- Projects (case studies, tech badges, metrics, screenshots)
- Skills categories
- Experience, education, certifications
- Creative gallery paths
- Contact form (Formspree URL)

## Assets

Static files live in `public/assets/`:

- `jonah-photo-updated.jpg`, `jonah-tabuzo-cv.pdf`
- `projects/` — project screenshots
- `creative/` — photography & video
- `certs/` — add certificate images (optional)

## Analytics (optional)

This site does not ship with analytics. To add Google Analytics, insert the
GA snippet into `index.html` `<head>` and replace `G-XXXXXXXXXX` with your
measurement ID. Everything else deploys as-is.

## Analytics (optional)

Microsoft Clarity is supported out of the box but **off by default** (no
trackers load). Enable it by setting a project ID:

```
# .env (or Vercel project env)
VITE_CLARITY_ID=your-clarity-project-id
```

## Blog

Posts live in `src/data/blog.js` as structured content (title, date, excerpt,
tags, and a `body` array of paragraph / heading / code blocks). The `Blog`
component renders a list and an in-page detail view — no router or markdown
dependency required. Add an entry to publish a new post.
