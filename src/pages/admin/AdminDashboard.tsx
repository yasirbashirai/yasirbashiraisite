import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  MessageSquare,
  Tag,
  Link2,
  Inbox,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const CARDS = [
  { key: "portfolio_projects",  label: "Portfolio",         to: "/admin/portfolio",    icon: FolderKanban, color: "from-teal-500 to-emerald-600" },
  { key: "testimonials",        label: "Testimonials",      to: "/admin/testimonials", icon: MessageSquare, color: "from-cyan-500 to-teal-600" },
  { key: "pricing_tiers",       label: "Pricing tiers",     to: "/admin/pricing",      icon: Tag, color: "from-amber-500 to-orange-600" },
  { key: "affiliate_links",     label: "Affiliate links",   to: "/admin/affiliates",   icon: Link2, color: "from-emerald-500 to-teal-600" },
  { key: "form_submissions",    label: "Submissions",       to: "/admin/submissions",  icon: Inbox, color: "from-orange-400 to-amber-600", filterUnread: true },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [unread, setUnread] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const results = await Promise.all(
        CARDS.map(async (c) => {
          let q = supabase.from(c.key).select("*", { count: "exact", head: true });
          if (c.filterUnread) q = (q as any).eq("is_read", false);
          const { count } = await q;
          return [c.key, count ?? 0] as const;
        }),
      );
      const obj: Record<string, number> = {};
      for (const [k, v] of results) obj[k] = v;
      setCounts(obj);
      setUnread(obj["form_submissions"] ?? 0);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="font-heading font-extrabold text-3xl mb-1">Welcome back, Yasir 👋</h1>
      <p className="text-muted-foreground mb-8">
        Edit anything below — hit <span className="font-semibold text-foreground">Publish</span> in the sidebar when you're ready to push to live.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading stats…
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center mb-4`}>
                <c.icon className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.label}</p>
              <p className="font-heading font-extrabold text-3xl text-foreground">
                {counts[c.key] ?? 0}
                {c.filterUnread && unread && unread > 0 && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">
                    {unread} new
                  </span>
                )}
              </p>
              <p className="text-xs text-primary mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Manage <ArrowRight className="w-3 h-3" />
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 bg-secondary/40 border border-border rounded-2xl p-6">
        <h3 className="font-heading font-bold text-lg mb-2">How publishing works</h3>
        <ol className="text-sm text-foreground/75 space-y-1 list-decimal list-inside">
          <li>Edit any section in this studio</li>
          <li>Hit <strong>Publish to live site</strong> in the sidebar</li>
          <li>Vercel rebuilds your site (~60 seconds) with the new content baked into HTML</li>
          <li>Google + visitors see the update — SEO stays perfect ✅</li>
        </ol>
      </div>
    </div>
  );
}
