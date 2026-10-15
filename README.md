# Saff — Salah Circles

A mobile-first prayer tracker based on the supplied Saff designs. Next.js, React, TypeScript, Tailwind CSS, Motion, Adhan, and Supabase/PostgreSQL. The reference SVG artwork and fonts are bundled locally.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Visitors see the welcome screen and sign in with a code (or link) sent by email, then set their name and prayer location. Supabase must be configured before sign-in is available. New accounts start with no prayer history, circles, or achievements. Old browser demo data is discarded, never uploaded. The design's colors, fonts, and animations remain unchanged.

## Connect your backend

1. **Create a Supabase project.** In its SQL Editor, run each file in [`supabase/migrations`](supabase/migrations) once, in filename order, on a fresh project: first [`202609290001_saff.sql`](supabase/migrations/202609290001_saff.sql) (tables, signup trigger, permissions, RPCs, prayer-record Realtime publication), then [`202610130001_mvp.sql`](supabase/migrations/202610130001_mvp.sql) (first-run flag, account deletion, device hand-over for push), then [`202610150001_circle_admin.sql`](supabase/migrations/202610150001_circle_admin.sql) (the circle admin decides whether members can invite). None inserts sample prayers or circles. On an existing project, run only the files it does not have yet, in order. Never rerun a file that has already been applied.
2. **Connect the app.** From the project's **Connect** dialog, copy the project URL and publishable key (`sb_publishable_...`; a legacy anon key also works). Create `.env.local` in this repository's root:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```

   The legacy variable `NEXT_PUBLIC_SUPABASE_ANON_KEY` remains supported. Use a publishable/anon key here, never a secret or service-role key. Core tracking does not require the service-role key.

3. **Configure email sign-in.** Under Authentication, enable the Email provider and allow new users to sign up. In **URL Configuration**, set Site URL to `http://localhost:3000` for local development and add `http://localhost:3000` to Redirect URLs. If you browse through `http://127.0.0.1:3000`, add that exact origin too. For phone testing over your LAN, add the computer's LAN origin including the port and open the app at that address. For production, change Site URL to the deployed HTTPS origin and add that origin to Redirect URLs. Keep the default magic-link email template using `{{ .ConfirmationURL }}`.
4. **Use the Saff email templates.** Under Authentication → Emails, paste [`supabase/templates/magic-link.html`](supabase/templates/magic-link.html) into **Magic Link** (subject: `Your Saff sign-in code`) and [`supabase/templates/confirm-signup.html`](supabase/templates/confirm-signup.html) into **Confirm signup** (subject: `Welcome to Saff: your sign-in code`); new accounts receive the second. Both show the code (`{{ .Token }}`) and a sign-in button (`{{ .ConfirmationURL }}`), and load the app icon from `{{ .SiteURL }}/icon-192.png`, so set the Site URL first.

   The app accepts the code in the sign-in sheet; the link still works. Codes from an installed phone app and from Android must be typed, because a link opens in the default browser.

