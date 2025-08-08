const CACHE = 'fe-static-v3';

self.addEventListener('install', (e) => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // HTML için network-first: her deploy'da yeni CSS/JS gelir
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('/'))
    );
    return;
  }

  // Sadece aynı origin'deki css/js/img/font'u cache'le
  const ok = req.method === 'GET'
    && url.origin === location.origin
    && ['style','script','image','font'].includes(req.destination);

  if (!ok) return;

  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const fetched = fetch(req).then(res => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});