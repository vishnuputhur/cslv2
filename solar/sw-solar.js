const CACHE_NAME = 'solar-v5'; // അടുത്ത മാറ്റത്തിൽ ഇത് v4 ആക്കി മാറ്റുക
const ASSETS = [
  'index.html',
  'manifest-solar.json',
  'solar-icon-192.png'
];

// 1. ഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ പുതിയ ഫയലുകൾ ഉടൻ ഡൗൺലോഡ് ചെയ്യാനും പഴയതിനെ മറികടക്കാനും
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. ആക്റ്റീവ് ആകുമ്പോൾ പഴയ വേർഷൻ ഫയലുകൾ ഡിലീറ്റ് ചെയ്യാനും നിയന്ത്രണം ഏറ്റെടുക്കാനും
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Old solar cache cleared');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); 
});

// 3. ഫയലുകൾ ആവശ്യപ്പെടുമ്പോൾ ക്യാഷിൽ ഉണ്ടോ എന്ന് നോക്കാൻ
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
