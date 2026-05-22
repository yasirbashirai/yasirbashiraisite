// ──────────────────────────────────────────────────────────────────────
// CMS data adapter — single source of truth for the site's content.
// Reads from src/data/cms.generated.json (produced by scripts/fetch-cms.mjs
// at build time) and reshapes it into component-friendly objects.
//
// All public site components should import from here, not from raw JSON.
// ──────────────────────────────────────────────────────────────────────

import data from "@/data/cms.generated.json";

/* ── Portfolio ───────────────────────────────────────────── */

export type PortfolioStat = { value: string; label: string };
export type PortfolioResult = { metric: string; before: string; after: string };

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  categories: string[];
  url: string;
  emoji: string;
  image?: string;
  preview: {
    headline: string;
    stats: PortfolioStat[];
  };
  detail: {
    client: string;
    industry: string;
    location: string;
    challenge: string;
    solution: string;
    deliverables: string[];
    results: PortfolioResult[];
    tools: string[];
    liveUrl: string;
  };
}

export const portfolio: PortfolioProject[] = (data.portfolio as any[]).map((p) => ({
  id: p.slug,
  title: p.title ?? "",
  subtitle: p.subtitle ?? "",
  period: p.period ?? "",
  categories: p.categories ?? [],
  url: p.live_url ?? "",
  emoji: p.emoji ?? "",
  image: p.image_url ?? undefined,
  preview: {
    headline: p.preview_headline ?? "",
    stats: (p.preview_stats ?? []) as PortfolioStat[],
  },
  detail: {
    client: p.detail_client ?? "",
    industry: p.detail_industry ?? "",
    location: p.detail_location ?? "",
    challenge: p.detail_challenge ?? "",
    solution: p.detail_solution ?? "",
    deliverables: p.detail_deliverables ?? [],
    results: (p.detail_results ?? []) as PortfolioResult[],
    tools: p.detail_tools ?? [],
    liveUrl: p.live_url ?? "",
  },
}));

/* ── Testimonials ────────────────────────────────────────── */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photo_url: string | null;
  quote: string;
  rating: number;
  is_featured: boolean;
}

export const testimonials: Testimonial[] = (data.testimonials as any[]).map((t) => ({
  id: t.id,
  name: t.name,
  role: t.role ?? "",
  company: t.company ?? "",
  photo_url: t.photo_url ?? null,
  quote: t.quote,
  rating: t.rating ?? 5,
  is_featured: t.is_featured ?? false,
}));

/* ── Pricing ─────────────────────────────────────────────── */

export interface PricingTier {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  setup_price: string;
  monthly_price: string;
  features: string[];
  cta_text: string;
  cta_url: string;
  is_highlight: boolean;
}

export const pricing: PricingTier[] = (data.pricing as any[]).map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  tagline: p.tagline ?? "",
  setup_price: p.setup_price ?? "",
  monthly_price: p.monthly_price ?? "",
  features: p.features ?? [],
  cta_text: p.cta_text ?? "Get started",
  cta_url: p.cta_url ?? "",
  is_highlight: p.is_highlight ?? false,
}));

/* ── About photos ────────────────────────────────────────── */

export interface AboutPhoto {
  id: string;
  url: string;
  alt_text: string;
}

export const aboutPhotos: AboutPhoto[] = (data.aboutPhotos as any[]).map((p) => ({
  id: p.id,
  url: p.url,
  alt_text: p.alt_text ?? "",
}));

/* ── Affiliate links ─────────────────────────────────────── */

export interface AffiliateLink {
  id: string;
  slug: string;
  name: string;
  description: string;
  commission_text: string;
  short_text: string;
  emoji: string;
  logo_url: string | null;
  url: string;
}

export const affiliateLinks: AffiliateLink[] = (data.affiliateLinks as any[]).map((a) => ({
  id: a.id,
  slug: a.slug,
  name: a.name,
  description: a.description ?? "",
  commission_text: a.commission_text ?? "",
  short_text: a.short_text ?? "",
  emoji: a.emoji ?? "",
  logo_url: a.logo_url ?? null,
  url: a.url,
}));

/* ── Service pages ───────────────────────────────────────── */

export interface ServicePage {
  id: string;
  slug: string;
  name: string;
  icon_emoji: string;
  is_available: boolean;
  href: string;
  description: string;
  hero_image_url: string | null;
}

export const servicePages: ServicePage[] = (data.servicePages as any[]).map((s) => ({
  id: s.id,
  slug: s.slug,
  name: s.name,
  icon_emoji: s.icon_emoji ?? "",
  is_available: s.is_available ?? false,
  href: s.href ?? "",
  description: s.description ?? "",
  hero_image_url: s.hero_image_url ?? null,
}));

/* ── SEO meta ────────────────────────────────────────────── */

export interface SeoPage {
  route: string;
  title: string;
  description: string;
  og_image_url: string | null;
  keywords: string[];
}

export const seoPages: Record<string, SeoPage> = Object.fromEntries(
  (data.seoPages as any[]).map((s) => [
    s.route,
    {
      route: s.route,
      title: s.title ?? "",
      description: s.description ?? "",
      og_image_url: s.og_image_url ?? null,
      keywords: s.keywords ?? [],
    },
  ])
);

/* ── Flexible site_content lookup ────────────────────────── */

const siteContent = (data.siteContent ?? {}) as Record<string, any>;

/**
 * Get a piece of site content by dotted key (e.g. "hero.headline").
 * Falls back to the provided string if the key isn't in the CMS yet.
 * Returns the `text` field from the stored JSONB value, or the raw value
 * if it's already a string.
 */
export function getContent(key: string, fallback: string): string {
  const v = siteContent[key];
  if (typeof v === "string") return v;
  if (v && typeof v.text === "string") return v.text;
  return fallback;
}

/**
 * Get a richer content block (returns the whole JSONB value).
 * Use when the content has multiple fields, e.g. {title, sub, cta_text, cta_url}.
 */
export function getBlock<T = Record<string, unknown>>(key: string, fallback: T): T {
  const v = siteContent[key];
  return (v && typeof v === "object" ? v : fallback) as T;
}

export const generatedAt: string = data.generatedAt ?? "";
