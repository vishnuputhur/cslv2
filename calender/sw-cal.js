const CACHE_NAME = 'cal-v3'; // അടുത്ത തവണ മാറ്റം വരുത്തുമ്പോൾ v4 ആക്കുക
const ASSETS = [
  'index.html',
  'manifest-cal.json',
  'cal-icon-192.png',
  'icon-512.png'
];

// 1. പുതിയ ഫയലുകൾ ബാക്ക്ഗ്രൗണ്ടിൽ ഡൗൺലോഡ് ചെയ്യാനും പഴയതിനെ ഉടൻ മാറ്റാനും
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. ആക്റ്റീവ് ആകുമ്പോൾ പഴയ കേച്ച് ഫയലുകൾ ഡിലീറ്റ് ചെയ്യാനും ആപ്പിന്റെ നിയന്ത്രണം ഏറ്റെടുക്കാനും
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Old calendar cache cleared');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); 
});

// 3. ഓഫ്‌ലൈൻ ആയിരിക്കുമ്പോൾ ഫയലുകൾ കേച്ചിൽ നിന്ന് നൽകാൻ
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
