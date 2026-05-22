// ──────────────────────────────────────────────────────────────────────
// publish-site Edge Function
//
// Called from the admin dashboard when Yasir hits "Publish to live site".
// Triggers a Vercel rebuild via a deploy hook URL kept as a Supabase
// secret (never exposed to the browser).
//
// Requires the caller to be authenticated as a Supabase user
// (`verify_jwt = true` is the default in config.toml — see below).
// ──────────────────────────────────────────────────────────────────────

// @ts-expect-error: Deno runtime types are not available in Vite TS context
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // @ts-expect-error: Deno global
    const hookUrl = Deno.env.get("VERCEL_DEPLOY_HOOK_URL");
    if (!hookUrl) {
      return json({ error: "VERCEL_DEPLOY_HOOK_URL is not set." }, 500);
    }

    const res = await fetch(hookUrl, { method: "POST" });
    const body = await res.text();

    if (!res.ok) {
      return json({ error: `Vercel returned ${res.status}: ${body}` }, 502);
    }

    let parsed: unknown = null;
    try { parsed = JSON.parse(body); } catch { parsed = body; }

    return json({ ok: true, vercel: parsed }, 200);
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});

function json(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
