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


self.addEventListener("push", (event) => {
  const data = event.data?.json?.() || { title: "Hi", message: "" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "/logo.png",
    })
  );
});


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


serwist.addEventListeners();
