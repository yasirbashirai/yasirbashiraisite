import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Star, Image as ImageIcon, Loader2 } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow, uploadFile } from "@/lib/admin-api";
import { Field, TextInput, TextArea, NumberInput, ToggleSwitch } from "@/components/admin/Field";

const TABLE = "testimonials";

export default function AdminTestimonials() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setRows(await listRows(TABLE, { orderBy: "sort_order" }));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startNew = () =>
    setEditing({
      name: "",
      role: "",
      company: "",
      photo_url: null,
      quote: "",
      rating: 5,
      is_featured: false,
      is_published: true,
      sort_order: rows.length,
    });

  const save = async () => {
    if (!editing.name || !editing.quote) return;
    setSaving(true);
    try {
      const { id, created_at, updated_at, ...payload } = editing;
      if (id) await updateRow(TABLE, id, payload);
      else await createRow(TABLE, payload);
      setEditing(null);
      await load();
    } catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  const del = async (row: any) => {
    if (!confirm(`Delete testimonial from ${row.name}?`)) return;
    await deleteRow(TABLE, row.id);
    await load();
  };

  const uploadPhoto = async (file: File) => {
    const path = `${editing.name?.toLowerCase().replace(/\s+/g, "-") || "tmp"}-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadFile("testimonial-photos", path, file);
    setEditing({ ...editing, photo_url: url });
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Testimonials</h1>
          <p className="text-sm text-muted-foreground">{rows.length} client reviews</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> Add testimonial
        </button>
      </header>

      {loading ? <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div> : (
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {rows.length === 0 && <p className="p-8 text-center text-muted-foreground text-sm">No testimonials yet. Add your first review.</p>}
          {rows.map((r) => (
            <div key={r.id} className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center font-bold text-xs flex-shrink-0 overflow-hidden">
                {r.photo_url ? <img src={r.photo_url} alt="" className="w-full h-full object-cover" /> : r.name.split(" ").map((w: string) => w[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-heading font-bold text-foreground">{r.name}</p>
                  {r.is_featured && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-gold">Featured</span>}
                  {!r.is_published && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted">Draft</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{r.role}{r.company ? ` · ${r.company}` : ""}</p>
                <p className="text-sm text-foreground/80 line-clamp-2">"{r.quote}"</p>
                <div className="text-primary text-xs mt-1">{"⭐".repeat(r.rating)}</div>
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
              <h2 className="font-heading font-extrabold text-xl">{editing.id ? "Edit testimonial" : "New testimonial"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </header>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Name"><TextInput value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} /></Field>
              <Field label="Role"><TextInput value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} placeholder="CEO" /></Field>
              <Field label="Company / Platform"><TextInput value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} placeholder="Fiverr" /></Field>
              <Field label="Rating (1-5)">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setEditing({ ...editing, rating: n })} className={n <= editing.rating ? "text-gold" : "text-muted"}>
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <Field label="Photo (optional)">
              <div className="flex items-center gap-3">
                {editing.photo_url && <img src={editing.photo_url} alt="" className="w-12 h-12 rounded-full object-cover" />}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm hover:bg-secondary/60">
                  <ImageIcon className="w-4 h-4" />
                  {editing.photo_url ? "Replace" : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && uploadPhoto(e.target.files[0])} />
                </label>
              </div>
            </Field>

            <Field label="Quote"><TextArea rows={4} value={editing.quote} onChange={(v) => setEditing({ ...editing, quote: v })} /></Field>

            <div className="flex items-center gap-6">
              <ToggleSwitch value={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} label="Published" />
              <ToggleSwitch value={editing.is_featured} onChange={(v) => setEditing({ ...editing, is_featured: v })} label="Featured" />
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
