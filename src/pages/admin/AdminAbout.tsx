import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Image as ImageIcon, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { listRows, createRow, updateRow, deleteRow, uploadFile } from "@/lib/admin-api";
import { Field, TextInput, TextArea } from "@/components/admin/Field";

export default function AdminAbout() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [intro, setIntro] = useState<string>("");
  const [stats, setStats] = useState<any>({ years: "", projects: "", clients: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const load = async () => {
    setLoading(true);
    const ph = await listRows("about_photos", { orderBy: "sort_order" });
    setPhotos(ph);

    const { data: introRow } = await supabase.from("site_content").select("value").eq("key", "about.intro").single();
    if (introRow?.value?.text) setIntro(introRow.value.text);

    const { data: statsRow } = await supabase.from("site_content").select("value").eq("key", "about.stats").single();
    if (statsRow?.value) setStats(statsRow.value);

    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const saveIntro = async () => {
    setSaving(true);
    await supabase.from("site_content").upsert(
      { key: "about.intro", value: { text: intro }, description: "Paragraph on About Me card" },
      { onConflict: "key" },
    );
    await supabase.from("site_content").upsert(
      { key: "about.stats", value: stats, description: "Stats trio on About Me card" },
      { onConflict: "key" },
    );
    setSaving(false);
    alert("Saved.");
  };

  const uploadPhoto = async (file: File) => {
    setUploadingPhoto(true);
    try {
      const path = `about/yasir-${Date.now()}.${file.name.split(".").pop()}`;
      const url = await uploadFile("media", path, file);
      await createRow("about_photos", { url, alt_text: "Yasir", sort_order: photos.length, is_published: true });
      await load();
    } catch (e: any) { alert(e.message); }
    finally { setUploadingPhoto(false); }
  };

  const move = async (row: any, dir: -1 | 1) => {
    const newOrder = row.sort_order + dir;
    await updateRow("about_photos", row.id, { sort_order: newOrder });
    await load();
  };

  const del = async (row: any) => {
    if (!confirm("Delete this photo?")) return;
    await deleteRow("about_photos", row.id);
    await load();
  };

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl mb-1">About Me</h1>
      <p className="text-sm text-muted-foreground mb-8">Manage your intro paragraph, the rotating photos card, and the stats trio.</p>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="space-y-8">
          {/* Intro paragraph */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-heading font-bold text-lg mb-4">Intro paragraph</h2>
            <Field label="Text shown next to your photo on the home page"><TextArea rows={5} value={intro} onChange={setIntro} /></Field>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
              <Field label="Years experience"><TextInput value={stats.years || ""} onChange={(v) => setStats({ ...stats, years: v })} placeholder="5+" /></Field>
              <Field label="Projects delivered"><TextInput value={stats.projects || ""} onChange={(v) => setStats({ ...stats, projects: v })} placeholder="800+" /></Field>
              <Field label="Happy clients"><TextInput value={stats.clients || ""} onChange={(v) => setStats({ ...stats, clients: v })} placeholder="300+" /></Field>
            </div>
            <button onClick={saveIntro} disabled={saving} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save intro + stats
            </button>
          </section>

          {/* Photos */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <header className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-bold text-lg">Photos</h2>
                <p className="text-xs text-muted-foreground">Cycle on the About Me card (Ken Burns animation)</p>
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">
                <ImageIcon className="w-4 h-4" />
                {uploadingPhoto ? "Uploading…" : "Upload photo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && uploadPhoto(e.target.files[0])} />
              </label>
            </header>

            {photos.length === 0 && <p className="text-sm text-muted-foreground py-4">No photos uploaded yet. The site is using fallback photos from /public/about/.</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative group rounded-xl overflow-hidden border border-border aspect-[3/4]">
                  <img src={p.url} alt={p.alt_text} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button onClick={() => move(p, -1)} className="p-2 bg-white/10 text-white rounded-lg" title="Move up"><ArrowUp className="w-4 h-4" /></button>
                    <button onClick={() => move(p, 1)} className="p-2 bg-white/10 text-white rounded-lg" title="Move down"><ArrowDown className="w-4 h-4" /></button>
                    <button onClick={() => del(p)} className="p-2 bg-destructive/80 text-white rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
