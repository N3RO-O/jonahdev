import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  projectCatalog,
  selectedProjects,
  featuredProducts,
  catalogCategories,
} from "../src/data/projectCatalog.js";
import { site, creative, certifications } from "../src/data/siteData.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Repositories featured in the portfolio. Forks, experiments and older
// editions that are not portfolio pieces are intentionally left out.
const expectedRepositories = [
  "kiddytrack",
  "kiddytrack-CPIC",
  "Philrads-Asset-Inventory",
  "reportly-app",
  "jonahdev",
  "Nerovault",
  "shainaportfolio",
  "habit-ops",
  "update-pcec-app",
  "ChurchTimesUp",
  "N3RO-O",
  "pcec-connect-pwa",
  "MyAIpeeps",
  "philrads-disaster-bot",
  "DateMyLDR",
  "PHILRADS-Portal",
];
const represented = projectCatalog.flatMap((project) =>
  project.repository ? [project.repository.name] : [],
);
assert.deepEqual(
  [...represented].sort(),
  [...expectedRepositories].sort(),
  "Every featured repository must appear exactly once.",
);
assert.equal(
  new Set(projectCatalog.map((project) => project.id)).size,
  projectCatalog.length,
  "Project IDs must be unique.",
);
const categories = new Set(catalogCategories.map(([key]) => key));
const assets = [
  site.photo,
  site.cvUrl,
  "/assets/icons/nero.svg",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/nero-social.png",
];
for (const project of projectCatalog) {
  assert.ok(
    project.title && project.description && project.tech.length,
    `Missing project content: ${project.id}`,
  );
  assert.ok(
    project.types.length && project.types.every((type) => categories.has(type)),
    `Unknown or missing archive category: ${project.id}`,
  );
  assert.ok(project.stage || project.status, `Missing status: ${project.id}`);
  if (project.repository?.visibility === "private")
    assert.ok(
      !project.repository.url,
      `Private source link exposed: ${project.id}`,
    );
  if (project.cover) assets.push(project.cover, project.coverSmall);
  for (const gallery of project.galleries) {
    assert.ok(gallery.images.length, `Empty gallery: ${project.id}`);
    for (const image of gallery.images) {
      assert.ok(image.caption, `Screenshot without a caption: ${image.src}`);
      assets.push(image.src, ...(image.thumb ? [image.thumb] : []));
    }
  }
  for (const strip of project.motion || [])
    assets.push(...strip.frames.map((frame) => frame.src));
}
assert.equal(projectCatalog.length, 22, "All 22 projects stay in the archive.");
assert.equal(featuredProducts.length, 9, "Nine featured products on the homepage.");
for (const product of featuredProducts)
  assert.ok(product.cover && product.summary, `Featured product needs a cover and summary: ${product.id}`);
const portal = projectCatalog.find((project) => project.id === "philrads-portal");
assert.equal(portal.repository.url, undefined, "The Staff Portal has no public source link.");
assert.equal(portal.liveUrl, undefined, "The Staff Portal has no public demo.");
for (const item of creative.items)
  assets.push(item.src, ...(item.thumb ? [item.thumb] : []), ...(item.poster ? [item.poster] : []));
assets.push(...certifications.map((cert) => cert.image).filter(Boolean));
for (const asset of assets) {
  assert.ok(asset.startsWith("/assets/"), `Unexpected asset path: ${asset}`);
  assert.ok(
    fs.existsSync(path.join(root, "public", asset.split("?")[0])),
    `Missing asset: ${asset}`,
  );
}
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "public/manifest.json"), "utf8"),
);
assert.equal(manifest.short_name, "Nero");
assert.equal(
  projectCatalog.filter((project) => project.category === "visual").length,
  0,
  "Video exports are kept out of the project archive.",
);
console.log(
  `Checked ${projectCatalog.length} projects, ${represented.length} repositories, ${selectedProjects.length} featured products, and ${assets.length} asset references. No missing assets or private source links.`,
);
