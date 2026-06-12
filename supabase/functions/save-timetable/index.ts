// Supabase Edge Function: save-timetable  — DISABLED
// ------------------------------------------------------------
// ການບັນທຶກຕາຕະລາງດຽວນີ້ໃຊ້ Supabase Auth (Google) + RLS allowlist ແທນ:
// admin ທີ່ login ແລ້ວ ຂຽນຕາຕະລາງໂດຍກົງ (table public.timetable, policy
// "Admins can update timetable" ກວດດ້ວຍ public.is_admin()).
// ໄຟລ໌ນີ້ຖືກ deploy ໄວ້ເປັນ no-op ເພື່ອປິດ backdoor ລະຫັດແບ່ງປັນເກົ່າ.
Deno.serve(() => new Response(
  JSON.stringify({ error: "Gone: this endpoint is disabled. Use Supabase Auth." }),
  { status: 410, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
));
