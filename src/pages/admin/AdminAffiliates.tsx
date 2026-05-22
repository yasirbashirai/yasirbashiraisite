import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2, ExternalLink } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow, uploadFile } from "@/lib/admin-api";
import { Field, TextInput, TextArea, NumberInput, ToggleSwitch } from "@/components/admin/Field";

const TABLE = "affiliate_links";

export default function AdminAffiliates() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); setRows(await listRows(TABLE, { orderBy: "sort_order" })); setLoading(false); };
  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({
    slug: "", name: "", description: "", commission_text: "", short_text: "",
    emoji: "🔗", logo_url: null, url: "", is_published: true, sort_order: rows.length,
  });

  const save = async () => {
    if (!editing.slug || !editing.name || !editing.url) return;
    setSaving(true);
    try {
      const { id, created_at, updated_at, ...payload } = editing;
      if (id) await updateRow(TABLE, id, payload); else await createRow(TABLE, payload);
      setEditing(null); await load();
    } catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  const del = async (row: any) => {
    if (!confirm(`Delete "${row.name}"?`)) return;
    await deleteRow(TABLE, row.id); await load();
  };

  const uploadLogo = async (file: File) => {
    const path = `affiliates/${editing.slug || "tmp"}-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadFile("media", path, file);
    setEditing({ ...editing, logo_url: url });
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Affiliate Links</h1>
          <p className="text-sm text-muted-foreground">{rows.length} programs</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> Add affiliate
        </button>
      </header>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {rows.length === 0 && <p className="p-8 text-center text-muted-foreground text-sm">No affiliates yet.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-4">
              <div className="text-2xl">{r.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground truncate">{r.description}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold font-bold hidden md:inline">{r.short_text}</span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" /></a>
              <button onClick={() => setEditing(r)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => del(r)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-xl my-8 p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-xl">{editing.id ? "Edit affiliate" : "New affiliate"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug"><TextInput value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="hostinger" /></Field>
              <Field label="Name"><TextInput value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} /></Field>
              <Field label="URL"><TextInput value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} placeholder="https://…" /></Field>
              <Field label="Emoji"><TextInput value={editing.emoji} onChange={(v) => setEditing({ ...editing, emoji: v })} /></Field>
              <Field label="Commission text"><TextInput value={editing.commission_text} onChange={(v) => setEditing({ ...editing, commission_text: v })} placeholder="Up to 60% commission" /></Field>
              <Field label="Short text (chip)"><TextInput value={editing.short_text} onChange={(v) => setEditing({ ...editing, short_text: v })} placeholder="60% commission" /></Field>
            </div>

            <Field label="Description"><TextArea rows={2} value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} /></Field>

            <Field label="Logo (optional)">
              <div className="flex items-center gap-3">
                {editing.logo_url && <img src={editing.logo_url} alt="" className="w-12 h-12 rounded object-contain bg-secondary" />}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm hover:bg-secondary/60">
                  Upload logo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && uploadLogo(e.target.files[0])} />
                </label>
              </div>
            </Field>

            <div className="flex items-center gap-6">
              <ToggleSwitch value={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} label="Published" />
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
