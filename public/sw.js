self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(
      data.title || "A little moment for salah",
      {
        body: data.body || "Take a moment for your next prayer.",
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: data.tag || "saff-reminder",
        data: { url: "/" },
      },
    ),
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        const existing = windows.find(
          (w) => new URL(w.url).origin === self.location.origin,
        );
        return existing ? existing.focus() : clients.openWindow("/");
      }),
  );
});
