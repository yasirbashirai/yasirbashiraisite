import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2 } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow } from "@/lib/admin-api";
import { Field, TextInput, ListEditor, NumberInput, ToggleSwitch } from "@/components/admin/Field";

const TABLE = "pricing_tiers";

export default function AdminPricing() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); setRows(await listRows(TABLE, { orderBy: "sort_order" })); setLoading(false); };
  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({
    slug: "", name: "", tagline: "", setup_price: "", monthly_price: "",
    features: [""], cta_text: "Get started", cta_url: "",
    is_highlight: false, is_published: true, sort_order: rows.length,
  });

  const save = async () => {
    if (!editing.slug || !editing.name) return;
    setSaving(true);
    try {
      const { id, created_at, updated_at, ...payload } = editing;
      if (id) await updateRow(TABLE, id, payload); else await createRow(TABLE, payload);
      setEditing(null); await load();
    } catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  const del = async (row: any) => {
    if (!confirm(`Delete "${row.name}" tier?`)) return;
    await deleteRow(TABLE, row.id); await load();
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Pricing tiers</h1>
          <p className="text-sm text-muted-foreground">{rows.length} packages</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> Add tier
        </button>
      </header>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {rows.length === 0 && <p className="md:col-span-2 p-8 text-center text-muted-foreground text-sm bg-card border border-border rounded-2xl">No pricing tiers yet.</p>}
          {rows.map((r) => (
            <div key={r.id} className={`relative bg-card border rounded-2xl p-5 ${r.is_highlight ? "border-primary/60 shadow-card-hover" : "border-border"}`}>
              {r.is_highlight && <span className="absolute -top-2 left-5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-bold">Highlight</span>}
              <p className="font-heading font-extrabold text-lg">{r.name}</p>
              <p className="text-sm text-muted-foreground mb-3">{r.tagline}</p>
              <p className="text-sm"><span className="font-bold">{r.setup_price}</span> setup{r.monthly_price && <> + <span className="font-bold">{r.monthly_price}</span>/mo</>}</p>
              <p className="text-xs text-muted-foreground mt-2">{r.features?.length || 0} features</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setEditing(r)} className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/60 inline-flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                <button onClick={() => del(r)} className="text-xs px-3 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl my-8 p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-xl">{editing.id ? "Edit tier" : "New tier"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug"><TextInput value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="starter" /></Field>
              <Field label="Name"><TextInput value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} placeholder="AI Starter System" /></Field>
              <Field label="Setup price"><TextInput value={editing.setup_price} onChange={(v) => setEditing({ ...editing, setup_price: v })} placeholder="$1,497" /></Field>
              <Field label="Monthly price"><TextInput value={editing.monthly_price} onChange={(v) => setEditing({ ...editing, monthly_price: v })} placeholder="$497" /></Field>
            </div>

            <Field label="Tagline"><TextInput value={editing.tagline} onChange={(v) => setEditing({ ...editing, tagline: v })} /></Field>
            <Field label="Features (one per row)"><ListEditor values={editing.features || []} onChange={(v) => setEditing({ ...editing, features: v })} placeholder="Conversion-engineered landing page" /></Field>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="CTA text"><TextInput value={editing.cta_text} onChange={(v) => setEditing({ ...editing, cta_text: v })} /></Field>
              <Field label="CTA URL"><TextInput value={editing.cta_url} onChange={(v) => setEditing({ ...editing, cta_url: v })} placeholder="https://cal.com/…" /></Field>
            </div>

            <div className="flex items-center gap-6">
              <ToggleSwitch value={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} label="Published" />
              <ToggleSwitch value={editing.is_highlight} onChange={(v) => setEditing({ ...editing, is_highlight: v })} label="Highlighted tier" />
              <Field label="Sort"><NumberInput value={editing.sort_order} onChange={(v) => setEditing({ ...editing, sort_order: v })} /></Field>
            </div>

            <div className="flex gap-3 justify-end pt-3 border-t border-border">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg hover:bg-secondary">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
