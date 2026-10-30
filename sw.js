// NekoVault Service Worker
// Handles browser push notifications without changing the existing in-site notification panel.

self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      body: event.data ? event.data.text() : ""
    };
  }

  const title = data.title || "NekoVault";
  const options = {
    body: data.body || "Ada game baru di NekoVault!",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/",
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.startsWith(self.location.origin) && "focus" in client) {
          if (client.url !== targetUrl && "navigate" in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});
