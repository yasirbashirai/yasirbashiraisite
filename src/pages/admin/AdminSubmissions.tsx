import { useEffect, useState } from "react";
import { Mail, Phone, Tag, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react";
import { listRows, updateRow, deleteRow } from "@/lib/admin-api";

const TABLE = "form_submissions";

export default function AdminSubmissions() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("unread");

  const load = async () => { setLoading(true); setRows(await listRows(TABLE, { orderBy: "created_at", ascending: false })); setLoading(false); };
  useEffect(() => { load(); }, []);

  const toggleRead = async (row: any) => {
    await updateRow(TABLE, row.id, { is_read: !row.is_read });
    await load();
  };

  const del = async (row: any) => {
    if (!confirm("Delete this submission?")) return;
    await deleteRow(TABLE, row.id); await load();
  };

  const visible = filter === "unread" ? rows.filter((r) => !r.is_read) : rows;
  const unreadCount = rows.filter((r) => !r.is_read).length;

  return (
    <div>
      <header className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Submissions</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total · {unreadCount} unread</p>
        </div>
        <div className="inline-flex items-center gap-1 bg-secondary border border-border rounded-lg p-1">
          <button onClick={() => setFilter("unread")} className={`px-3 py-1 text-xs rounded ${filter === "unread" ? "bg-primary text-primary-foreground" : ""}`}>Unread ({unreadCount})</button>
          <button onClick={() => setFilter("all")} className={`px-3 py-1 text-xs rounded ${filter === "all" ? "bg-primary text-primary-foreground" : ""}`}>All ({rows.length})</button>
        </div>
      </header>

      {loading ? <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading…</div> : (
        <div className="space-y-3">
          {visible.length === 0 && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-heading font-bold text-foreground">No {filter === "unread" ? "unread" : ""} submissions yet</p>
              <p className="text-sm text-muted-foreground mt-1">When visitors fill in your forms, they'll appear here.</p>
            </div>
          )}
          {visible.map((r) => (
            <article key={r.id} className={`bg-card border rounded-2xl p-5 ${r.is_read ? "border-border opacity-75" : "border-primary/40 shadow-card-hover"}`}>
              <header className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary"><Tag className="w-3 h-3" />{r.source}</span>
                  {!r.is_read && <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-bold">NEW</span>}
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleRead(r)} className="p-1.5 text-muted-foreground hover:text-foreground" title={r.is_read ? "Mark unread" : "Mark read"}>
                    {r.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => del(r)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              </header>

              {r.name && <p className="font-heading font-bold text-foreground">{r.name}</p>}
              <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                {r.email && <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail className="w-3 h-3" />{r.email}</a>}
                {r.phone && <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone className="w-3 h-3" />{r.phone}</a>}
              </div>

              {r.message && <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">{r.message}</p>}

              {r.metadata && Object.keys(r.metadata || {}).length > 0 && (
                <details className="mt-3">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">More details</summary>
                  <pre className="mt-2 p-3 bg-secondary rounded text-xs overflow-x-auto">{JSON.stringify(r.metadata, null, 2)}</pre>
                </details>
              )}

              {r.referrer && <p className="text-[11px] text-muted-foreground mt-2 inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />From: {r.referrer}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
