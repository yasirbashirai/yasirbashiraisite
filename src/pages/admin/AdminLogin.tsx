import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/admin-auth";
import { Loader2, Lock, Mail, LogIn } from "lucide-react";

const ALLOWED_EMAIL = "yasirbashirai@gmail.com";

export default function AdminLogin() {
  const { session, loading } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading…
      </div>
    );
  }

  if (session) {
    const from = (location.state as any)?.from?.pathname || "/admin";
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    if (email.trim().toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      setMessage({
        type: "err",
        text: "This admin is restricted to a specific email.",
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (error) {
      setMessage({ type: "err", text: error.message });
    }
    // On success, useAuth's onAuthStateChange fires, session updates,
    // the <Navigate /> branch above takes over on next render.
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary via-background to-secondary">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-card-hover">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-lg">
              YB
            </div>
          </div>

          <h1 className="font-heading font-extrabold text-2xl text-center mb-2">
            Yasir's Studio
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Sign in to manage your site content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-primary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-heading font-bold text-white bg-gradient-to-br from-primary to-primary-light hover:opacity-95 transition disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                message.type === "ok"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          <a href="/" className="hover:text-primary">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
