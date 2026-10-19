import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  projectCatalog,
  selectedProjects,
  catalogCategories,
} from "../src/data/projectCatalog.js";
import { site, creative, certifications } from "../src/data/siteData.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Owner repositories returned by the connected GitHub inventory, 2026-10-19.
const expectedRepositories = [
  "Nero-s-Soundcloud",
  "kiddytrack",
  "kiddytrack-CPIC",
  "Philrads-Asset-Inventory",
  "patawad",
  "weekly-report-builder",
  "reportly-app",
  "Wand-Enhancer",
  "jonahdev",
  "Nerovault",
  "shainaportfolio",
  "df2-Necrotonine",
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
  "Every inventoried repository must appear exactly once.",
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
  "/assets/icons/nerosec.svg",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/nerosec-social.png",
];
for (const project of projectCatalog) {
  assert.ok(
    project.title && project.description && project.tech.length,
    `Missing project content: ${project.id}`,
  );
  assert.ok(
    categories.has(project.category),
    `Unknown category: ${project.id}`,
  );
  if (project.repository?.visibility === "private")
    assert.ok(
      !project.repository.url,
      `Private source link exposed: ${project.id}`,
    );
  if (project.cover) assets.push(project.cover);
  for (const gallery of project.galleries) {
    assert.ok(gallery.images.length, `Empty gallery: ${project.id}`);
    assets.push(...gallery.images.map((image) => image.src));
  }
}
for (const item of creative.items)
  assets.push(item.src, ...(item.poster ? [item.poster] : []));
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
assert.equal(manifest.short_name, "NeroSec");
assert.equal(
  projectCatalog.filter((project) => project.category === "visual").length,
  5,
  "All five final PHILRADS video projects must be represented.",
);
console.log(
  `Checked ${projectCatalog.length} projects, ${represented.length} repositories, ${selectedProjects.length} selected projects, and ${assets.length} asset references. No missing assets or private source links.`,
);
