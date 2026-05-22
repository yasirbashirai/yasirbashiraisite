-- ──────────────────────────────────────────────────────────────────────
-- Phase 2 — full CMS schema expansion
-- Adds: pricing_tiers, site_content (k/v), about_photos, seo_pages,
--       affiliate_links, service_pages, form_submissions
-- Plus storage bucket `media`
-- ──────────────────────────────────────────────────────────────────────

-- ───────────────────────────────────────────
-- pricing_tiers
-- ───────────────────────────────────────────
create table public.pricing_tiers (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  tagline       text,
  setup_price   text,
  monthly_price text,
  features      text[] not null default '{}',
  cta_text      text default 'Get started',
  cta_url       text,
  is_highlight  boolean not null default false,
  is_published  boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index pricing_tiers_published_sort_idx
  on public.pricing_tiers (is_published, sort_order);

create trigger pricing_tiers_set_updated_at
  before update on public.pricing_tiers
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- site_content — flexible key/value content
-- key examples: hero.headline, hero.subline, testimonials.heading,
--   about.intro, footer.tagline, pricing.heading, services.heading
-- ───────────────────────────────────────────
create table public.site_content (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,
  value        jsonb not null default '{}'::jsonb,
  description  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index site_content_key_idx on public.site_content (key);

create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- about_photos — rotating photos in the About Me card
-- ───────────────────────────────────────────
create table public.about_photos (
  id            uuid primary key default gen_random_uuid(),
  url           text not null,
  alt_text      text,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index about_photos_published_sort_idx
  on public.about_photos (is_published, sort_order);

create trigger about_photos_set_updated_at
  before update on public.about_photos
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- seo_pages — per-route SEO metadata
-- ───────────────────────────────────────────
create table public.seo_pages (
  id            uuid primary key default gen_random_uuid(),
  route         text unique not null,
  title         text,
  description   text,
  og_image_url  text,
  keywords      text[] not null default '{}',
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index seo_pages_route_idx on public.seo_pages (route);

create trigger seo_pages_set_updated_at
  before update on public.seo_pages
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- affiliate_links — programs Yasir promotes
-- ───────────────────────────────────────────
create table public.affiliate_links (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  description     text,
  commission_text text,
  short_text      text,
  emoji           text,
  logo_url        text,
  url             text not null,
  is_published    boolean not null default true,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index affiliate_links_published_sort_idx
  on public.affiliate_links (is_published, sort_order);

create trigger affiliate_links_set_updated_at
  before update on public.affiliate_links
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- service_pages — industry/service offerings
-- ───────────────────────────────────────────
create table public.service_pages (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  icon_emoji    text,
  is_available  boolean not null default false,
  href          text,
  description   text,
  hero_image_url text,
  content       jsonb not null default '{}'::jsonb,
  is_published  boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index service_pages_published_sort_idx
  on public.service_pages (is_published, sort_order);

create trigger service_pages_set_updated_at
  before update on public.service_pages
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- form_submissions — leads / contact / audit requests
-- ───────────────────────────────────────────
create table public.form_submissions (
  id          uuid primary key default gen_random_uuid(),
  source      text not null,
  name        text,
  email       text,
  phone       text,
  message     text,
  metadata    jsonb not null default '{}'::jsonb,
  is_read     boolean not null default false,
  user_agent  text,
  referrer    text,
  created_at  timestamptz not null default now()
);

create index form_submissions_unread_idx
  on public.form_submissions (is_read, created_at desc);
create index form_submissions_source_idx
  on public.form_submissions (source);

-- ───────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ───────────────────────────────────────────
alter table public.pricing_tiers    enable row level security;
alter table public.site_content     enable row level security;
alter table public.about_photos     enable row level security;
alter table public.seo_pages        enable row level security;
alter table public.affiliate_links  enable row level security;
alter table public.service_pages    enable row level security;
alter table public.form_submissions enable row level security;

-- Public reads (anon role): published rows only
create policy "anon read pricing_tiers"
  on public.pricing_tiers for select to anon
  using (is_published = true);

create policy "anon read site_content"
  on public.site_content for select to anon
  using (true);

create policy "anon read about_photos"
  on public.about_photos for select to anon
  using (is_published = true);

create policy "anon read seo_pages"
  on public.seo_pages for select to anon
  using (is_published = true);

create policy "anon read affiliate_links"
  on public.affiliate_links for select to anon
  using (is_published = true);

create policy "anon read service_pages"
  on public.service_pages for select to anon
  using (is_published = true);

-- form_submissions: anon can INSERT (form submissions from visitors), not read
create policy "anon insert form_submissions"
  on public.form_submissions for insert to anon
  with check (true);

-- Admin (authenticated): full CRUD on everything
create policy "auth full pricing_tiers"
  on public.pricing_tiers for all to authenticated
  using (true) with check (true);

create policy "auth full site_content"
  on public.site_content for all to authenticated
  using (true) with check (true);

create policy "auth full about_photos"
  on public.about_photos for all to authenticated
  using (true) with check (true);

create policy "auth full seo_pages"
  on public.seo_pages for all to authenticated
  using (true) with check (true);

create policy "auth full affiliate_links"
  on public.affiliate_links for all to authenticated
  using (true) with check (true);

create policy "auth full service_pages"
  on public.service_pages for all to authenticated
  using (true) with check (true);

create policy "auth full form_submissions"
  on public.form_submissions for all to authenticated
  using (true) with check (true);

-- ───────────────────────────────────────────
-- STORAGE — general `media` bucket
-- ───────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "Authenticated write media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "Authenticated update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "Authenticated delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
