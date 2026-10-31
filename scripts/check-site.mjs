// End-to-end check of the built site in Chromium at desktop and phone
// widths: products, case studies (by click and by URL), galleries, the
// archive search and filters, navigation, dialogs, the contact form (with
// Formspree stubbed), keyboard focus and image loading. Screenshots land
// in .local-test/site. Run after `npm run build`.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";
import { projectCatalog, featuredProducts } from "../src/data/projectCatalog.js";

const BASE = "http://127.0.0.1:5260";
const output = resolve(process.env.SITE_CAPTURE_DIR || ".local-test/site");
await mkdir(output, { recursive: true });
const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", "5260", "--strictPort"],
  { stdio: "pipe" },
);
await new Promise((yes, no) => {
  server.stdout.once("data", yes);
  server.once("error", no);
  server.once("exit", (code) => no(Error("Preview exited " + code)));
});

// PLAYWRIGHT_CHANNEL=msedge (or chrome) uses an installed browser instead of
// the Playwright download.
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
const noOverflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const imagesLoaded = (scope) =>
  scope.evaluate(async (root) => {
    const images = [...root.querySelectorAll("img")];
    images.forEach((img) => (img.loading = "eager"));
    await Promise.all(images.map((img) => img.decode().catch(() => {})));
    return images.filter((img) => !img.naturalWidth).map((img) => img.currentSrc || img.src);
  });

async function open(width, height, options = {}) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce", ...options });
  const page = await context.newPage();
  const problems = [];
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("console", (message) => message.type() === "error" && problems.push(`console: ${message.text()}`));
  page.on("response", (response) => {
    if (response.url().startsWith(BASE) && response.status() >= 400)
      problems.push(`${response.status()} ${response.url()}`);
  });
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(BASE)) return route.continue();
    if (url.startsWith("https://formspree.io/"))
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    return route.abort();
  });
  return { context, page, problems };
}

