// app/sw.ts
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

serwist.addEventListeners();

// robust fetch handler (always returns a Response)
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    // try cache first
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      // try network
      const networkResp = await fetch(event.request);
      return networkResp;
    } catch (err) {
      // fallback for navigation requests
      if (event.request.destination === "document") {
        const fallback = await caches.match("/offline");
        if (fallback) return fallback;
      }
      // default closed response instead of undefined
      return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
    }
  })());
});

// Push listener: receives push even when app closed
self.addEventListener("push", (event) => {
  console.log(event.data?.json?.())
  const data = event.data?.json?.() || { title: "Notification", body: "" };
  const title = data.title || "Attention";
  const options: NotificationOptions = {
    body: data.body,
    data: data,
    // optionally add icon, badge etc
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // open app and navigate to a specific page
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ includeUncontrolled: true });
      const client = allClients.length ? allClients[0] : null;
      if (client) {
        (client as WindowClient).focus();
        client.postMessage({ type: "notification-click", payload: event.notification.data });
      } else {
        self.clients.openWindow("/");
      }
    })()
  );
});
