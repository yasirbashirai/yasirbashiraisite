// ──────────────────────────────────────────────────────────────────────
// Build-time CMS fetcher
// Runs before `vite build` (via package.json prebuild). Pulls all
// published content from Supabase via service_role and writes a single
// JSON file at src/data/cms.generated.json which the public site imports.
//
// This keeps SEO perfect: content is baked into the static bundle at
// build time, so the browser HTML includes everything Google indexes.
// ──────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── load env (.env.local for dev, real env for Vercel) ────────────
function loadEnv() {
  const e = { ...process.env };
  const envPath = join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !e[m[1]]) e[m[1]] = m[2].trim();
    }
  }
  return e;
}
const env = loadEnv();

const URL = env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!URL || !KEY) {
  console.warn(
    "⚠️  CMS fetch skipped: missing VITE_SUPABASE_URL or SUPABASE_SECRET_KEY/VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Writing empty data so build still works."
  );
  ensureEmptyData();
  process.exit(0);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

// ── fetch helper ──────────────────────────────────────────────────
async function fetchTable(table, query = "select=*&is_published=eq.true&order=sort_order.asc") {
  const url = `${URL}/rest/v1/${table}?${query}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 404 || (await res.clone().text()).includes("does not exist")) {
      console.warn(`  ⚠️  ${table}: not migrated yet, skipping (returning [])`);
      return [];
    }
    console.error(`  ❌ ${table}: HTTP ${res.status}`);
    return [];
  }
  return await res.json();
}

// ── ensure empty fallback file exists ────────────────────────────
function ensureEmptyData() {
  const dataDir = join(ROOT, "src", "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  const target = join(dataDir, "cms.generated.json");
  if (!existsSync(target)) {
    writeFileSync(
      target,
      JSON.stringify(
        {
          portfolio: [],
          testimonials: [],
          pricing: [],
          siteContent: {},
          aboutPhotos: [],
          seoPages: [],
          affiliateLinks: [],
          servicePages: [],
          generatedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );
    console.log(`  📄 wrote empty stub at ${target}`);
  }
}

// ── main ──────────────────────────────────────────────────────────
console.log("📥 Fetching CMS content from Supabase…");

const [
  portfolio,
  testimonials,
  pricing,
  siteContentRows,
  aboutPhotos,
  seoPages,
  affiliateLinks,
  servicePages,
] = await Promise.all([
  fetchTable("portfolio_projects"),
  fetchTable("testimonials"),
  fetchTable("pricing_tiers"),
  fetchTable("site_content", "select=*"), // site_content has no is_published
  fetchTable("about_photos"),
  fetchTable("seo_pages", "select=*&is_published=eq.true&order=route.asc"),
  fetchTable("affiliate_links"),
  fetchTable("service_pages", "select=*&order=sort_order.asc"), // include unpublished services for "Coming Soon" badge
]);

// flatten site_content into key/value lookup
const siteContent = {};
for (const row of siteContentRows) siteContent[row.key] = row.value;

const out = {
  portfolio,
  testimonials,
  pricing,
  siteContent,
  aboutPhotos,
  seoPages,
  affiliateLinks,
  servicePages,
  generatedAt: new Date().toISOString(),
};

const dataDir = join(ROOT, "src", "data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
const target = join(dataDir, "cms.generated.json");
writeFileSync(target, JSON.stringify(out, null, 2));

console.log(`✅ Wrote ${target}`);
console.log(`   portfolio:       ${portfolio.length}`);
console.log(`   testimonials:    ${testimonials.length}`);
console.log(`   pricing:         ${pricing.length}`);
console.log(`   siteContent:     ${Object.keys(siteContent).length}`);
console.log(`   aboutPhotos:     ${aboutPhotos.length}`);
console.log(`   seoPages:        ${seoPages.length}`);
console.log(`   affiliateLinks:  ${affiliateLinks.length}`);
console.log(`   servicePages:    ${servicePages.length}`);
