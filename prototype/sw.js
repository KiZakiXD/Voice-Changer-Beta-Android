// Service worker untuk instalasi PWA Voice-Changer-Beta-Android.
// Cache-first untuk file lokal; Tone.js dari CDN tetap diambil dari jaringan.
const CACHE = "vc-beta-v1";
const ASSETS = ["./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // CDN dibiarkan ke jaringan
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
