self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', () => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(
      caches.open('fe-static-v1').then(async (cache) => {
        const cached = await cache.match(e.request);
        const fetched = fetch(e.request).then((res) => {
          if (res.ok && e.request.method === 'GET') cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
  }
});