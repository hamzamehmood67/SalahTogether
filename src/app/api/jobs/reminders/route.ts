import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import {
  DEFAULT_SETTINGS,
  Settings,
  PRAYERS,
  Prayer,
  dateKey,
  shiftDate,
  prayerTimes,
} from "@/lib/domain";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (
    !url ||
    !key ||
    !process.env.VAPID_PRIVATE_KEY ||
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  )
    return Response.json(
      { error: "Scheduler is not configured" },
      { status: 503 },
    );
  const db = createClient(url, key, { auth: { persistSession: false } });
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:hello@example.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
  try {
    const { data: profiles, error } = await db
      .from("profiles")
      .select("id,settings");
    if (error) throw error;
    const now = new Date();
    let scheduleCount = 0;
    for (const profile of profiles || []) {
      const s = { ...DEFAULT_SETTINGS, ...profile.settings } as Settings;
      const today = dateKey(now, s.timezone);
      const schedule = [];
      const jobs = [];
      for (const day of [today, shiftDate(today, 1)]) {
        const times = prayerTimes(s, day);
        for (const prayer of PRAYERS) {
          const starts = times[prayer];
          if (Number.isNaN(starts.getTime())) continue;
          const remind = new Date(starts.getTime() + s.offset * 60000);
          schedule.push({
            user_id: profile.id,
            date: day,
            prayer,
            starts_at: starts.toISOString(),
            remind_at: remind.toISOString(),
          });
          if (
            s.reminders &&
            s.reminderPrayers.includes(prayer) &&
            remind.getTime() > now.getTime() - 15 * 60000
          )
            jobs.push({
              user_id: profile.id,
              date: day,
              prayer,
              kind: "scheduled",
              due_at: remind.toISOString(),
            });
        }
      }
      const { error: se } = await db
        .from("prayer_schedule")
        .upsert(schedule, { onConflict: "user_id,date,prayer" });
      if (se) throw se;
      if (jobs.length) {
        const { error: je } = await db
          .from("notification_jobs")
          .upsert(jobs, {
            onConflict: "user_id,date,prayer,kind",
            ignoreDuplicates: true,
          });
        if (je) throw je;
      }
      scheduleCount += schedule.length;
    }
    const { data: jobs, error: ce } = await db.rpc("claim_notification_jobs");
    if (ce) throw ce;
    let sent = 0,
      expired = 0,
      failed = 0;
    for (const job of jobs || []) {
      try {
        const { data: profile } = await db
          .from("profiles")
          .select("settings")
          .eq("id", job.user_id)
          .single();
        const s = { ...DEFAULT_SETTINGS, ...profile?.settings } as Settings;
        const { count } = await db
          .from("prayer_records")
          .select("*", { count: "exact", head: true })
          .eq("user_id", job.user_id)
          .eq("date", job.date)
          .eq("prayer", job.prayer);
        let allowed =
          job.kind === "scheduled"
            ? s.reminders && s.reminderPrayers.includes(job.prayer as Prayer)
            : s.nudges;
        if (job.kind === "nudge") {
          const { data: mine } = await db
            .from("circle_members")
            .select("circle_id")
            .eq("user_id", job.user_id);
          const { data: theirs } = await db
            .from("circle_members")
            .select("circle_id")
            .eq("user_id", job.sender);
          allowed =
            allowed &&
            !!mine?.some((m) =>
              theirs?.some((t) => m.circle_id === t.circle_id),
            );
        }
        if (
          count ||
          !allowed ||
          new Date(job.due_at).getTime() < now.getTime() - 15 * 60000
        ) {
          await db
            .from("notification_jobs")
            .update({ status: "expired" })
            .eq("id", job.id);
          expired++;
          continue;
        }
        const { data: subs } = await db
          .from("push_subscriptions")
          .select("*")
          .eq("user_id", job.user_id);
        let delivered = false;
        let transient = false;
        for (const sub of subs || []) {
          try {
            await webpush.sendNotification(
              sub.subscription,
              JSON.stringify({
                title: "A little moment for salah",
                body:
                  job.kind === "nudge"
                    ? "Someone in your circle is sending a gentle reminder."
                    : `It’s time for ${job.prayer[0].toUpperCase() + job.prayer.slice(1)}. Take a moment for yourself.`,
                tag: `saff-${job.date}-${job.prayer}`,
              }),
              { TTL: 900 },
            );
            delivered = true;
          } catch (e) {
            const status = (e as { statusCode?: number }).statusCode;
            if (status === 410 || status === 404)
              await db.from("push_subscriptions").delete().eq("id", sub.id);
            else transient = true;
          }
        }
        const status = delivered
          ? "sent"
          : transient && job.attempts < 3
            ? "pending"
            : "expired";
        await db
          .from("notification_jobs")
          .update({
            status,
            last_error: transient ? "Push delivery failed" : null,
          })
          .eq("id", job.id);
        if (delivered) sent++;
        else if (transient) failed++;
        else expired++;
      } catch (e) {
        failed++;
        await db
          .from("notification_jobs")
          .update({
            status: job.attempts >= 3 ? "expired" : "pending",
            last_error: (e as Error).message,
          })
          .eq("id", job.id);
      }
    }
    return Response.json({ scheduled: scheduleCount, sent, expired, failed });
  } catch (e) {
    console.error("Saff reminder worker failed:", (e as Error).message);
    return Response.json({ error: "Reminder worker failed" }, { status: 500 });
  }
}
