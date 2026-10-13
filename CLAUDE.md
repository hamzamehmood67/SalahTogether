# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project status: prototype → MVP

Saff ("Saff — Salah Circles"; the repo directory is `SalahTogether`, the package and app are `saff`) is a mobile-first prayer tracker with shared family/friend circles. It is a **working prototype** that is being taken to MVP. Many features still need to be added, and existing behavior is expected to change. Treat the current code as a starting point, not a spec.

`README.md` documents the prototype's setup and intended semantics in detail: Supabase setup, visibility rules, streak and badge rules, reminders, and design fidelity. Read the relevant section before changing any of those. If a requested change conflicts with a prototype rule described here or in the README (strict fidelity to the reference design, for example, or the single-migration setup), point out the conflict and confirm before you either keep or break the rule.

Known prototype limits, taken from the README and the code:

- `get_dashboard` returns the full prayer history of the user and of every member of every circle they belong to, in one payload. The client refetches it after every write, every 15 s, on window focus, and on every Realtime change to `prayer_records`.
- The reminder worker loops over every profile once a minute. It is sized for a small pilot.
- Location comes from five hard-coded `CITIES` or browser GPS. Defaults: Lahore, Karachi method, Hanafi Asr.
- The UI is English only (Arabic prayer labels). Writes require a connection. There is no offline sync, no native Android client (the RPCs are meant to be shared with a future one), and no billing or chat.
- There is no lint script. Prettier is installed with default settings and no config file.

## Commands

```sh
npm run dev                 # http://localhost:3000, binds 0.0.0.0 for phone testing over LAN
npm run typecheck           # tsc --noEmit
npm test                    # Vitest: tests/domain.test.ts + tests/database.test.ts
npx vitest run tests/domain.test.ts -t "streak"     # single unit test
npm run build               # note: next build --webpack (explicit, not Turbopack)
npm run test:e2e            # Playwright
npx playwright test tests/e2e/app.spec.ts -g "mobile navigation"   # single e2e test
npx prettier --write <files>
```

- The `it` blocks in `tests/database.test.ts` share one PGlite database and depend on earlier tests' state (circles and records created early are reused later). Run the whole file, not one test with `-t`.
- E2E starts its own dev server on port 3100 with `distDir` `.next-e2e` (set through `SAFF_TEST_OUTPUT` in `next.config.ts`), so it can run while `npm run dev` is up. It uses the locally installed Google Chrome (`channel: "chrome"`) and freezes the clock at `2026-09-29T11:50:00Z`.
- `tests/e2e/reference.spec.ts` is skipped unless `SAFF_REFERENCE_FILE` points to the original design HTML (see the README, "Original design fidelity").

## Architecture

It is a single-page app on Next.js 16 App Router: `src/app/page.tsx` renders `<Saff />`. The stack is React 19, Supabase (Postgres, Auth with email magic links, Realtime), `adhan` for prayer times, `motion` for animation, and Web Push for reminders.

### Client layers

- **`src/lib/domain.ts`** holds pure logic shared by the browser and the server reminder worker: types (`Settings`, `RecordItem`, `Member`, `Circle`), `DEFAULT_SETTINGS`, `CITIES`, date keys, streaks, `prayerTimes`, and `badges`. Dates are `YYYY-MM-DD` strings in the user's own timezone (`dateKey`, `shiftDate`). Streaks, badges, and goal progress are **computed on the client from raw prayer records**. No award is ever stored.
- **`src/lib/use-saff.ts`** is the only client data layer. It handles auth state and loads everything through the `get_dashboard` RPC. Each mutation (`toggle`, `saveSettings`, `createCircle`, `joinCircle`, `leaveCircle`, `nudge`, `setGoal`) calls one RPC and then reloads. `toggle` updates optimistically and rolls back on error. The `identity` ref throws away responses that arrive after an account switch. RPCs run in a `setTimeout` outside the `onAuthStateChange` callback, to stay clear of Supabase's auth lock.
- **`src/lib/supabase.ts`** exports the browser client, or `null` when the env vars are missing.
- **`src/components/saff.tsx`** (~1700 lines) is the whole UI controller. It owns tab state, every sheet (auth, settings, location, create/join/invite circle, goal, member detail), toasts, the desktop sidebar shell, push subscription, and the `referenceValues` object that feeds the reference screens.

### Reference screens are generated code

The five mobile screens in `src/components/reference/` (`welcome`, `today`, `circle`, `insights`, `milestones`) come from the supplied design HTML:

