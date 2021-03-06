const cacheName = "currency-converter";

self.addEventListener("install", event =>
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          "/",
          "/main.css",
          "/main.js",
          "/assets/Endless-Constellation.svg",
          "/assets/logo_goku_kanji_tortuga_maestro_roshi.svg"
        ])
      )
  )
);

// ----- Hijacking fetch requests
self.addEventListener("fetch", event => {
  alert();
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === "/") {
      event.respondWith(caches.match("/"));
      return;
    }
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
