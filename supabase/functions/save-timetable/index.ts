// Supabase Edge Function: save-timetable
// ------------------------------------------------------------
// ບັນທຶກຕາຕະລາງລວມຂຶ້ນ database (admin ເທົ່ານັ້ນ).
// client ສົ່ງ { password, data } ມາ → ກວດລະຫັດ → ຂຽນດ້ວຍ service role.
// ການອ່ານ (read) ໃຊ້ anon key ໂດຍກົງຜ່ານ REST (RLS public read).
//
// Deploy: ຜ່ານ Supabase MCP / CLI. verify_jwt = true (anon JWT ກໍຜ່ານ).
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Server-side write password. The client must send this to save.
// Change it here (and SUPA_WRITE_PASSWORD in index.html) to rotate.
const ADMIN_WRITE_PASSWORD = "admin123";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
  try {
    const body = await req.json();
    const { password, data } = body ?? {};
    if (password !== ADMIN_WRITE_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    if (!data || typeof data !== "object") {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: cur } = await supabase.from("timetable").select("version").eq("id", 1).single();
    const newVersion = ((cur?.version ?? 0) as number) + 1;
    const { error } = await supabase.from("timetable").update({
      data,
      version: newVersion,
      updated_at: new Date().toISOString(),
    }).eq("id", 1);
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, version: newVersion }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error)?.message ?? e) }), {
      status: 500, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
