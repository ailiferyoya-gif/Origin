const CACHE_NAME = "detective-murder-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/scene-study.png",
  "./assets/evidence-opener.png",
  "./assets/evidence-glass.png",
  "./assets/evidence-letter.png",
  "./assets/evidence-watch.png",
  "./assets/evidence-board.png",
  "./assets/evidence-footprint.png",
  "./assets/evidence-ticket.png",
  "./assets/suspect-secretary.png",
  "./assets/suspect-housekeeper.png",
  "./assets/suspect-nephew.png",
  "./assets/suspect-doctor.png",
  "./assets/suspect-gardener.png",
  "./assets/suspect-actress.png",
  "./assets/suspect-dealer.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