try {
  for (const [width, height, label] of [
    [1440, 900, "desktop"],
    [390, 844, "mobile"],
  ]) {
    const { context, page, problems } = await open(width, height);
    await page.goto(BASE);
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.match(await page.getByRole("heading", { level: 1 }).innerText(), /Building digital products\.\s*Turning ideas into working systems\./);
    await page.screenshot({ path: resolve(output, `home-${label}.png`) });

    // Products are the first section after the hero and every card links to its case study.
    const firstSection = await page.evaluate(() => document.querySelector("main > section:nth-of-type(2)").id);
    assert.equal(firstSection, "products");
    const cards = page.locator(".product-link");
    assert.equal(await cards.count(), featuredProducts.length);
    for (let i = 0; i < featuredProducts.length; i++)
      assert.equal(await cards.nth(i).getAttribute("href"), `/work/${featuredProducts[i].id}`);
    assert.deepEqual(await imagesLoaded(page.locator("#products")), [], "Product covers load");
    await page.locator("#products").screenshot({ path: resolve(output, `products-${label}.png`) });
    assert.ok(await noOverflow(page), "No sideways scrolling on the homepage");

    // Navigation.
    if (label === "mobile") {
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      assert.equal(await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded"), "true");
      await page.screenshot({ path: resolve(output, `menu-${label}.png`) });
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
      assert.equal(await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded"), "false");
    } else {
      for (const name of ["Products", "Projects", "About", "Experience", "Contact"]) {
        await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: new RegExp(`^${name}`) }).click();
        await page.waitForTimeout(150);
        const id = name.toLowerCase();
        const top = await page.evaluate((id) => document.getElementById(id).getBoundingClientRect().top, id);
        assert.ok(Math.abs(top) < 80, `${name} link scrolls to its section (top ${top})`);
      }
    }

    // Case study opened by click: URL, title, gallery, viewer, close.
    await page.goto(BASE);
    await cards.first().click();
    const dialog = page.getByRole("dialog", { name: "PHILRADS Staff Portal" });
    await dialog.waitFor();
    assert.equal(new URL(page.url()).pathname, "/work/philrads-portal");
    assert.match(await page.title(), /PHILRADS Staff Portal/);
    assert.equal(await dialog.getByRole("link", { name: /Live demo|Source on GitHub/ }).count(), 0, "No public demo or repo link");
    await page.screenshot({ path: resolve(output, `case-portal-${label}.png`) });
    const frame = dialog.locator(".gallery-frame img");
    const first = await frame.getAttribute("src");
    await dialog.getByRole("button", { name: "Next screenshot" }).click();
    assert.notEqual(await frame.getAttribute("src"), first, "Next screenshot changes the image");
    await dialog.locator(".gallery").press("ArrowLeft");
    assert.equal(await frame.getAttribute("src"), first, "Arrow keys move through screenshots");
    for (const tab of ["Modules", "On a phone", "Latest release"]) {
      await dialog.getByRole("button", { name: new RegExp(`^${tab}`) }).click();
      assert.equal(await dialog.getByRole("button", { name: new RegExp(`^${tab}`) }).getAttribute("aria-pressed"), "true");
    }
    await dialog.locator(".gallery-frame").click();
    const viewer = page.getByRole("dialog", { name: "Screenshot viewer" });
    await viewer.waitFor();
    await page.screenshot({ path: resolve(output, `viewer-${label}.png`) });
    await page.keyboard.press("Escape");
    await viewer.waitFor({ state: "detached" });
    assert.ok(await dialog.isVisible(), "Escape closes only the viewer");
    for (const name of ["Modules", "Technical details", "Interaction detail", "Development story"]) {
      await dialog.locator("summary", { hasText: name }).click();
    }
    assert.deepEqual(await imagesLoaded(dialog.locator(".case-sections")), [], "Motion strips load");
    await dialog.locator(".motion-strip").first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: resolve(output, `case-portal-details-${label}.png`) });
    assert.ok(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1), "Case study has no sideways scroll");
    await dialog.getByRole("link", { name: /Next/ }).click();
    assert.equal(new URL(page.url()).pathname, `/work/${featuredProducts[1].id}`);
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" }).catch(() => {});
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert.equal(new URL(page.url()).pathname, "/");

    // Archive: search, filters, counts.
    const search = page.getByLabel("Search the complete project index");
    await search.fill("electron");
    const rows = page.locator(".index-row");
    const names = await rows.locator(".index-name strong").allInnerTexts();
    assert.ok(names.includes("Church Time's Up") && names.includes("MyAIpeeps"), `Search finds Electron apps: ${names}`);
    await search.fill("zzzz-nothing");
    await page.getByRole("button", { name: "Clear search and filters" }).click();
    for (const [key, labelText] of [
      ["desktop", "Desktop applications"],
      ["business", "Business systems"],
      ["ai", "AI & automation"],
      ["creative", "Creative projects"],
      ["experiment", "Experiments"],
      ["web", "Web applications"],
    ]) {
      await page.getByRole("button", { name: new RegExp(`^${labelText.replace("&", "\\&")}`) }).click();
      assert.equal(await rows.count(), projectCatalog.filter((p) => p.types.includes(key)).length, `${labelText} filter`);
    }
    await page.getByRole("button", { name: /^All/ }).click();
    await page.getByRole("button", { name: /Show all 22 projects/ }).click();
    assert.equal(await rows.count(), 22, "Archive shows all 22 projects");
    await page.locator("#projects").screenshot({ path: resolve(output, `archive-${label}.png`) });
    await rows.filter({ hasText: "Reportly" }).click();
    await page.getByRole("dialog", { name: "Reportly" }).waitFor();
    await page.getByRole("button", { name: "Close dialog" }).click();

    // Experience, certificates, résumé, contact form.
    await page.locator("#experience summary").nth(1).click();
    assert.match(await page.locator("#experience").innerText(), /462-hour OJT/);
    await page.getByRole("button", { name: /Certifications and training/ }).click();
    assert.ok(await page.locator("#certificates").isVisible());
    await page.getByRole("button", { name: /View certificate/ }).first().click();
    await page.getByRole("dialog").locator("img").evaluate((img) => img.decode());
    await page.getByRole("button", { name: "Close dialog" }).click();
    await page.locator("#experience").getByRole("button", { name: /Download résumé/ }).click();
    await page.getByRole("button", { name: /Press and hold to download/ }).waitFor();
    await page.getByRole("button", { name: "Close dialog" }).click();
    await page.locator("#toolkit summary").first().click();
    await page.locator("#creative").getByRole("button", { name: /Show all 7 photographs/ }).click();
    assert.equal(await page.locator(".photo-tile").count(), 7);
    await page.locator(".photo-tile").first().click();
    await page.getByRole("button", { name: "Next photograph" }).click();
    await page.getByRole("button", { name: "Close dialog" }).click();
    await page.locator("#creative").screenshot({ path: resolve(output, `creative-${label}.png`) });
    await page.getByLabel("Your name").fill("Test Visitor");
    await page.getByLabel("Email address").fill("visitor@example.com");
    await page.getByLabel("Tell me a little more").fill("Checking the form.");
    await page.getByRole("button", { name: "Send your message" }).click();
    await page.getByText("Message sent.").waitFor();
    await page.locator("#contact").screenshot({ path: resolve(output, `contact-${label}.png`) });
    assert.ok(await noOverflow(page), "No sideways scrolling after interactions");
    assert.deepEqual(problems, [], `${label}: ${problems.join("\n")}`);
    await page.screenshot({ path: resolve(output, `full-${label}.png`), fullPage: true });
    await context.close();
    console.log(`PASS ${label} ${width}px: hero, 9 products, nav, case study, gallery, viewer, archive search and filters, experience, résumé, photos, contact form.`);
  }

  // Every case study opens straight from its own URL, with its screenshots loading.
  {
    const { context, page, problems } = await open(1280, 860);
    for (const project of projectCatalog) {
      await page.goto(`${BASE}/work/${project.id}`);
      const dialog = page.getByRole("dialog", { name: project.title });
      await dialog.waitFor();
      const groups = project.galleries.length;
      for (let g = 0; g < groups; g++) {
        if (groups > 1) await dialog.locator(".gallery-tabs button").nth(g).click();
        const count = project.galleries[g].images.length;
        for (let i = 0; i < count; i++) {
          const ok = await dialog.locator(".gallery-frame img").evaluate((img) => img.decode().then(() => img.naturalWidth > 0, () => false));
          assert.ok(ok, `${project.id} screenshot ${g}/${i} loads`);
          if (count > 1) await dialog.getByRole("button", { name: "Next screenshot" }).click();
        }
      }
      if (!groups) assert.ok(await dialog.locator(".gallery-empty").isVisible(), `${project.id} shows the no-screenshot fallback`);
      // Vercel rewrites /work/<id> to this file (vercel.json).
      const html = await (await fetch(`${BASE}/work/${project.id}/index.html`)).text();
      assert.match(html, new RegExp(`<title>${project.title.replace(/[()]/g, "\\$&")} — Nero`), `${project.id} prerendered title`);
    }
    // Keyboard: the skip link comes first and focus is visible.
    await page.goto(BASE);
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.textContent), "Skip to content");
    for (let i = 0; i < 4; i++) await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    assert.notEqual(outline, "none", "Focused element shows an outline");
    assert.deepEqual(problems, [], problems.join("\n"));
    await context.close();
    console.log(`PASS all ${projectCatalog.length} case studies open from their URLs with every screenshot loading; keyboard focus visible.`);
  }

  // Full motion still settles: content is visible without reduced motion.
  {
    const { context, page, problems } = await open(1440, 900, { reducedMotion: "no-preference" });
    await page.goto(BASE);
    await page.waitForTimeout(1400);
    assert.equal(await page.locator(".hero h1 span").first().evaluate((el) => getComputedStyle(el).opacity), "1");
    await page.screenshot({ path: resolve(output, `home-motion-desktop.png`) });
    assert.deepEqual(problems, [], problems.join("\n"));
    await context.close();
    console.log("PASS full-motion load settles with the hero visible.");
  }
} finally {
  await browser.close();
  server.kill();
}