5. **Set up email delivery.** Supabase's default sender only delivers to project-team email addresses and has restrictive test limits. Configure custom SMTP under Authentication before inviting family/friends. This is required for external users, even during an MVP pilot. Use your SMTP provider's verified sender, host, port, username, and password. [Official SMTP guide](https://supabase.com/docs/guides/auth/auth-smtp) · [Email-link sign-in](https://supabase.com/docs/guides/auth/auth-email-passwordless) · [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).
6. **Restart and sign in.** Restart `npm run dev`, choose **Continue individually**, enter your email, and type the code from the email (or open its link). A first-run sheet asks for your name and location; the defaults are Lahore, Karachi calculation method, and Hanafi Asr. Record a prayer, reload, and confirm it remains. Then create a circle, open its **⋯ → Invite to …** on the Circles tab, and open the invite link from a second account to verify sharing.
7. **Deploy when ready.** Set the same public environment variables on your Node-capable host before building. Public variables are bundled at build time, so rebuild after changing them. For reminders, complete the optional setup below.

There is no Supabase seed data to delete. The former sample history existed only in browser storage. If you manually created test users or records in a hosted project, review those separately before deleting anything.

## Deploy to your own server

Requirements: Node.js 20.9 or newer, a domain pointed at the server, and HTTPS (push notifications and installation require it). The `deploy/` folder has a ready setup for a Linux server with systemd, [Caddy](https://caddyserver.com) for automatic HTTPS, and cron; any other HTTPS reverse proxy or process manager works too.

1. **Install and build** as a dedicated `saff` user in `/opt/saff`:

   ```sh
   sudo useradd --system --create-home saff
   sudo git clone <repository> /opt/saff && sudo chown -R saff: /opt/saff
   cd /opt/saff
   sudo -u saff cp .env.example .env.local   # fill in every value, then: chmod 600 .env.local
   sudo -u saff npm ci
   sudo -u saff npm run build
   ```

   Use the same VAPID keys as before; browsers' existing push subscriptions are tied to the public key. Set `NEXT_PUBLIC_CONTACT_EMAIL` for `/privacy` and `/delete-account`. Rebuild whenever a `NEXT_PUBLIC_*` value changes, because they are inlined at build time.

2. **Run the app** on `127.0.0.1:3000`: copy `deploy/saff.service` to `/etc/systemd/system/`, then `sudo systemctl enable --now saff`.
3. **Serve HTTPS**: put your domain in `deploy/Caddyfile`, copy it to `/etc/caddy/Caddyfile`, and `sudo systemctl reload caddy`.
4. **Trigger reminders every minute**: copy `deploy/saff-reminders.cron` to `/etc/cron.d/saff-reminders`. It runs `deploy/run-reminders.sh`, which reads `CRON_SECRET` from `.env.local` and calls the worker locally. Without it, reminders never send and every nudge fails with “Prayer times are being prepared”. (Supabase Cron, below, is an alternative.)
5. **Point Supabase at the domain**: in Authentication → URL Configuration, set Site URL to the HTTPS origin and add it to Redirect URLs.
6. **Smoke test** with two accounts: sign in by code, finish setup, record a prayer, share an invite link, join from the second account, enable notifications, and send a nudge.

To ship an update later, run `deploy/update.sh` as the `saff` user (it pulls, installs, builds, and restarts; requests may fail briefly during the build).

For the Play Store listing, use `https://YOUR_DOMAIN/privacy` as the privacy policy and `https://YOUR_DOMAIN/delete-account` as the account deletion URL.

## Push and background reminders

Generate a VAPID pair using `npx web-push generate-vapid-keys`. Set `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `SUPABASE_SERVICE_ROLE_KEY`, and a random `CRON_SECRET` in the web host. Use an HTTPS origin in production. After first-run setup, each account is offered notifications once per device; accepting registers the device and turns on reminders for all five prayers and gentle nudges. They can be changed later in Settings (device notifications, prayers, reminder offset, nudges).

Invoke `GET /api/jobs/reminders` every minute with `Authorization: Bearer <CRON_SECRET>`. Use Supabase Cron with pg_net, keeping the URL and secret in Supabase Vault; do not commit real values:

```sql
-- Create Vault secrets named saff_site_url and saff_cron_secret first.
select cron.schedule('saff-reminders', '* * * * *', $$
  select net.http_get(
    url := (select decrypted_secret from vault.decrypted_secrets where name='saff_site_url') || '/api/jobs/reminders',
    headers := jsonb_build_object('Authorization', 'Bearer ' ||
      (select decrypted_secret from vault.decrypted_secrets where name='saff_cron_secret'))
  );
$$);
```

Enable the Cron/pg_cron, pg_net, and Vault extensions first. An optional Edge Function bridge is provided in `supabase/functions/reminders`; deploy it with platform JWT verification disabled only when using its mandatory `CRON_SECRET` check, then schedule it with that bearer secret. Direct scheduling of the web endpoint is sufficient.

The worker calculates current/next-day times, creates unique delivery jobs, claims jobs with recoverable leases, respects current recipient preferences and circle membership, skips recorded prayers and stale reminders, retries transient failures, and removes expired subscriptions. Device delivery is best effort. The same prayer tag collapses duplicate browser notifications. Monitor worker responses and `notification_jobs` (`status`, `attempts`, `last_error`). This initial worker is intended for a small pilot; batch profiles and move scheduling into a dedicated queue before significant scale.

## Data and visibility

Authenticated RPCs are the shared interface for web and future Android: `get_dashboard`, `save_settings`, `set_prayer`, `create_circle`, `join_circle`, `leave_circle`, `set_circle_goal`, `set_circle_invites`, `reset_circle_code`, `send_nudge`, `register_push_subscription`, and `delete_account`. Prayer writes are idempotent by user, local date, and prayer. PostgreSQL owns the data and permissions; the UI derives progress from those records. No client can award itself persisted achievements.

Prayer history becomes visible to current circle members immediately upon joining, including prior history. Outside shared circles it stays private. Profiles, location, push subscriptions, and notification preferences are never generally readable. The circle view exposes only whether a gentle nudge is available. Leaving revokes access through that circle; other shared circles still grant access. If the owner leaves, ownership moves to the oldest remaining member and the invite code rotates; an empty circle is deleted. Invite links (`/join/CODE`) carry the same code, so anyone holding one can join. A person may create or join any number of circles. The circle's owner, shown as its admin, is the only member who sees the code unless they turn on **Members can invite**; turning that off, or choosing **Reset invite code**, issues a new code so links already passed on stop working. Deleting an account leaves every circle under the same rules, then removes the profile, records, memberships, and device registrations. Signing out removes this device's push registration; a device left registered by another account is reassigned when the new account enables notifications.

Progress is derived from current records, so correcting a prayer updates badges and streaks. Personal streaks use local calendar dates. A year badge means 365 consecutive dates with at least one record. An unfinished current day does not break yesterday’s streak. Group goal totals use the displayed calendar month. Streak badges remain earned when a later streak breaks, provided the qualifying history remains recorded. Circle Unity checks shared full dates across members; it is derived from history rather than a separate award ledger.

## Verification

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright uses locally installed Google Chrome. Alternatively install Playwright Chromium and remove `channel: 'chrome'` from its config. Browser tests use a separate server on port 3100 and intercept Supabase requests with test-only fixtures. They cover sign-in gating, removal of legacy demo storage, empty accounts, load failures/retry, sign-out, mobile/desktop overflow, navigation, persistence, circle creation, goals, and settings. They do not contact your hosted database. For production, additionally test the migration against your Supabase staging project with two members, an outsider, and overlapping circles; verify direct read denial, leaving, duplicate nudges, and worker retry behavior.

## MVP boundaries

English UI with Arabic prayer labels; online authenticated writes; no demo workspace. Public `/privacy` and `/delete-account` pages are included. No billing, chat, full offline synchronization, or native Android client. Installable manifest and a push service worker are included, without caching private API data. Backend credentials and a deployed scheduler are required for actual authentication, shared multi-user data, and delivered notifications. Nothing is deployed by the repository itself.

## Original design fidelity

The five mobile screens in `src/components/reference` are React ports of the supplied HTML, preserving its SVG definitions, font files, colors, dimensions, easing curves, and animation durations. `original.css` scopes the original rules per screen; `responsive.css` only adapts viewport sizes, safe areas, dialog stacking, and desktop composition. Application data and actions are bound in `saff.tsx`.

Two deliberate departures live in `scripts/port-reference.py`, so a re-import keeps them: the circle screen's back arrow returns to the circles list, and Insights opens on the current week (Monday to Sunday) with a Week / Month switch where the design shows a "12-month record" pill. The arrows step back a week or a month at a time, and the year grid opens any of the last 12 months.

To re-import an updated copy of the same design format:

```sh
python3 scripts/port-reference.py '/path/to/Saff — Salah Circles.html'
node scripts/scope-reference-css.mjs
npx prettier --write src/components/reference/*.tsx
```

To compare against the original file in Chrome:

```sh
SAFF_REFERENCE_FILE='/path/to/Saff — Salah Circles.html' npm run test:e2e
```

This captures all five original and implemented screens to `/tmp`, compares actual computed prayer-card styling, and checks animation timings and reduced-motion behavior. Counts, prayer times, dates, and member details continue to come from application data. The main milestone grid follows the reference’s nine-card arrangement; extra cumulative achievements remain available in member details. The seventh badge uses the previously agreed cumulative-prayer milestone rather than attributing another person’s prayer to a nudge.
