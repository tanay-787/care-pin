import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

/// 1. Custom push listener (should be registered early)
self.addEventListener("push", (event) => {
  console.log("[SW] Push received:", event);
  const data = event.data?.json?.() || { title: "Hi", message: "" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "/icons/android-chrome-192x192.png",
    })
  );
});

// 2. Notification click handler follows
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked");
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) {
        let client = clients[0];
        clients.forEach((c) => {
          if (c.focused) client = c;
        });
        return client.focus();
      }
      return self.clients.openWindow("/");
    })
  );
});

// // 3. Then Serwist’s handlers
// serwist.addEventListeners();
