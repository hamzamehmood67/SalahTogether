import { redirect } from "next/navigation";
// Shareable invite links land in the app, which keeps the code through sign-in.
export default async function Join({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  redirect(
    "/?join=" + encodeURIComponent(code.trim().toUpperCase().slice(0, 12)),
  );
}
