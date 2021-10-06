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

// URL needs to be promoted to "wss://..."
if(navigator.WebSocket){
    // init a list of player data
} else {
    console.error("WebSocket not supported")
    // set list of player data to null
}
const url = "ws://127.0.0.1:7890";
const ws = new WebSocket(url);

ws.addEventListener('open', e => {
    console.debug("Connection Established");
    ws.send("SC Initialization Message")
});

ws.addEventListener('close', e => {
    console.debug("Connection Ended");
});

ws.addEventListener('message', e => {
    console.debug(e.data);
});


