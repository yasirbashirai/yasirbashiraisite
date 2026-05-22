import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Tag,
  User,
  Type,
  Search,
  Link2,
  Wrench,
  Inbox,
  LogOut,
  Menu,
  X,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/lib/admin-auth";
import { supabase } from "@/lib/supabase";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/pricing", label: "Pricing", icon: Tag },
  { to: "/admin/about", label: "About Me", icon: User },
  { to: "/admin/content", label: "Site Content", icon: Type },
  { to: "/admin/seo", label: "SEO Meta", icon: Search },
  { to: "/admin/affiliates", label: "Affiliate Links", icon: Link2 },
  { to: "/admin/services", label: "Service Pages", icon: Wrench },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const handlePublish = async () => {
    setPublishing(true);
    setPublishMsg(null);
    try {
      const { data, error } = await supabase.functions.invoke("publish-site", {
        body: {},
      });
      if (error) throw error;
      setPublishMsg("✅ Site rebuild triggered. Live in ~60s.");
    } catch (e: any) {
      setPublishMsg("❌ " + (e?.message || "Publish failed."));
    } finally {
      setPublishing(false);
      setTimeout(() => setPublishMsg(null), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center font-heading font-extrabold text-sm">
            YB
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-sm text-foreground">Yasir's Studio</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/75 hover:text-foreground hover:bg-secondary/60"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border bg-card">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-2 rounded-lg text-sm font-heading font-bold bg-gradient-to-br from-primary to-primary-light text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {publishing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Publishing…
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                Publish to live site
              </>
            )}
          </button>
          {publishMsg && (
            <p className="text-xs text-center mb-2 text-foreground/75">{publishMsg}</p>
          )}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 lg:ml-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <p className="font-heading font-bold text-sm">Yasir's Studio</p>
          <Link to="/" className="ml-auto text-xs text-primary">
            View site →
          </Link>
        </header>

        {/* Desktop topbar */}
        <header className="hidden lg:flex sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border px-8 py-3 items-center gap-4">
          <p className="font-heading font-bold text-sm text-muted-foreground">
            {useLocation().pathname}
          </p>
          <Link
            to="/"
            target="_blank"
            className="ml-auto text-xs text-primary hover:underline"
          >
            View live site →
          </Link>
        </header>

        <div className="p-4 lg:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
