-- ──────────────────────────────────────────────────────────────────────
-- yasirbashir.com — Phase 1 CMS schema
-- Tables: portfolio_projects, testimonials
-- Storage: portfolio-images, testimonial-photos (both public)
-- RLS: anon = SELECT on published rows only, authenticated = full CRUD
-- ──────────────────────────────────────────────────────────────────────

-- Helper: auto-updated updated_at column
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ───────────────────────────────────────────
-- 1. PORTFOLIO PROJECTS
-- ───────────────────────────────────────────
create table public.portfolio_projects (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  title                 text not null,
  subtitle              text,
  period                text,
  emoji                 text,
  image_url             text,
  live_url              text,
  categories            text[] not null default '{}',
  -- preview card
  preview_headline      text,
  preview_stats         jsonb not null default '[]'::jsonb,
  -- detail panel
  detail_client         text,
  detail_industry       text,
  detail_location       text,
  detail_challenge      text,
  detail_solution       text,
  detail_deliverables   text[] not null default '{}',
  detail_results        jsonb not null default '[]'::jsonb,
  detail_tools          text[] not null default '{}',
  -- meta
  is_published          boolean not null default true,
  sort_order            integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index portfolio_projects_published_sort_idx
  on public.portfolio_projects (is_published, sort_order);
create index portfolio_projects_categories_idx
  on public.portfolio_projects using gin (categories);

create trigger portfolio_projects_set_updated_at
  before update on public.portfolio_projects
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- 2. TESTIMONIALS
-- ───────────────────────────────────────────
create table public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text,
  company       text,
  photo_url     text,
  quote         text not null,
  rating        integer not null default 5 check (rating between 1 and 5),
  is_featured   boolean not null default false,
  is_published  boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index testimonials_published_sort_idx
  on public.testimonials (is_published, sort_order);
create index testimonials_featured_idx
  on public.testimonials (is_featured) where is_featured = true;

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────
-- 3. ROW LEVEL SECURITY
-- ───────────────────────────────────────────
alter table public.portfolio_projects enable row level security;
alter table public.testimonials       enable row level security;

-- Public site (anon role): read published rows only
create policy "anon read published portfolio"
  on public.portfolio_projects for select
  to anon
  using (is_published = true);

create policy "anon read published testimonials"
  on public.testimonials for select
  to anon
  using (is_published = true);

-- Logged-in admin (authenticated role): full CRUD on everything
create policy "authenticated full access portfolio"
  on public.portfolio_projects for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated full access testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);

-- ───────────────────────────────────────────
-- 4. STORAGE BUCKETS
-- ───────────────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('portfolio-images',   'portfolio-images',   true),
  ('testimonial-photos', 'testimonial-photos', true)
on conflict (id) do nothing;

-- Storage RLS: public read, authenticated write
create policy "Public read portfolio-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-images');

create policy "Authenticated write portfolio-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-images');

create policy "Authenticated update portfolio-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-images');

create policy "Authenticated delete portfolio-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-images');

create policy "Public read testimonial-photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'testimonial-photos');

create policy "Authenticated write testimonial-photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'testimonial-photos');

create policy "Authenticated update testimonial-photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'testimonial-photos');

create policy "Authenticated delete testimonial-photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'testimonial-photos');
