import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
import { beforeAll, afterAll, it, expect } from "vitest";
import { DEFAULT_SETTINGS } from "../src/lib/domain";
let db: PGlite;
const a = "11111111-1111-4111-8111-111111111111",
  b = "22222222-2222-4222-8222-222222222222",
  outsider = "33333333-3333-4333-8333-333333333333";
async function asUser(id: string) {
  await db.exec(
    `reset role;set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`,
  );
}
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    `create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema auth to authenticated;grant execute on function auth.uid() to authenticated;create publication supabase_realtime;`,
  );
  // Apply every migration in filename (timestamp) order, as on a fresh project.
  for (const file of readdirSync("supabase/migrations").sort())
    await db.exec(readFileSync("supabase/migrations/" + file, "utf8"));
  await db.exec(
    `insert into auth.users(id) values('${a}'),('${b}'),('${outsider}');`,
  );
}, 30000);
afterAll(async () => {
  await db?.close();
});
it("creates new profiles without seeded progress or circles", async () => {
  await asUser(a);
  const result = await db.query<{
    d: {
      settings: { name: string; onboarded: boolean };
      records: unknown[];
      circles: unknown[];
    };
  }>("select public.get_dashboard() d");
  expect(result.rows[0].d.settings.name).toBe("Friend");
  expect(result.rows[0].d.settings.onboarded).toBe(false);
  expect(result.rows[0].d.records).toEqual([]);
  expect(result.rows[0].d.circles).toEqual([]);
});
it("applies schema and prevents outsiders from reading records while sharing with circle members", async () => {
  await asUser(a);
  await db.query(`select public.set_prayer(current_date-1,'fajr',true)`);
  await db.query(`select public.set_prayer(current_date-1,'fajr',true)`);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(1);
  const created = await db.query<{ id: string }>(
    `select public.create_circle('Family') as id`,
  );
  const circle = created.rows[0].id;
  const dashboard = (
    await db.query<{ d: any }>("select public.get_dashboard() d")
  ).rows[0].d;
  const code = dashboard.circles[0].code;
  await asUser(outsider);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(0);
  await asUser(b);
  await db.query("select public.join_circle($1)", [code]);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(1);
  const shared = (await db.query<{ d: any }>("select public.get_dashboard() d"))
    .rows[0].d;
  expect(shared.circles[0].members[0]).not.toHaveProperty("settings");
  expect(shared.circles[0].members[0]).not.toHaveProperty("timezone");
  await expect(
    db.query(
      `insert into public.prayer_records(user_id,date,prayer,timezone) values('${a}',current_date,'isha','UTC')`,
    ),
  ).rejects.toThrow();
  await db.query("select public.leave_circle($1)", [circle]);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(0);
});
it("rejects future records and invalid settings, and denies public RPC execution", async () => {
  await asUser(a);
  await expect(
    db.query(`select public.set_prayer(current_date+2,'fajr',true)`),
  ).rejects.toThrow(/Future/);
  await expect(
    db.query(
      `select public.save_settings('{"name":"A","timezone":"Invalid"}')`,
    ),
  ).rejects.toThrow(/timezone/);
  await db.exec("reset role;set role anon;");
  await expect(db.query("select public.get_dashboard()")).rejects.toThrow(
    /permission/,
  );
});
it("allows only one nudge across circles and respects recipient opt-out", async () => {
  await asUser(a);
  let dashboard = (
    await db.query<{ d: any }>("select public.get_dashboard() d")
  ).rows[0].d;
  const code = dashboard.circles[0].code;
  await asUser(b);
  await db.query("select public.join_circle($1)", [code]);
  await asUser(a);
  await expect(
    db.query(`select public.send_nudge('${b}','asr')`),
  ).rejects.toThrow(/paused/);
  await db.exec(
    `reset role;update public.profiles set settings=jsonb_set(settings,'{nudges}','true') where id='${b}';insert into public.prayer_schedule(user_id,date,prayer,starts_at,remind_at) values('${b}',(now() at time zone 'Asia/Karachi')::date,'asr',now()-interval '1 minute',now());`,
  );
  await asUser(a);
  await db.query(`select public.send_nudge('${b}','asr')`);
  await expect(
    db.query(`select public.send_nudge('${b}','asr')`),
  ).rejects.toThrow(/already/);
  await asUser(outsider);
  await expect(
    db.query(`select public.send_nudge('${b}','asr')`),
  ).rejects.toThrow(/share/);
});

