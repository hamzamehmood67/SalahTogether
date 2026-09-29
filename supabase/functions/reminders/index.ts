// Optional Supabase Edge Function bridge. Invoke every minute from Supabase Cron.
// Keep SITE_URL and CRON_SECRET in Supabase secrets, never in the client.
Deno.serve(async (request: Request) => {
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (
    !cronSecret ||
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  )
    return new Response("Unauthorized", { status: 401 });
  const site = Deno.env.get("SITE_URL");
  if (!site) return new Response("SITE_URL missing", { status: 503 });
  const result = await fetch(`${site}/api/jobs/reminders`, {
    headers: { Authorization: `Bearer ${cronSecret}` },
  });
  return new Response(await result.text(), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
});
