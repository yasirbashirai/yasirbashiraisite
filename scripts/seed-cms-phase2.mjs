// Seed Phase 2 CMS tables with content matching the current public site.
// Idempotent — uses upsert/on_conflict so re-running is safe.
//
// Run: node scripts/seed-cms-phase2.mjs

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const envFile = readFileSync(join(ROOT, ".env.local"), "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const URL = env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY;

const baseHeaders = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function upsert(table, rows, conflictKey) {
  const res = await fetch(`${URL}/rest/v1/${table}?on_conflict=${conflictKey}`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  const out = await res.json();
  console.log(`  ✅ ${table}: ${out.length} rows`);
}

async function uploadFile(bucket, storagePath, localPath, contentType) {
  const bytes = readFileSync(localPath);
  const res = await fetch(`${URL}/storage/v1/object/${bucket}/${storagePath}`, {
    method: "POST",
    headers: { ...baseHeaders, "Content-Type": contentType, "x-upsert": "true" },
    body: bytes,
  });
  if (!res.ok) throw new Error(`upload ${storagePath}: ${res.status} ${await res.text()}`);
  return `${URL}/storage/v1/object/public/${bucket}/${storagePath}`;
}

// ─────────────────────────────────────────────
console.log("🌱 Seeding Phase 2 CMS tables…\n");

// Helper: delete-all then insert-all for tables with no natural unique key
async function replaceAll(table, rows) {
  await fetch(`${URL}/rest/v1/${table}?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: "DELETE",
    headers: { ...baseHeaders, Prefer: "return=minimal" },
  });
  const r = await fetch(`${URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...baseHeaders, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(rows),
  });
  if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`);
  const out = await r.json();
  console.log(`  ✅ ${table}: ${out.length} rows`);
}

// 1. Testimonials — 6 existing reviews (no unique key → replace all)
await replaceAll("testimonials", [
  { name: "James R.",   role: "Moving Company Owner", company: "Fiverr",   quote: "Yasir automated our entire lead follow-up. We went from missing 60% of inquiries to booking every single one automatically. ROI in the first week.", rating: 5, is_featured: true,  sort_order: 0 },
  { name: "Sarah M.",   role: "Med Spa Owner",         company: "Upwork",   quote: "Best investment we made. Yasir built our entire CRM + funnel in days. We're now generating leads while we sleep.", rating: 5, is_featured: true,  sort_order: 1 },
  { name: "Ahmed K.",   role: "E-commerce Owner",      company: "Fiverr",   quote: "The AI chatbot he built handles our customer support 24/7. Saved us $3K/month in staff costs immediately.", rating: 5, is_featured: false, sort_order: 2 },
  { name: "Michael T.", role: "Agency Owner",          company: "LinkedIn", quote: "Yasir is not just a developer, he's a strategic partner. His systems thinking is on another level.", rating: 5, is_featured: false, sort_order: 3 },
  { name: "Lisa P.",    role: "SaaS Founder",          company: "Upwork",   quote: "We launched our SaaS MVP in 2 weeks. Can't believe the quality and speed. Will never work with anyone else.", rating: 5, is_featured: true,  sort_order: 4 },
  { name: "David O.",   role: "Transport Company",     company: "Fiverr",   quote: "The n8n automation he built saves our team 40+ hours every week. Absolutely game-changing.", rating: 5, is_featured: false, sort_order: 5 },
]);

// 2. Pricing tiers — 2 packages
await upsert(
  "pricing_tiers",
  [
    {
      slug: "ai-starter-system",
      name: "AI Starter System",
      tagline: "Everything you need to start booking calls on autopilot.",
      setup_price: "$1,497",
      monthly_price: "$497",
      features: [
        "Conversion-engineered landing page",
        "AI chatbot (Web + WhatsApp)",
        "CRM + pipeline setup",
        "7-day automated follow-up flow",
        "Booking + payment integration",
        "Analytics dashboard",
        "30-day post-launch support",
      ],
      cta_text: "Start with Starter",
      cta_url: "https://cal.com/yasir-bashir-bp4wob/30min",
      is_highlight: false,
      is_published: true,
      sort_order: 0,
    },
    {
      slug: "full-growth-engine",
      name: "Full Growth Engine",
      tagline: "The complete client-acquisition system, done for you, end to end.",
      setup_price: "$2,997",
      monthly_price: "$997",
      features: [
        "Everything in Starter, plus:",
        "Multi-page custom website or web app",
        "Content + social automation system",
        "Email + SMS nurture sequences",
        "Full RevOps + reporting stack",
        "Priority support & monthly strategy call",
        "30-day ROI guarantee",
      ],
      cta_text: "Book a strategy call",
      cta_url: "https://cal.com/yasir-bashir-bp4wob/30min",
      is_highlight: true,
      is_published: true,
      sort_order: 1,
    },
  ],
  "slug",
);

// 3. About photos — upload yasir-1..5.jpg from public/about/ to Supabase Storage
console.log("  📤 Uploading 5 about photos…");
const aboutDir = join(ROOT, "public", "about");
const photoFiles = readdirSync(aboutDir)
  .filter((f) => /^yasir-\d+\.(jpg|jpeg|png)$/i.test(f))
  .sort();
const photoRows = [];
for (let i = 0; i < photoFiles.length; i++) {
  const file = photoFiles[i];
  const localPath = join(aboutDir, file);
  const storagePath = `about/${file}`;
  const ext = file.split(".").pop().toLowerCase();
  const ct = ext === "png" ? "image/png" : "image/jpeg";
  const url = await uploadFile("media", storagePath, localPath, ct);
  photoRows.push({ url, alt_text: `Yasir Bashir ${i + 1}`, sort_order: i, is_published: true });
  console.log(`    ✅ ${file}`);
}
await replaceAll("about_photos", photoRows);

// 4. Affiliate links — 3 programs
await upsert(
  "affiliate_links",
  [
    { slug: "hostinger",    name: "Hostinger",    description: "Best web hosting for your online presence",                commission_text: "Up to 60% commission",   short_text: "60% commission", emoji: "🌐", url: "https://hostinger.com",    is_published: true, sort_order: 0 },
    { slug: "lovable",      name: "Lovable",      description: "AI-powered app builder, build MVPs in minutes",            commission_text: "Up to 30% commission",   short_text: "30% commission", emoji: "💜", url: "https://lovable.dev",      is_published: true, sort_order: 1 },
    { slug: "gohighlevel",  name: "GoHighLevel",  description: "All-in-one CRM, funnels & automation platform",            commission_text: "40% recurring commission", short_text: "40% recurring",  emoji: "🚀", url: "https://gohighlevel.com",  is_published: true, sort_order: 2 },
  ],
  "slug",
);

// 5. Service pages — 8 industries (Logistics live, others Coming Soon)
await upsert(
  "service_pages",
  [
    { slug: "logistics",   name: "Logistics",     icon_emoji: "🚛", is_available: true,  href: "/logistics-solutions", description: "AI websites + dispatch systems for US trucking, freight & moving operators.", is_published: true, sort_order: 0 },
    { slug: "moving",      name: "Moving",        icon_emoji: "📦", is_available: false, href: "",                     description: "Moving company websites with quote calculators and booking automation.",       is_published: true, sort_order: 1 },
    { slug: "cleaning",    name: "Cleaning",      icon_emoji: "🧼", is_available: false, href: "",                     description: "Commercial cleaning service sites with online quote intake.",                 is_published: true, sort_order: 2 },
    { slug: "coaching",    name: "Coaching",      icon_emoji: "🎯", is_available: false, href: "",                     description: "Coach and consultant websites with booking + CRM pipelines.",                is_published: true, sort_order: 3 },
    { slug: "construction",name: "Construction",  icon_emoji: "🏗", is_available: false, href: "",                     description: "Contractor websites with lead capture and project showcases.",               is_published: true, sort_order: 4 },
    { slug: "real-estate", name: "Real Estate",   icon_emoji: "🏠", is_available: false, href: "",                     description: "Realtor sites with property search and lead-magnet funnels.",                is_published: true, sort_order: 5 },
    { slug: "finance",     name: "Finance",       icon_emoji: "💼", is_available: false, href: "",                     description: "Financial-services sites with trust signals and segmented lead paths.",      is_published: true, sort_order: 6 },
    { slug: "ecommerce",   name: "E-commerce",    icon_emoji: "🛍", is_available: false, href: "",                     description: "Shopify / Woo sites with AI content + automation.",                          is_published: true, sort_order: 7 },
  ],
  "slug",
);

// 6. SEO pages — initial routes from index.html
await upsert(
  "seo_pages",
  [
    {
      route: "/",
      title: "Yasir Bashir — AI Automation Engineer & Web App Builder",
      description: "AI-first websites, automation systems and growth funnels for ambitious founders & agencies. n8n, GoHighLevel, OpenAI & Claude APIs.",
      og_image_url: "https://yasirbashir.com/og-image.png",
      keywords: ["AI Automation Engineer", "n8n automation", "GoHighLevel CRM", "AI chatbot developer", "Yasir Bashir"],
      is_published: true,
    },
    { route: "/portfolio",           title: "Portfolio — Yasir Bashir",                 description: "Real US logistics, SaaS and coaching projects shipped by Yasir Bashir.", og_image_url: "https://yasirbashir.com/og-image.png", keywords: ["portfolio", "case studies"], is_published: true },
    { route: "/logistics-solutions", title: "Logistics Websites & AI Systems — Yasir",  description: "Premium websites, dispatch dashboards, driver apps and AI Dispatcher Agents for US trucking, freight and moving businesses. Built in 14 days.", og_image_url: "https://yasirbashir.com/og-image.png", keywords: ["logistics website", "freight broker website", "trucking AI"], is_published: true },
    { route: "/calculator",          title: "ROI Calculator — Yasir Bashir",            description: "See what an AI growth system could be worth to your business.", og_image_url: "https://yasirbashir.com/og-image.png", keywords: ["ROI calculator"], is_published: true },
    { route: "/disclaimer",          title: "Disclaimer — Yasir Bashir",                description: "Legal disclaimer for yasirbashir.com.", og_image_url: "https://yasirbashir.com/og-image.png", keywords: [], is_published: true },
  ],
  "route",
);

// 7. Site content — flexible key/value
const siteContentRows = [
  { key: "hero.headline",        value: { text: "AI Automation Engineer & Web App Builder" } },
  { key: "hero.subline",         value: { text: "AI-first websites, automation systems and growth funnels for ambitious founders & agencies." } },
  { key: "hero.cta_primary",     value: { text: "Book a free 1:1 strategy call" } },
  { key: "hero.cta_secondary",   value: { text: "See my work" } },
  { key: "about.intro",          value: { text: "I'm Yasir — an AI Automation Engineer who turns ambitious founders' ideas into shipping, revenue-generating systems. Over the last 5 years I've built 800+ websites, automations and AI products for clients across 30 countries. I specialise in the messy intersection of design, code and growth." } },
  { key: "about.stats",          value: { years: "5+", projects: "800+", clients: "300+" } },
  { key: "testimonials.heading", value: { text: "Trusted by 300+ businesses across logistics, SaaS & coaching." } },
  { key: "pricing.heading",      value: { text: "Two ways to grow with me. Zero hidden fees." } },
  { key: "pricing.subheading",   value: { text: "Transparent, outcome-driven pricing. Setup fee + monthly retainer, cancel any time after 90 days." } },
  { key: "services.heading",     value: { text: "Premium AI systems for the industries I know best." } },
  { key: "footer.tagline",       value: { text: "AI-first websites, automation & growth systems." } },
  { key: "finalcta.heading",     value: { text: "Ready to build something that prints money while you sleep?" } },
  { key: "finalcta.subheading",  value: { text: "Book a free 30-minute strategy call. No pitch, just one tactical idea you can use today." } },
];
for (const r of siteContentRows) {
  await fetch(`${URL}/rest/v1/site_content?on_conflict=key`, {
    method: "POST",
    headers: { ...baseHeaders, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(r),
  });
}
console.log(`  ✅ site_content: ${siteContentRows.length} keys`);

console.log("\n🎉 Phase 2 seed complete.");