- `scripts/port-reference.py` writes `reference/*.tsx`, `fonts.css`, `source-styles.json`, and `public/fonts/ref-*.woff2`. It also does literal text replacements (prototype names become `{{bindings}}`), swaps links for buttons, and adds accessibility attributes. To change what a regenerated screen binds, change this script.
- `scripts/scope-reference-css.mjs` turns `source-styles.json` into `original.css`. Every rule gets a `.reference-<screen>` prefix and every keyframe is renamed `ref-<screen>-*`.
- **Running either script again overwrites hand edits.** If an MVP change has to edit the generated `.tsx` or `original.css` directly, the port can no longer be re-run safely. Tell the user when that happens.
- The templates only display things. Every dynamic value and callback reaches them through the `v` prop (`ReferenceValues`, built in `saff.tsx`). Change screen data or behavior in `referenceValues`, not in the template.
- `reference/responsive.css` adapts the fixed 390×844 screens to other sizes: tablet/desktop, phones narrower than 390 px, and reduced motion.
- `src/app/globals.css` imports Tailwind v4, but the app-owned UI (sidebar, sheets, forms, toasts) is styled almost entirely with hand-written classes, not Tailwind utilities.

### Backend (Supabase)

- **All schema, RLS, and RPCs live in one file**, `supabase/migrations/202609290001_saff.sql`. The repo has no Supabase CLI config; the README says to paste the file into the SQL Editor once on a fresh project. Put schema changes in a **new** timestamped migration file, and also update `tests/database.test.ts`, which loads that single file by name.
- **Security model.** `authenticated` has `SELECT` only on `prayer_records`, with RLS allowing its own rows or `public.shares_circle(user_id)`. Its only direct write is to its own `push_subscriptions` rows, which `saff.tsx` upserts. All other access goes through `security definer` RPCs that use `set search_path=''`, so names inside function bodies must be fully qualified (`public.…`). The migration runs `revoke execute on all functions` and then grants a fixed list. **A new RPC needs its own `grant execute … to authenticated`.**
- **Settings shape.** Profile settings are a single `jsonb` value whose shape is defined in four places that must stay in sync: `Settings`/`DEFAULT_SETTINGS` in `domain.ts`, the `profiles.settings` column default in the migration, the validation in `save_settings` (including the allowlists for `method` and for `offset` ∈ {0, 5, 15, 30}), and the e2e fixture state.
- **Visibility rules.** Joining a circle shares your past history too. Leaving revokes access unless another circle is shared. When the owner leaves, ownership passes to the oldest member and the invite code rotates. The README's "Data and visibility" section describes these rules and `tests/database.test.ts` covers them.
- **PGlite compatibility.** The DB tests run the migration under PGlite with stubs for `auth.users`, `auth.uid()` (read from `request.jwt.claim.sub`), the `anon`/`authenticated`/`service_role` roles, and the `supabase_realtime` publication. Keep migrations PGlite-compatible, with nothing that depends on pg_cron, pg_net, or Vault. The cron setup lives in the README for this reason.

### Reminders and nudges

- `src/app/api/jobs/reminders/route.ts` runs on the Node runtime, expects `Authorization: Bearer $CRON_SECRET`, and uses a service-role client. Supabase Cron is meant to call it every minute. Each run:
  1. computes today's and tomorrow's times for every profile with `domain.prayerTimes`;
  2. upserts `prayer_schedule`;
  3. enqueues `notification_jobs` (unique per user, date, prayer, and kind);
  4. claims jobs with `claim_notification_jobs()` (5-minute lease, at most 3 attempts);
  5. re-checks preferences, shared circle membership, and whether the prayer is already recorded;
  6. sends Web Push and deletes subscriptions that return 404 or 410.
- **`send_nudge` depends on `prayer_schedule` rows written by the worker.** If the worker is not running, every nudge fails with "Prayer times are being prepared".
- `save_settings` deletes the user's schedule and pending scheduled jobs, and the next worker run rebuilds them.
- `public/sw.js` only shows push notifications and handles clicks on them. It caches nothing.
- `supabase/functions/reminders` is an optional Deno bridge to the worker. tsconfig excludes it.

### E2E fixture

`tests/e2e/supabase-fixture.ts` intercepts every request to `https://saff-test.supabase.co/**`, puts a fake session in localStorage, and stubs the Realtime websocket. It keeps an in-memory copy of the RPC contract for `get_dashboard`, `set_prayer`, `save_settings`, `create_circle`, and `set_circle_goal`. **Any other request throws `Unexpected Supabase request`**, so add new RPCs to the fixture, and update it whenever the shape of `get_dashboard` changes.

## Environment

The variables are listed in `.env.example`.

- Public, inlined at build time (rebuild after changing): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (the legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` still works), `NEXT_PUBLIC_VAPID_PUBLIC_KEY`.
- Server-only, used by the reminder worker: `SUPABASE_SERVICE_ROLE_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `CRON_SECRET`.
