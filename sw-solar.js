const CACHE_NAME = "solar-KILL-v1"; // 🔥 change name to force update

self.addEventListener("install", event => {
  self.skipWaiting(); // old SW നെ force ആയി replace ചെയ്യും
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => caches.delete(key)) // 🔥 all old caches deleted
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: always go to network (no cache)
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});