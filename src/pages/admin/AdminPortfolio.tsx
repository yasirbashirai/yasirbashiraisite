import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import { listRows, createRow, updateRow, deleteRow, uploadFile } from "@/lib/admin-api";
import { Field, TextInput, TextArea, NumberInput, ToggleSwitch, ListEditor } from "@/components/admin/Field";

type Row = any;

const TABLE = "portfolio_projects";

export default function AdminPortfolio() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setRows(await listRows(TABLE, { orderBy: "sort_order" }));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startNew = () =>
    setEditing({
      slug: "",
      title: "",
      subtitle: "",
      period: new Date().getFullYear().toString(),
      emoji: "🚀",
      image_url: null,
      live_url: "",
      categories: ["Web Apps"],
      preview_headline: "",
      preview_stats: [{ value: "", label: "" }],
      detail_client: "",
      detail_industry: "",
      detail_location: "",
      detail_challenge: "",
      detail_solution: "",
      detail_deliverables: [""],
      detail_results: [{ metric: "", before: "", after: "" }],
      detail_tools: [""],
      is_published: true,
      sort_order: rows.length,
    });

  const save = async () => {
    if (!editing.slug || !editing.title) return;
    setSaving(true);
    try {
      if (editing.id) await updateRow(TABLE, editing.id, stripMeta(editing));
      else await createRow(TABLE, stripMeta(editing));
      setEditing(null);
      await load();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (row: Row) => {
    if (!confirm(`Delete "${row.title}"? This can't be undone.`)) return;
    await deleteRow(TABLE, row.id);
    await load();
  };

  const uploadImage = async (file: File) => {
    const path = `projects/${editing.slug || "tmp"}-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadFile("portfolio-images", path, file);
    setEditing({ ...editing, image_url: url });
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Portfolio</h1>
          <p className="text-sm text-muted-foreground">{rows.length} projects</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add project
        </button>
      </header>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>
      ) : (
        <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-4 hover:bg-secondary/40">
              <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                {r.image_url ? (
                  <img src={r.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">{r.emoji}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-foreground truncate">{r.title}</p>
                <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
              </div>
              <div className="hidden md:flex gap-1.5">
                {!r.is_published && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Draft</span>
                )}
                {r.live_url && (
                  <a href={r.live_url} target="_blank" rel="noopener noreferrer"
                     className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary inline-flex items-center gap-1">
                    Live <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              <button onClick={() => setEditing(r)} className="p-2 text-muted-foreground hover:text-foreground">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => del(r)} className="p-2 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl my-8 p-6 space-y-5">
            <header className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-xl">{editing.id ? "Edit project" : "New project"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug (URL id)" hint="kebab-case, unique"><TextInput value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="my-project" /></Field>
              <Field label="Title"><TextInput value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} /></Field>
              <Field label="Subtitle"><TextInput value={editing.subtitle} onChange={(v) => setEditing({ ...editing, subtitle: v })} /></Field>
              <Field label="Period"><TextInput value={editing.period} onChange={(v) => setEditing({ ...editing, period: v })} placeholder="2024" /></Field>
              <Field label="Emoji"><TextInput value={editing.emoji} onChange={(v) => setEditing({ ...editing, emoji: v })} /></Field>
              <Field label="Live URL"><TextInput value={editing.live_url} onChange={(v) => setEditing({ ...editing, live_url: v })} placeholder="https://…" /></Field>
            </div>

            <Field label="Screenshot" hint="Upload PNG/JPG — auto-saved to Supabase Storage">
              <div className="flex items-center gap-3">
                {editing.image_url && (
                  <img src={editing.image_url} alt="" className="w-24 h-16 object-cover rounded border border-border" />
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm hover:bg-secondary/60">
                  <ImageIcon className="w-4 h-4" />
                  {editing.image_url ? "Replace image" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
                  />
                </label>
              </div>
            </Field>

            <Field label="Categories (comma-separated)">
              <TextInput
                value={(editing.categories || []).join(", ")}
                onChange={(v) => setEditing({ ...editing, categories: v.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            </Field>

            <hr className="border-border" />
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary">Card preview</h3>
            <Field label="Headline"><TextInput value={editing.preview_headline} onChange={(v) => setEditing({ ...editing, preview_headline: v })} /></Field>
            <Field label="Stats (3 boxes — value + label)">
              <div className="space-y-2">
                {(editing.preview_stats || []).map((s: any, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <TextInput value={s.value} onChange={(v) => {
                      const next = [...editing.preview_stats];
                      next[i] = { ...next[i], value: v };
                      setEditing({ ...editing, preview_stats: next });
                    }} placeholder="40%" />
                    <TextInput value={s.label} onChange={(v) => {
                      const next = [...editing.preview_stats];
                      next[i] = { ...next[i], label: v };
                      setEditing({ ...editing, preview_stats: next });
                    }} placeholder="More leads" />
                  </div>
                ))}
              </div>
            </Field>

            <hr className="border-border" />
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary">Case study detail</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Client"><TextInput value={editing.detail_client} onChange={(v) => setEditing({ ...editing, detail_client: v })} /></Field>
              <Field label="Industry"><TextInput value={editing.detail_industry} onChange={(v) => setEditing({ ...editing, detail_industry: v })} /></Field>
              <Field label="Location"><TextInput value={editing.detail_location} onChange={(v) => setEditing({ ...editing, detail_location: v })} /></Field>
            </div>
            <Field label="Challenge"><TextArea rows={3} value={editing.detail_challenge} onChange={(v) => setEditing({ ...editing, detail_challenge: v })} /></Field>
            <Field label="Solution"><TextArea rows={3} value={editing.detail_solution} onChange={(v) => setEditing({ ...editing, detail_solution: v })} /></Field>

            <Field label="Deliverables (one per line)">
              <ListEditor values={editing.detail_deliverables || []} onChange={(v) => setEditing({ ...editing, detail_deliverables: v })} placeholder="Custom site design" />
            </Field>

            <Field label="Before / After results">
              <div className="space-y-2">
                {(editing.detail_results || []).map((r: any, i: number) => (
                  <div key={i} className="grid grid-cols-3 gap-2">
                    <TextInput value={r.metric} onChange={(v) => {
                      const next = [...editing.detail_results];
                      next[i] = { ...next[i], metric: v };
                      setEditing({ ...editing, detail_results: next });
                    }} placeholder="Metric" />
                    <TextInput value={r.before} onChange={(v) => {
                      const next = [...editing.detail_results];
                      next[i] = { ...next[i], before: v };
                      setEditing({ ...editing, detail_results: next });
                    }} placeholder="Before" />
                    <TextInput value={r.after} onChange={(v) => {
                      const next = [...editing.detail_results];
                      next[i] = { ...next[i], after: v };
                      setEditing({ ...editing, detail_results: next });
                    }} placeholder="After" />
                  </div>
                ))}
                <button type="button" onClick={() => setEditing({ ...editing, detail_results: [...(editing.detail_results || []), { metric: "", before: "", after: "" }] })} className="text-xs text-primary font-bold hover:underline">+ Add row</button>
              </div>
            </Field>

            <Field label="Tools (comma-separated)">
              <TextInput
                value={(editing.detail_tools || []).join(", ")}
                onChange={(v) => setEditing({ ...editing, detail_tools: v.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            </Field>

            <hr className="border-border" />
            <div className="flex items-center gap-6">
              <ToggleSwitch value={editing.is_published} onChange={(v) => setEditing({ ...editing, is_published: v })} label="Published" />
              <Field label="Sort order"><NumberInput value={editing.sort_order} onChange={(v) => setEditing({ ...editing, sort_order: v })} /></Field>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-border">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg hover:bg-secondary">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function stripMeta(r: any) {
  const { id, created_at, updated_at, ...rest } = r;
  return rest;
}
