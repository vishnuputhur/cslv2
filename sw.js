const CACHE_NAME = 'csl-calc-v2';

// ഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ ഒന്നും കാഷെ ചെയ്യുന്നില്ല, അതിനാൽ അപ്ഡേറ്റ് പ്രശ്നം ഉണ്ടാവില്ല
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // നെറ്റ്‌വർക്കിൽ നിന്ന് പുതിയ വിവരങ്ങൾ എടുക്കാൻ ശ്രമിക്കുന്നു
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
