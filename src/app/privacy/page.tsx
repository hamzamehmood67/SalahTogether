import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy policy · Saff" };
const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
// Keep this page in step with what the schema and reminder worker actually store and share.
export default function Privacy() {
  return (
    <main className="doc-page">
      <a href="/" className="doc-back">
        ← Back to Saff
      </a>
      <h1>Privacy policy</h1>
      <p className="muted">Last updated 13 October 2026</p>
      <p>
        Saff is a prayer tracker you can share with family and friends. This
        page explains what Saff stores, who can see it, and how to remove it.
      </p>
      <h2>What we store</h2>
      <ul>
        <li>
          <strong>Your email address</strong>, to send you sign-in codes and
          links.
        </li>
        <li>
          <strong>The name you choose</strong>, shown to people in your circles.
        </li>
        <li>
          <strong>Your prayer location settings</strong>: a city label, latitude
          and longitude (precise if you choose “Use my current location”), time
          zone, calculation method and Asr preference. These are used only to
          calculate prayer times and send reminders.
        </li>
        <li>
          <strong>Your prayer records</strong>: which of the five daily prayers
          you marked, on which date.
        </li>
        <li>
          <strong>Circles</strong> you create or join, their names, members,
          monthly goals and invite codes.
        </li>
        <li>
          <strong>Notification settings</strong>, and for each device where you
          turn notifications on, the push address your browser provides. We also
          keep your upcoming prayer times and a record of reminders and gentle
          nudges so each is sent once.
        </li>
      </ul>
      <p>
        Your browser keeps your sign-in session, and any invite you opened
        before signing in, in local storage. Saff has no advertising, analytics
        or tracking cookies, and we do not sell your data. Our hosting and
        database providers may keep standard technical logs, such as IP
        addresses, for security and operations.
      </p>
      <h2>Who can see it</h2>
      <p>
        Your data is private unless you share a circle with someone. When you
        create or join a circle, its members can see your name, your whole
        prayer history (including days before you joined), the streaks and
        milestones calculated from it, whether you accept gentle nudges, and
        your current date, which can hint at your time zone. They cannot see
        your email address, location, coordinates or notification settings.
      </p>
      <p>
        Anyone with a circle’s invite code or link can join it, so share it only
        with people you trust. When you leave a circle, its members lose access
        to your records unless you still share another circle with them.
      </p>
      <h2>Services we use</h2>
      <ul>
        <li>
          <strong>Supabase</strong> hosts the database and handles sign-in.
        </li>
        <li>
          <strong>Our web hosting provider</strong> runs the app and the
          reminder service.
        </li>
        <li>
          <strong>Our email provider</strong> delivers sign-in emails.
        </li>
        <li>
          <strong>Your browser’s push service</strong> (for example Google,
          Mozilla or Apple) delivers notifications. A notification contains a
          prayer name and, for a nudge, the sender’s name in Saff.
        </li>
      </ul>
      <h2>Your choices</h2>
      <ul>
        <li>Change your name and location in Settings at any time.</li>
        <li>
          Turn reminders, nudges, or notifications on a particular device on or
          off in Settings.
        </li>
        <li>Leave any circle from Manage circles.</li>
        <li>
          Delete your account from Settings → Delete account. See{" "}
          <a href="/delete-account">how account deletion works</a>.
        </li>
      </ul>
      <h2>How long we keep it</h2>
      <p>
        We keep your data while your account exists. Deleting your account
        removes your profile, email address, prayer records, circle memberships,
        notification settings and device registrations. Circles you own pass to
        their longest-standing member, and circles with no other members are
        deleted. Copies in our database provider’s backups expire on that
        provider’s schedule.
      </p>
      <h2>Changes</h2>
      <p>
        If this policy changes, we will update this page and the date at the
        top.
      </p>
      {contact && (
        <>
          <h2>Contact</h2>
          <p>
            Questions or requests: <a href={"mailto:" + contact}>{contact}</a>
          </p>
        </>
      )}
    </main>
  );
}
