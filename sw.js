self.addEventListener('install', e =>{
    e.waitUntil( caches.open("static").then(cache => {
        return cache.addAll([
            "./index.html","./layout.css",
            "./Img/logo192.png","./Img/logo512.png",
            "./src/script.js","./src/matter.min.js",
            "./sw.js","./manifest.json"
        ]);
    }));
    console.info("Service Worker installed");
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
    }));
});