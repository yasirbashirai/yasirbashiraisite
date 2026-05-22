export type Stat = { value: string; label: string };
export type Result = { metric: string; before: string; after: string };

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  period: string | null;
  emoji: string | null;
  image_url: string | null;
  live_url: string | null;
  categories: string[];
  preview_headline: string | null;
  preview_stats: Stat[];
  detail_client: string | null;
  detail_industry: string | null;
  detail_location: string | null;
  detail_challenge: string | null;
  detail_solution: string | null;
  detail_deliverables: string[];
  detail_results: Result[];
  detail_tools: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  photo_url: string | null;
  quote: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
