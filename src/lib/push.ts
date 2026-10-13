import type { SupabaseClient } from "@supabase/supabase-js";
// This browser's Web Push subscription, as seen by the signed-in account.
export type PushState = "unsupported" | "blocked" | "off" | "on";
function supported() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}
async function subscription() {
  if (!supported()) return null;
  const registration = await navigator.serviceWorker.getRegistration();
  return (await registration?.pushManager.getSubscription()) ?? null;
}
export async function pushState(client: SupabaseClient): Promise<PushState> {
  if (!supported()) return "unsupported";
  if (Notification.permission === "denied") return "blocked";
  const sub = await subscription();
  if (!sub) return "off";
  // RLS only returns our own rows, so a device left registered to someone else reads as off.
  const { data } = await client
    .from("push_subscriptions")
    .select("id")
    .eq("endpoint", sub.endpoint);
  return data?.length ? "on" : "off";
}
function decodeKey(key: string) {
  const base64 = (key + "=".repeat((4 - (key.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
export async function enablePush(client: SupabaseClient) {
  if (!supported())
    throw new Error(
      "This browser does not support push. On iPhone, install Saff to your home screen first.",
    );
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) throw new Error("Push notifications have not been configured yet.");
  const permission = await Notification.requestPermission();
  if (permission !== "granted")
    throw new Error(
      "Notifications are not enabled. Your tracker still works normally.",
    );
  const registration = await navigator.serviceWorker.ready;
  const sub =
    (await registration.pushManager.getSubscription()) ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: decodeKey(key),
    }));
  const { error } = await client.rpc("register_push_subscription", {
    p_endpoint: sub.endpoint,
    p_subscription: sub.toJSON(),
  });
  if (error) throw error;
}
export async function disablePush(client: SupabaseClient) {
  const sub = await subscription();
  if (!sub) return;
  try {
    await client
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", sub.endpoint);
  } finally {
    // Unsubscribing alone is enough: the worker drops endpoints that return 410.
    await sub.unsubscribe();
  }
}
// Best effort before signing out, bounded so a slow network never blocks it.
export async function detachDevice(client: SupabaseClient) {
  await Promise.race([
    disablePush(client).catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, 4000)),
  ]);
}
