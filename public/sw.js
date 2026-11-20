const CACHE_NAME = 'dzikirku-v65';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  /* __DYNAMIC_ASSETS__ */
];

// Precache all core assets on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // 1. Precache explicit static assets
      await cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[SW] Some initial assets failed to precache:', err);
      });

      // 2. Auto-discover script & stylesheet tags in index.html to guarantee 100% offline coverage
      try {
        const htmlResponse = (await cache.match('./index.html')) || (await fetch('./index.html'));
        if (htmlResponse) {
          const htmlText = await htmlResponse.clone().text();
          const assetMatches = Array.from(htmlText.matchAll(/(?:src|href)=["'](\.\/assets\/[^"']+)["']/g));
          const dynamicAssets = assetMatches.map((m) => m[1]);
          if (dynamicAssets.length > 0) {
            await cache.addAll(dynamicAssets).catch((err) => {
              console.warn('[SW] Dynamic bundle precache warning:', err);
            });
          }
        }
      } catch (err) {
        console.warn('[SW] Auto-discovery of assets warning:', err);
      }
    })()
  );
  self.skipWaiting();
});

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. App navigation (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Network first: try to fetch freshest version online
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          // Offline fallback: try request URL, index.html, root, scope
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse =
            (await cache.match(event.request)) ||
            (await cache.match('./index.html')) ||
            (await cache.match('./')) ||
            (await cache.match(self.registration.scope));

          if (cachedResponse) return cachedResponse;

          // Ultimate search across cached keys
          const keys = await cache.keys();
          for (const key of keys) {
            if (key.url.endsWith('/index.html') || key.url.endsWith('/')) {
              const res = await cache.match(key);
              if (res) return res;
            }
          }

          return new Response(
            '<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#EAECE7;color:#183B28;"><h2>DzikirKu Offline</h2><p>Buka aplikasi sekali saat online untuk mengaktifkan mode offline penuh.</p></body></html>',
            {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
          );
        }
      })()
    );
    return;
  }

  // 2. Same-origin assets AND Google Fonts (offline typography)
  const isGoogleFont =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com';

  if (url.origin === self.location.origin || isGoogleFont) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        // Check cache first
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // Stale-while-revalidate in background if online
          fetch(event.request)
            .then((networkResponse) => {
              if (
                networkResponse &&
                (networkResponse.status === 200 || networkResponse.type === 'opaque')
              ) {
                cache.put(event.request, networkResponse.clone());
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Not in cache: fetch from network
        try {
          const networkResponse = await fetch(event.request);
          if (
            networkResponse &&
            (networkResponse.status === 200 || networkResponse.type === 'opaque')
          ) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          // Offline fallback: try fuzzy matching by filename
          const filename = url.pathname.split('/').pop();
          if (filename) {
            const keys = await cache.keys();
            for (const key of keys) {
              if (key.url.endsWith('/' + filename)) {
                const fuzzyResponse = await cache.match(key);
                if (fuzzyResponse) return fuzzyResponse;
              }
            }
          }
          return new Response('', { status: 408 });
        }
      })()
    );
  }
});
