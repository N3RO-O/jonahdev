// Writes a copy of the built page at /work/<id>/ for every project, with
// its own title, description, canonical URL and social preview, so shared
// case-study links unfurl correctly. The app itself opens the case study
// from the URL. Also writes the sitemap with every case-study URL.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projectCatalog } from "../src/data/projectCatalog.js";
import { site } from "../src/data/siteData.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setMeta(html, attribute, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`Missing meta ${attribute}="${key}" in dist/index.html`);
  return html.replace(pattern, `$1${escape(value)}$2`);
}

for (const project of projectCatalog) {
  const url = `${site.url}/work/${project.id}`;
  const title = `${project.title} — Nero / Jonah Mark Tabuzo`;
  const description = project.summary || project.description;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  if (project.cover) {
    const image = `${site.url}${project.cover}`;
    html = setMeta(html, "property", "og:image", image);
    html = setMeta(html, "property", "og:image:width", "1600");
    html = setMeta(html, "property", "og:image:height", "1000");
    html = setMeta(html, "property", "og:image:alt", `${project.title} screenshot`);
    html = setMeta(html, "name", "twitter:image", image);
  }
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
  const folder = path.join(dist, "work", project.id);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, "index.html"), html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${site.url}/`, priority: "1.0" },
  ...projectCatalog.map((project) => ({
    loc: `${site.url}/work/${project.id}`,
    priority: project.featured ? "0.8" : "0.5",
  })),
];
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      ({ loc, priority }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`,
);

console.log(`Prerendered ${projectCatalog.length} case-study pages and a ${urls.length}-URL sitemap.`);
