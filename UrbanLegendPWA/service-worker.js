const CACHE_NAME = "akai-onepiece-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/city-bg.png",
  "./assets/evidence-tunnel.png",
  "./assets/evidence-memo.png",
  "./assets/evidence-doll.png",
  "./assets/icon-1024.png",
  "./assets/evidence-contact.png",
  "./assets/evidence-logbook.png",
  "./assets/evidence-door.png",
  "./assets/evidence-tape.png",
  "./assets/evidence-map.png",
  "./assets/evidence-board.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});