it("retains visibility through another circle and transfers ownership safely", async () => {
  await asUser(a);
  const c = (
    await db.query<{ id: string }>("select public.create_circle('Friends') id")
  ).rows[0].id;
  let d = (await db.query<{ d: any }>("select public.get_dashboard() d"))
    .rows[0].d;
  const code = d.circles.find((x: any) => x.id === c).code;
  await asUser(b);
  await db.query("select public.join_circle($1)", [code]);
  await asUser(a);
  const oldCircle = d.circles.find((x: any) => x.id !== c).id;
  await db.query("select public.leave_circle($1)", [oldCircle]);
  await asUser(b);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(1);
  d = (await db.query<{ d: any }>("select public.get_dashboard() d")).rows[0].d;
  expect(d.circles.find((x: any) => x.id === oldCircle).owner).toBe(b);
  await asUser(a);
  await db.query("select public.leave_circle($1)", [c]);
  await asUser(b);
  expect(
    (await db.query("select * from public.prayer_records")).rows,
  ).toHaveLength(0);
});

it("stores the onboarding flag and rejects a non-boolean value", async () => {
  await asUser(outsider);
  const settings = { ...DEFAULT_SETTINGS, name: "Amina", onboarded: true };
  await db.query("select public.save_settings($1)", [settings]);
  const d = (await db.query<{ d: any }>("select public.get_dashboard() d"))
    .rows[0].d;
  expect(d.settings.onboarded).toBe(true);
  expect(d.settings.name).toBe("Amina");
  await expect(
    db.query("select public.save_settings($1)", [
      { ...settings, onboarded: "yes" },
    ]),
  ).rejects.toThrow(/preferences/);
});

it("moves a device's push subscription to whoever registers it", async () => {
  const endpoint = "https://push.example.com/device-1";
  const subscription = { endpoint, keys: { p256dh: "k", auth: "a" } };
  await asUser(a);
  await db.query("select public.register_push_subscription($1,$2)", [
    endpoint,
    subscription,
  ]);
  expect(
    (await db.query("select * from public.push_subscriptions")).rows,
  ).toHaveLength(1);
  await asUser(b);
  await db.query("select public.register_push_subscription($1,$2)", [
    endpoint,
    subscription,
  ]);
  const mine = await db.query<{ user_id: string }>(
    "select user_id from public.push_subscriptions",
  );
  expect(mine.rows).toEqual([{ user_id: b }]);
  await asUser(a);
  expect(
    (await db.query("select * from public.push_subscriptions")).rows,
  ).toHaveLength(0);
  await expect(
    db.query("select public.register_push_subscription($1,$2)", [
      "http://insecure.example.com/x",
      { endpoint: "http://insecure.example.com/x" },
    ]),
  ).rejects.toThrow(/Invalid push/);
  await expect(
    db.query("select public.register_push_subscription($1,$2)", [
      endpoint,
      { endpoint: "https://push.example.com/other" },
    ]),
  ).rejects.toThrow(/Invalid push/);
});

it("deletes an account and its data while handing shared circles on", async () => {
  const leaving = "44444444-4444-4444-8444-444444444444",
    staying = "55555555-5555-4555-8555-555555555555";
  await db.exec(
    `reset role;insert into auth.users(id) values('${leaving}'),('${staying}');`,
  );
  await asUser(leaving);
  await db.query(`select public.set_prayer(current_date-1,'isha',true)`);
  await db.query("select public.create_circle('Just me')");
  const shared = (
    await db.query<{ id: string }>("select public.create_circle('Shared') id")
  ).rows[0].id;
  await db.query("select public.register_push_subscription($1,$2)", [
    "https://push.example.com/leaving",
    { endpoint: "https://push.example.com/leaving" },
  ]);
  const code = (
    await db.query<{ d: any }>("select public.get_dashboard() d")
  ).rows[0].d.circles.find((c: any) => c.id === shared).code;
  await asUser(staying);
  await db.query("select public.join_circle($1)", [code]);
  await db.exec("reset role;set role anon;");
  await expect(db.query("select public.delete_account()")).rejects.toThrow(
    /permission/,
  );
  await asUser(leaving);
  await db.query("select public.delete_account()");
  await db.exec("reset role;");
  for (const [table, column] of [
    ["auth.users", "id"],
    ["public.profiles", "id"],
    ["public.prayer_records", "user_id"],
    ["public.circle_members", "user_id"],
    ["public.push_subscriptions", "user_id"],
  ])
    expect(
      (await db.query(`select 1 from ${table} where ${column}=$1`, [leaving]))
        .rows,
    ).toHaveLength(0);
  const circles = await db.query<{ name: string; owner: string }>(
    "select name, owner from public.circles where name in ('Just me','Shared')",
  );
  expect(circles.rows).toEqual([{ name: "Shared", owner: staying }]);
  await asUser(staying);
  const d = (await db.query<{ d: any }>("select public.get_dashboard() d"))
    .rows[0].d;
  expect(d.circles[0].members.map((m: any) => m.id)).toEqual([staying]);
});
