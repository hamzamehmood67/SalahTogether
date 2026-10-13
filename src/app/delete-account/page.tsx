import type { Metadata } from "next";
export const metadata: Metadata = { title: "Delete your account · Saff" };
const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
// Public page for app-store listings that require a web route to account deletion.
export default function DeleteAccount() {
  return (
    <main className="doc-page">
      <a href="/" className="doc-back">
        ← Back to Saff
      </a>
      <h1>Delete your Saff account</h1>
      <p>You can delete your account and its data yourself at any time:</p>
      <ol>
        <li>
          Open <a href="/">Saff</a> and sign in with your email address.
        </li>
        <li>
          Open Settings. On a phone, tap your city at the top of Today, then the
          gear button. On a computer, click the gear at the top right or your
          name in the sidebar.
        </li>
        <li>Choose Delete account.</li>
        <li>Type DELETE and confirm.</li>
      </ol>
      <h2>What is deleted</h2>
      <p>
        Your profile, email address, name, location settings, prayer records,
        circle memberships, notification settings and device registrations are
        deleted straight away. Circles you own pass to their longest-standing
        member, and circles with no other members are deleted. Nudges you sent
        stay on record without your name.
      </p>
      <p>
        Copies in our database provider’s backups expire on that provider’s
        schedule. Deletion cannot be undone.
      </p>
      {contact && (
        <>
          <h2>Can’t sign in?</h2>
          <p>
            Email <a href={"mailto:" + contact}>{contact}</a> from the address
            you use with Saff and we will delete the account for you.
          </p>
        </>
      )}
      <p className="muted">
        See the <a href="/privacy">privacy policy</a> for details.
      </p>
    </main>
  );
}
