import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Field, TextInput, TextArea } from "@/components/admin/Field";

// Seed keys with descriptions — Yasir can add more.
const SEED_KEYS: { key: string; description: string; multiline?: boolean }[] = [
  { key: "hero.headline",        description: "Big bold home page headline (under the AI sparkle pill)", multiline: true },
  { key: "hero.subline",         description: "One-line tagline under the headline", multiline: true },
  { key: "hero.cta_primary",     description: "Main CTA button label on the hero" },
  { key: "hero.cta_secondary",   description: "Secondary CTA button label on the hero" },
  { key: "about.intro",          description: "Paragraph next to your photo (also editable in About Me)", multiline: true },
  { key: "testimonials.heading", description: "Heading above testimonials section", multiline: true },
  { key: "pricing.heading",      description: "Heading above pricing tiers", multiline: true },
  { key: "pricing.subheading",   description: "Sub-line under pricing heading", multiline: true },
  { key: "services.heading",     description: "Heading on the services / industries grid", multiline: true },
  { key: "footer.tagline",       description: "Short line at the bottom of footer", multiline: true },
  { key: "finalcta.heading",     description: "Last big CTA block heading", multiline: true },
  { key: "finalcta.subheading",  description: "Last big CTA block subheading", multiline: true },
];

export default function AdminContent() {
  const [rows, setRows] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newVal, setNewVal] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("*");
    const map: Record<string, string> = {};
    for (const r of data ?? []) {
      map[r.key] = typeof r.value === "string" ? r.value : (r.value?.text ?? JSON.stringify(r.value));
    }
    setRows(map);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const saveKey = async (key: string, text: string, description?: string) => {
    setSaving(true);
    await supabase.from("site_content").upsert(
      { key, value: { text }, description: description ?? "" },
      { onConflict: "key" },
    );
    setSaving(false);
  };

  const saveAll = async () => {
    setSaving(true);
    for (const { key, description } of SEED_KEYS) {
      if (rows[key] !== undefined) {
        await supabase.from("site_content").upsert(
          { key, value: { text: rows[key] }, description },
          { onConflict: "key" },
        );
      }
    }
    setSaving(false);
    alert("All saved.");
  };

  const addCustom = async () => {
    if (!newKey) return;
    await saveKey(newKey, newVal, "Custom key");
    setNewKey(""); setNewVal("");
    await load();
  };

  const delKey = async (key: string) => {
    if (!confirm(`Delete "${key}"?`)) return;
    await supabase.from("site_content").delete().eq("key", key);
    await load();
  };

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl mb-1">Site Content</h1>
      <p className="text-sm text-muted-foreground mb-8">Hero, headings and key copy across the public site. Each saves as a separate row.</p>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <>
          <div className="space-y-5">
            {SEED_KEYS.map((s) => (
              <div key={s.key} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-primary">{s.key}</code>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{s.description}</p>
                {s.multiline ? (
                  <TextArea rows={2} value={rows[s.key] ?? ""} onChange={(v) => setRows({ ...rows, [s.key]: v })} />
                ) : (
                  <TextInput value={rows[s.key] ?? ""} onChange={(v) => setRows({ ...rows, [s.key]: v })} />
                )}
              </div>
            ))}
          </div>

          <button onClick={saveAll} disabled={saving} className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save all
          </button>

          <hr className="my-8 border-border" />

          <h2 className="font-heading font-bold text-lg mb-3">Custom keys</h2>
          <p className="text-sm text-muted-foreground mb-4">Add your own content keys — useful for one-off labels you reference manually.</p>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <TextInput value={newKey} onChange={setNewKey} placeholder="my.custom.key" />
            <TextInput value={newVal} onChange={setNewVal} placeholder="The value" />
            <button onClick={addCustom} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 whitespace-nowrap">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {Object.keys(rows).filter((k) => !SEED_KEYS.find((s) => s.key === k)).length > 0 && (
            <div className="space-y-2">
              {Object.entries(rows).filter(([k]) => !SEED_KEYS.find((s) => s.key === k)).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                  <code className="text-xs font-mono">{k}</code>
                  <span className="text-sm text-foreground/70 flex-1 truncate">{v}</span>
                  <button onClick={() => delKey(k)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
