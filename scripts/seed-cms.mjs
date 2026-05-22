// ──────────────────────────────────────────────────────────────────────
// One-shot seed: uploads portfolio screenshots to Supabase Storage and
// inserts the 12 existing projects into the portfolio_projects table.
//
// Run: node scripts/seed-cms.mjs
// Requires env: VITE_SUPABASE_URL, SUPABASE_SECRET_KEY  (read from .env.local)
// ──────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env.local manually (no dotenv dep needed)
const envFile = readFileSync(join(ROOT, ".env.local"), "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const URL = env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY;
if (!URL || !KEY) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
  process.exit(1);
}

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
};

// ─────────────────────────────────────────
// Upload an image file to Supabase Storage
// ─────────────────────────────────────────
async function uploadImage(localPath, storagePath) {
  const bytes = readFileSync(localPath);
  const res = await fetch(
    `${URL}/storage/v1/object/portfolio-images/${storagePath}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "image/png",
        "x-upsert": "true",
      },
      body: bytes,
    },
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload failed for ${storagePath}: ${res.status} ${txt}`);
  }
  return `${URL}/storage/v1/object/public/portfolio-images/${storagePath}`;
}

// ─────────────────────────────────────────
// Project data — mirrors current Portfolio.tsx
// ─────────────────────────────────────────
const projects = [
  {
    slug: "rmg-transport",
    title: "RMG Transport",
    subtitle: "Nationwide vehicle transport, USA",
    period: "May 2023, Aug 2023",
    categories: ["Web Apps", "Logistics", "n8n Automation", "CRM Systems"],
    live_url: "https://rmgtransport.com",
    emoji: "🚗",
    image_file: "rmg-transport.png",
    preview_headline: "AI lead system for a nationwide transport company.",
    preview_stats: [
      { value: "40%", label: "More Leads" },
      { value: "60%", label: "Less Manual Work" },
      { value: "3×", label: "Faster Booking" },
    ],
    detail_client: "Redline Motor Group (RMG Transport)",
    detail_industry: "Vehicle Transport / Logistics",
    detail_location: "USA, Nationwide",
    detail_challenge: "RMG was handling vehicle transport bookings manually across multiple states. Leads came in through different channels with no unified system, sales reps spent hours on follow-ups, social media was unmanaged, and ops depended on individual people.",
    detail_solution: "Built a custom web application combined with a full automation stack that unified their entire operation:",
    detail_deliverables: [
      "Custom web application with booking & quote system",
      "AI-powered lead generation system capturing inbound leads 24/7",
      "Social media automation, posts, engagement & follow-up sequences",
      "CRM setup with automated follow-up pipelines",
      "Sales workflow automation reducing manual touchpoints by 60%",
      "Operational dashboard for tracking vehicles, bookings & clients",
    ],
    detail_results: [
      { metric: "Lead capture rate", before: "Manual, inconsistent", after: "Automated 24/7" },
      { metric: "Follow-up speed", before: "Hours to days", after: "Under 5 minutes" },
      { metric: "Manual admin time", before: "20+ hrs/week", after: "Under 8 hrs/week" },
      { metric: "Booking process", before: "Phone calls only", after: "Online self-serve" },
    ],
    detail_tools: ["WordPress", "n8n", "GoHighLevel", "Meta Automation", "Custom CRM"],
  },
  {
    slug: "steer-logistics",
    title: "Steer Logistics",
    subtitle: "Freight brokerage platform, USA",
    period: "2023",
    categories: ["Web Apps", "Logistics"],
    live_url: "https://steerlogistics.co",
    emoji: "🚛",
    image_file: "steer-logistics.png",
    preview_headline: "Full-scale freight brokerage web platform.",
    preview_stats: [
      { value: "100%", label: "Digitised Ops" },
      { value: "2 wks", label: "Launch Time" },
      { value: "∞", label: "Scalable" },
    ],
    detail_client: "Steer Logistics",
    detail_industry: "Freight Brokerage / Logistics",
    detail_location: "USA",
    detail_challenge: "Steer Logistics managed freight coordination between shippers and carriers manually, quotes were handled over email and phone, no digital touchpoint for clients, and no system to track capacity or broker communications at scale.",
    detail_solution: "Designed and developed a full-scale web application that digitised their entire freight brokerage workflow, from quote to booking to carrier management, using AI-assisted development to launch fast.",
    detail_deliverables: [
      "Custom freight brokerage web platform (full stack)",
      "Instant online freight quote request system",
      "Online booking functionality for shippers",
      "Shipper ↔ Carrier interaction flow",
      "Structured operational workflow dashboard",
      "AI-assisted development for accelerated delivery",
    ],
    detail_results: [
      { metric: "Quote process", before: "Email & phone only", after: "Instant online form" },
      { metric: "Shipper experience", before: "Manual calls", after: "Self-serve platform" },
      { metric: "Launch time", before: "Estimated 3 months", after: "Delivered in 2 weeks" },
      { metric: "Operational clarity", before: "Scattered communications", after: "Centralised dashboard" },
    ],
    detail_tools: ["Full-Stack Web Dev", "AI-Assisted Vibe Coding", "Custom Backend", "REST APIs"],
  },
  {
    slug: "dominique-mcclaney",
    title: "Dominique McClaney",
    subtitle: "Personal site + AI chatbot",
    period: "2024",
    categories: ["Web Apps", "AI Chatbots"],
    live_url: "https://dominiquemcclaney.com",
    emoji: "🤖",
    image_file: "dominique-mcclaney.png",
    preview_headline: "AI-powered personal site for a full-stack engineer & Navy veteran.",
    preview_stats: [
      { value: "24/7", label: "AI Chatbot" },
      { value: "100%", label: "Personalised UX" },
      { value: "Auto", label: "Lead Qualify" },
    ],
    detail_client: "Dominique McClaney",
    detail_industry: "Tech / Consulting",
    detail_location: "USA",
    detail_challenge: "Dominique needed a site matching his background blending military precision, technical depth and sales personality, plus an AI chatbot that could engage visitors personally and qualify leads without him being available 24/7.",
    detail_solution: "Designed and built a site that visually and tonally matched Dominique's identity, paired with a custom AI chatbot trained on his background, services and personality, so every visitor gets a personalised real-time conversation.",
    detail_deliverables: [
      "Custom site design & development",
      "Identity aligned to background: military, tech, sales",
      "Personalised AI chatbot trained on bio, services & FAQs",
      "Chatbot handles intro convos, service questions, lead qualification",
      "Booking integration inside chatbot flow",
      "Mobile-responsive, fast-loading design",
    ],
    detail_results: [
      { metric: "Visitor engagement", before: "Static site, no interaction", after: "AI chatbot engages every visitor" },
      { metric: "Lead qualification", before: "Manual calls", after: "AI qualifies before human touchpoint" },
      { metric: "Online identity", before: "No digital presence", after: "Professional site matching identity" },
      { metric: "Availability", before: "Business hours only", after: "AI chatbot active 24/7" },
    ],
    detail_tools: ["Custom Web Dev", "AI Chatbot (trained)", "Booking Integration"],
  },
  {
    slug: "truckin-link",
    title: "TruckinLink",
    subtitle: "Digital marketing + driver recruitment for trucking",
    period: "2024",
    categories: ["Web Apps", "Logistics", "Social Automation"],
    live_url: "https://truckinlink.com",
    emoji: "🎯",
    image_file: "truckin-link.png",
    preview_headline: "All-in-one digital marketing partner for US trucking companies.",
    preview_stats: [
      { value: "10+", label: "Yrs Trucking Niche" },
      { value: "Lower", label: "Cost per Driver" },
      { value: "Multi", label: "Channel Ads" },
    ],
    detail_client: "TruckinLink",
    detail_industry: "Marketing Agency / Trucking",
    detail_location: "USA",
    detail_challenge: "TruckinLink helps trucking companies recruit drivers and grow through paid ads + social, but their old site didn't reflect a decade of niche expertise or convert visiting fleet owners into audit bookings. They needed a site that immediately positioned them as the trucking-specific marketing partner.",
    detail_solution: "Designed a focused, agency-grade site that leads with the trucking specialism, communicates the driver-recruitment + marketing service stack, and funnels every visitor into a free custom audit.",
    detail_deliverables: [
      "Custom agency-style design with clear trucking positioning",
      "Service breakdown: Google ads, Facebook ads, social management, website dev, recruitment",
      "Driver-hunt funnel: cost-effective driver acquisition story",
      "\"Free custom audit\" lead-magnet flow as primary CTA",
      "Social proof: \"Companies we worked with\" logo wall",
      "Why-us blocks: save time, cost-efficiency, decade of know-how",
      "Mobile-responsive, fast-loading build",
    ],
    detail_results: [
      { metric: "Positioning", before: "Generic marketing agency look", after: "Clearly trucking-specialist" },
      { metric: "Lead capture", before: "Contact form only", after: "Free-audit funnel" },
      { metric: "Trust signal", before: "No client showcase", after: "Logo wall + decade story" },
      { metric: "Service clarity", before: "Mixed services jumble", after: "Clean stack: ads + social + recruit" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "Lead Funnel", "Brand Design"],
  },
  {
    slug: "elevated-financial",
    title: "Elevated Financial",
    subtitle: "Credit repair, business funding & financial planning",
    period: "2024",
    categories: ["Web Apps"],
    live_url: "https://elevatedfinancialllc.com",
    emoji: "💼",
    image_file: "elevated-financial.png",
    preview_headline: "Trust-first site for a credit repair + business funding firm.",
    preview_stats: [
      { value: "$1M+", label: "Funding Approved" },
      { value: "4.95★", label: "Client Rating" },
      { value: "3", label: "Service Tracks" },
    ],
    detail_client: "Elevated Financial LLC",
    detail_industry: "Financial Services / Credit Repair / Business Funding",
    detail_location: "USA",
    detail_challenge: "Elevated Financial helps businesses and individuals with credit repair, business funding and financial planning — high-trust services where the website has to do most of the credibility work before the first call. The previous setup didn't communicate authority or capture qualified leads.",
    detail_solution: "Built a polished navy/blue corporate finance site that leads with results ($1M+ funding approved, 4.95★ rating) and segments services into three clear tracks — Credit Repair, Funding Consulting and Business Planning — each with its own lead path.",
    detail_deliverables: [
      "Premium navy/blue corporate finance design",
      "Hero with proof-led headline + 'Start Credit Repair' CTA",
      "$1M+ funding approved trust block",
      "Three service tracks: Consulting · Planning · Management · Business",
      "Sub-services per track (credit repair plans, funding consulting, debt reduction, growth strategies)",
      "Score-increase feature card + mobile mockup",
      "Apply-for-funding form integrated into the page",
      "Mobile-responsive, fast-loading build",
    ],
    detail_results: [
      { metric: "Brand credibility", before: "Looked like a startup", after: "Premium financial-firm feel" },
      { metric: "Lead capture", before: "Single contact form", after: "Multiple service-specific paths" },
      { metric: "Service clarity", before: "Buried in copy", after: "3 segmented tracks" },
      { metric: "Proof prominence", before: "No trust signals", after: "$1M+ funding + 4.95★ above fold" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "Forms", "Brand Design"],
  },
  {
    slug: "fwl-logistics",
    title: "FWL Logistics",
    subtitle: "Freight brokerage website, USA",
    period: "2024",
    categories: ["Web Apps", "Logistics"],
    live_url: "https://fwllogistics.com",
    emoji: "🚚",
    image_file: "fwl-logistics.png",
    preview_headline: "Clean, conversion-focused site for a US freight broker.",
    preview_stats: [
      { value: "B2B", label: "Lead Capture" },
      { value: "Fast", label: "Load Times" },
      { value: "Pro", label: "Brand Trust" },
    ],
    detail_client: "FWL Logistics",
    detail_industry: "Freight Brokerage / Logistics",
    detail_location: "USA",
    detail_challenge: "FWL needed a professional online presence that positioned them as a serious freight broker, not a directory listing. The previous setup didn't capture shipper or carrier leads and didn't communicate service depth.",
    detail_solution: "Designed a corporate B2B site with clear service architecture, equipment coverage, trust signals and dual lead-capture paths for shippers and carriers.",
    detail_deliverables: [
      "Custom corporate B2B design (white / navy / blue palette)",
      "Service breakdown: dry van, flatbed, reefer, specialty",
      "Shipper quote request form",
      "Carrier sign-up flow",
      "About / Coverage / Industries content pages",
      "Mobile-responsive, SEO-friendly build",
    ],
    detail_results: [
      { metric: "Online credibility", before: "Generic / no site", after: "Pro corporate site live" },
      { metric: "Lead capture", before: "None on site", after: "Shipper + carrier forms" },
      { metric: "Service clarity", before: "Unclear offering", after: "Full equipment + lanes" },
      { metric: "Mobile UX", before: "Not mobile-ready", after: "Fully responsive" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "SEO Content", "Forms"],
  },
  {
    slug: "sfam-logistics",
    title: "SFam Logistics",
    subtitle: "Freight brokerage + admin dashboard",
    period: "2024",
    categories: ["Web Apps", "Logistics", "CRM Systems"],
    live_url: "https://sfamlogistics.com",
    emoji: "📦",
    image_file: "sfam-logistics.png",
    preview_headline: "Bold-themed freight brokerage site with a real admin dashboard.",
    preview_stats: [
      { value: "12", label: "Public Pages" },
      { value: "Full", label: "Admin Panel" },
      { value: "Auth", label: "Login System" },
    ],
    detail_client: "SFam Logistics LLC",
    detail_industry: "Freight Brokerage / Logistics",
    detail_location: "USA",
    detail_challenge: "SFam wanted to stand out from generic freight broker sites — and needed more than a brochure. They required real operational tooling: quotes, carriers, agents and settings, all managed from one dashboard.",
    detail_solution: "Built a bold, colorful, futuristic dark-themed marketing site paired with a complete admin dashboard. Login + signup gate access to internal ops modules so the founders can run the business from one place.",
    detail_deliverables: [
      "12 public pages with bold gradient/glassmorphism design",
      "Auth system: login + signup flows",
      "Admin dashboard: overview, quotes, carriers, agents, settings",
      "Quote intake form on public site",
      "Animated orbs, particle effects, neon accents (approved brand)",
      "Fully responsive, mobile-friendly",
    ],
    detail_results: [
      { metric: "Brand identity", before: "Generic dark template", after: "Distinctive bold futuristic" },
      { metric: "Quote handling", before: "Email back-and-forth", after: "Form → dashboard pipeline" },
      { metric: "Internal ops", before: "Spreadsheets", after: "Centralised admin panel" },
      { metric: "Carrier/agent mgmt", before: "Manual tracking", after: "Dashboard modules" },
    ],
    detail_tools: ["React", "Tailwind", "Auth", "Custom Dashboard", "Framer Motion"],
  },
  {
    slug: "earth-logistics",
    title: "Earth Logistics Inc",
    subtitle: "Indiana freight broker, 15-page corporate site",
    period: "2025",
    categories: ["Web Apps", "Logistics"],
    live_url: "https://earth-logistics-inc.vercel.app",
    emoji: "🌎",
    image_file: "earth-logistics.png",
    preview_headline: "Professional 15-page freight broker site built for shipper/carrier leads.",
    preview_stats: [
      { value: "15", label: "Pages" },
      { value: "3", label: "Lead Funnels" },
      { value: "24/7", label: "Operation Story" },
    ],
    detail_client: "Earth Logistics Inc (AJ Smith)",
    detail_industry: "Freight Brokerage / Logistics",
    detail_location: "Saint John, Indiana, USA",
    detail_challenge: "Earth Logistics is a DOT-authorized freight broker running 24/7 ops, but had no real digital footprint. They needed a B2B corporate site that captures shippers, recruits carriers AND onboards freight agents — across 10+ equipment types including specialty bulk.",
    detail_solution: "Designed a clean white/navy/blue corporate site (no dark sci-fi — explicit client requirement). Built 15 pages including dedicated SEO content for every equipment type and three separate lead funnels.",
    detail_deliverables: [
      "Home + About + Services hub + Contact + Coverage + Industries",
      "Service pages: dry van, flatbed, reefer, lowboy, car hauler",
      "Bulk side: end dump, pneumatic, liquid, hopper bottom, hazmat",
      "Quote page with heavy-haul calculator",
      "3 lead funnels: shipper, carrier, freight agent",
      "FMCSA / DOT / TIA trust badges + carrier count signals",
      "Inter / Plus Jakarta Sans typography, real American truck imagery",
    ],
    detail_results: [
      { metric: "Digital presence", before: "None", after: "15-page corporate site" },
      { metric: "Lead paths", before: "Phone only", after: "3 dedicated funnels" },
      { metric: "Service SEO", before: "No equipment pages", after: "10 equipment landing pages" },
      { metric: "Brand positioning", before: "Looked like a startup", after: "Looks like a national broker" },
    ],
    detail_tools: ["React", "Vite", "Tailwind", "Vercel", "SEO Content"],
  },
  {
    slug: "arnold-freight",
    title: "Arnold Freight Group",
    subtitle: "Freight brokerage website, USA",
    period: "2024",
    categories: ["Web Apps", "Logistics"],
    live_url: "https://arnoldfreightgroup.com",
    emoji: "🚛",
    image_file: "arnold-freight.png",
    preview_headline: "Corporate freight broker site engineered for trust and lead capture.",
    preview_stats: [
      { value: "Pro", label: "B2B Design" },
      { value: "Fast", label: "Lead Forms" },
      { value: "Trust", label: "Signal Stack" },
    ],
    detail_client: "Arnold Freight Group",
    detail_industry: "Freight Brokerage / Logistics",
    detail_location: "USA",
    detail_challenge: "Arnold needed an online presence that matched the professionalism of larger national brokers. Without a strong site, shipper RFPs were going to competitors and carrier recruiting was entirely word-of-mouth.",
    detail_solution: "Built a corporate B2B site emphasising service breadth, lane coverage and operational reliability — with clear CTAs for both shippers and carriers above the fold.",
    detail_deliverables: [
      "Custom corporate design tied to brand colors",
      "Services + equipment pages with SEO copy",
      "Shipper quote request + carrier sign-up forms",
      "Trust signal stack: experience, lane coverage, compliance",
      "Mobile-first responsive build",
      "On-page SEO for freight-broker keywords",
    ],
    detail_results: [
      { metric: "RFP credibility", before: "Lost vs national brokers", after: "Competes on first impression" },
      { metric: "Carrier sign-ups", before: "Word-of-mouth only", after: "Online onboarding" },
      { metric: "Lead intake", before: "Calls only", after: "Forms + calls" },
      { metric: "Brand polish", before: "DIY look", after: "Agency-grade design" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "SEO Content", "Lead Forms"],
  },
  {
    slug: "sc-commercial",
    title: "SC Commercial Concepts",
    subtitle: "Commercial cleaning services website",
    period: "2025",
    categories: ["Web Apps"],
    live_url: "https://sc-commercialconcepts.com",
    emoji: "🧼",
    image_file: "sc-commercial.png",
    preview_headline: "Service-first site for a commercial cleaning operator.",
    preview_stats: [
      { value: "Pro", label: "Service Pages" },
      { value: "Fast", label: "Quote Form" },
      { value: "Local", label: "SEO Built-in" },
    ],
    detail_client: "SC Commercial Concepts",
    detail_industry: "Commercial Cleaning Services",
    detail_location: "USA",
    detail_challenge: "SC needed a credible online presence to win commercial cleaning contracts — office buildings, retail, post-construction. The previous site couldn't communicate service depth or capture leads from facility managers.",
    detail_solution: "Built a service-first website with clear segmentation by client type, fast quote intake and local-SEO structure so the right contracts find them.",
    detail_deliverables: [
      "Service breakdown: office, retail, post-construction, recurring",
      "Quote request form (clean, no friction)",
      "About / Process / Service Areas pages",
      "Trust elements: insurance, references, before/after",
      "Mobile-responsive, fast loading",
      "Local-SEO friendly URL + meta structure",
    ],
    detail_results: [
      { metric: "Lead intake", before: "Phone only", after: "Online quote form" },
      { metric: "Service clarity", before: "Generic 'we clean'", after: "Segmented by client type" },
      { metric: "Online presence", before: "Outdated site", after: "Modern, conversion-built" },
      { metric: "Mobile experience", before: "Broken", after: "Fully responsive" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "Local SEO", "Quote Form"],
  },
  {
    slug: "sublime-pathways",
    title: "Sublime Pathways",
    subtitle: "Wellness, yoga & care center site",
    period: "2024",
    categories: ["Web Apps"],
    live_url: "https://sublimepathways.com",
    emoji: "🧘",
    image_file: "sublime-pathways.png",
    preview_headline: "Calm, premium presence for a wellness & yoga practice.",
    preview_stats: [
      { value: "Calm", label: "Brand Feel" },
      { value: "Easy", label: "Booking UX" },
      { value: "Pro", label: "Practitioner Story" },
    ],
    detail_client: "Sublime Pathways",
    detail_industry: "Wellness / Yoga / Holistic Care",
    detail_location: "USA",
    detail_challenge: "Sublime Pathways needed a digital home that felt as grounded as the in-person experience. The site had to communicate practitioner credibility, services, and let clients book or enquire without friction.",
    detail_solution: "Designed a soft, premium-feeling site with gentle typography and generous whitespace, paired with clear service descriptions and a simple booking/contact pathway.",
    detail_deliverables: [
      "Custom calm aesthetic (soft palette, serif headlines)",
      "Services & offerings pages",
      "Practitioner / about story",
      "Booking + contact flow",
      "Testimonials and trust elements",
      "Mobile-responsive, fast performance",
    ],
    detail_results: [
      { metric: "Brand experience", before: "Generic wellness template", after: "Distinct, premium feel" },
      { metric: "Service clarity", before: "Hard to navigate", after: "Clean offering pages" },
      { metric: "Booking experience", before: "Email-only", after: "Streamlined contact flow" },
      { metric: "Mobile UX", before: "Clunky", after: "Polished, responsive" },
    ],
    detail_tools: ["Custom Web Dev", "Tailwind", "Booking Integration", "Brand Design"],
  },
  {
    slug: "love-care-retreat",
    title: "Love & Care Retreat",
    subtitle: "Bilingual healing retreat (EN / RO)",
    period: "2025",
    categories: ["Web Apps"],
    live_url: "https://loveandcareretreat.com",
    emoji: "🌸",
    image_file: "love-care-retreat.png",
    preview_headline: "Feminine, bilingual site for a healing & retreat practitioner.",
    preview_stats: [
      { value: "EN/RO", label: "Bilingual" },
      { value: "5", label: "Pages" },
      { value: "PDF", label: "Freebie Funnel" },
    ],
    detail_client: "Daniela — Love & Care Retreat",
    detail_industry: "Healing / Retreats / Coaching",
    detail_location: "Romania → International",
    detail_challenge: "Daniela's previous site was too plain for the depth of work she offers. She needed a feminine, advanced, creative presence — and it had to work for both her English-speaking and Romanian audiences without feeling like two different sites.",
    detail_solution: "Rebuilt the site from scratch with an EN/RO language switcher, asymmetric feminine layouts, Instagram-style story sections, a freebie PDF lead funnel and contact form — all under one cohesive brand.",
    detail_deliverables: [
      "5-page site: Home · About · Offerings · Freebie · Contact",
      "EN / RO bilingual with header switcher (react-i18next)",
      "Feminine palette: cream / blush / champagne gold / sage",
      "Fraunces serif + DM Sans body typography",
      "Two Instagram-style story sections",
      "Freebie PDF lead-magnet funnel",
      "Formspree-powered contact form",
      "Framer Motion micro-interactions",
    ],
    detail_results: [
      { metric: "Brand feel", before: "Plain & minimal", after: "Feminine, creative, premium" },
      { metric: "Audience reach", before: "Single language", after: "EN + RO covered" },
      { metric: "Lead capture", before: "None", after: "Freebie PDF funnel + contact" },
      { metric: "Mobile UX", before: "Basic", after: "Asymmetric, animated, responsive" },
    ],
    detail_tools: ["React 19", "TypeScript", "Vite", "Tailwind", "Framer Motion", "react-i18next", "Formspree"],
  },
];

// ─────────────────────────────────────────
// 1. Upload images
// ─────────────────────────────────────────
console.log(`Uploading ${projects.length} portfolio images…`);
const portfolioDir = join(ROOT, "public", "portfolio");
const existingFiles = readdirSync(portfolioDir);
console.log(`Found ${existingFiles.length} files in /public/portfolio/`);

for (const project of projects) {
  if (!existingFiles.includes(project.image_file)) {
    console.warn(`  ⚠️  Missing image for ${project.slug}: ${project.image_file}`);
    project.image_url = null;
    continue;
  }
  const localPath = join(portfolioDir, project.image_file);
  const storagePath = `projects/${project.image_file}`;
  try {
    const publicUrl = await uploadImage(localPath, storagePath);
    project.image_url = publicUrl;
    console.log(`  ✅ ${project.slug} → ${storagePath}`);
  } catch (err) {
    console.error(`  ❌ ${project.slug}: ${err.message}`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────
// 2. Upsert rows
// ─────────────────────────────────────────
console.log(`\nUpserting ${projects.length} portfolio rows…`);
const rows = projects.map((p, i) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  period: p.period,
  emoji: p.emoji,
  image_url: p.image_url,
  live_url: p.live_url,
  categories: p.categories,
  preview_headline: p.preview_headline,
  preview_stats: p.preview_stats,
  detail_client: p.detail_client,
  detail_industry: p.detail_industry,
  detail_location: p.detail_location,
  detail_challenge: p.detail_challenge,
  detail_solution: p.detail_solution,
  detail_deliverables: p.detail_deliverables,
  detail_results: p.detail_results,
  detail_tools: p.detail_tools,
  is_published: true,
  sort_order: i,
}));

const res = await fetch(`${URL}/rest/v1/portfolio_projects?on_conflict=slug`, {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify(rows),
});

if (!res.ok) {
  console.error(`❌ Insert failed: ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}

const inserted = await res.json();
console.log(`✅ Upserted ${inserted.length} rows.`);
console.log(`\n🎉 Seed complete.`);
