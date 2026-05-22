import { useEffect, useState } from "react";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow } from "@/lib/admin-api";
import { Field, TextInput, TextArea } from "@/components/admin/Field";

const TABLE = "seo_pages";

const DEFAULT_ROUTES = ["/", "/portfolio", "/logistics-solutions", "/calculator", "/disclaimer"];

export default function AdminSeo() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => { setLoading(true); setRows(await listRows(TABLE, { orderBy: "route" })); setLoading(false); };
  useEffect(() => { load(); }, []);

  const ensureRoute = async (route: string) => {
    if (rows.find((r) => r.route === route)) return;
    await createRow(TABLE, { route, title: "", description: "", og_image_url: null, keywords: [], is_published: true });
    await load();
  };

  const saveRow = async (row: any) => {
    setSaving(row.route);
    const { id, created_at, updated_at, ...payload } = row;
    await updateRow(TABLE, id, payload);
    setSaving(null);
  };

  const del = async (row: any) => {
    if (!confirm(`Delete SEO for ${row.route}?`)) return;
    await deleteRow(TABLE, row.id); await load();
  };

  const updateLocal = (id: string, patch: any) => setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div>
      <header className="flex items-center justify-between mb-2">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">SEO Meta</h1>
          <p className="text-sm text-muted-foreground">Page title, description, and OG image per route.</p>
        </div>
      </header>

      <div className="bg-secondary/40 border border-border rounded-xl p-3 mb-6 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">Quick add:</span>
        {DEFAULT_ROUTES.map((r) => (
          <button key={r} onClick={() => ensureRoute(r)} className="text-xs font-mono px-2 py-1 rounded bg-card border border-border hover:border-primary/40">{r}</button>
        ))}
        <button onClick={() => {
          const r = prompt("Route (e.g. /pricing):");
          if (r) ensureRoute(r);
        }} className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Custom</button>
      </div>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="space-y-4">
          {rows.length === 0 && <p className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">No SEO entries yet. Click a route above to add one.</p>}
          {rows.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <code className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-primary">{r.route}</code>
                <button onClick={() => del(r)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Page title" hint="Shows in Google search results">
                  <TextInput value={r.title || ""} onChange={(v) => updateLocal(r.id, { title: v })} placeholder="Yasir Bashir — AI Engineer" />
                </Field>
                <Field label="OG image URL" hint="Custom share preview for this page">
                  <TextInput value={r.og_image_url || ""} onChange={(v) => updateLocal(r.id, { og_image_url: v })} placeholder="https://…" />
                </Field>
              </div>

              <Field label="Description" hint="The gray text under the blue link on Google">
                <TextArea rows={2} value={r.description || ""} onChange={(v) => updateLocal(r.id, { description: v })} />
              </Field>

              <Field label="Keywords (comma-separated)">
                <TextInput
                  value={(r.keywords || []).join(", ")}
                  onChange={(v) => updateLocal(r.id, { keywords: v.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                />
              </Field>

              <button onClick={() => saveRow(r)} disabled={saving === r.route} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50">
                {saving === r.route ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
