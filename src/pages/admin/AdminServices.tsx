import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2 } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow, uploadFile } from "@/lib/admin-api";
import { Field, TextInput, TextArea, NumberInput, ToggleSwitch } from "@/components/admin/Field";

const TABLE = "service_pages";

export default function AdminServices() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); setRows(await listRows(TABLE, { orderBy: "sort_order" })); setLoading(false); };
  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({
    slug: "", name: "", icon_emoji: "🛠", is_available: false, href: "",
    description: "", hero_image_url: null, content: {}, is_published: true, sort_order: rows.length,
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
    if (!confirm(`Delete "${row.name}"?`)) return;
    await deleteRow(TABLE, row.id); await load();
  };

  const uploadHero = async (file: File) => {
    const path = `services/${editing.slug || "tmp"}-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadFile("media", path, file);
    setEditing({ ...editing, hero_image_url: url });
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Service Pages</h1>
          <p className="text-sm text-muted-foreground">Industries shown in your services mega menu.</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> Add service
        </button>
      </header>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="grid md:grid-cols-2 gap-3">
          {rows.length === 0 && <p className="md:col-span-2 p-8 text-center text-muted-foreground text-sm bg-card border border-border rounded-2xl">No services yet.</p>}
          {rows.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <div className="text-2xl">{r.icon_emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold">{r.name}</p>
                <p className="text-xs text-muted-foreground truncate">{r.is_available ? "✅ Live" : "⏳ Coming Soon"}</p>
              </div>
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
              <h2 className="font-heading font-extrabold text-xl">{editing.id ? "Edit service" : "New service"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug"><TextInput value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="logistics" /></Field>
              <Field label="Name"><TextInput value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} placeholder="Logistics" /></Field>
              <Field label="Icon (emoji)"><TextInput value={editing.icon_emoji} onChange={(v) => setEditing({ ...editing, icon_emoji: v })} /></Field>
              <Field label="Page href" hint="Only used if available"><TextInput value={editing.href} onChange={(v) => setEditing({ ...editing, href: v })} placeholder="/logistics-solutions" /></Field>
            </div>

            <Field label="Description"><TextArea rows={2} value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} /></Field>

            <Field label="Hero image (optional)">
              <div className="flex items-center gap-3">
                {editing.hero_image_url && <img src={editing.hero_image_url} alt="" className="w-20 h-12 rounded object-cover" />}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm hover:bg-secondary/60">
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && uploadHero(e.target.files[0])} />
                </label>
              </div>
            </Field>

            <div className="flex items-center gap-6 flex-wrap">
              <ToggleSwitch value={editing.is_available} onChange={(v) => setEditing({ ...editing, is_available: v })} label="Available (vs Coming Soon)" />
              <ToggleSwitch value={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} label="Published in menu" />
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
