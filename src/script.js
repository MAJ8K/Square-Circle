if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js")
    .then(registration => {})
    .catch(err => {
        console.error("SW Registration Fail");
        console.error(err);
    });
} else console.error(
        'app not supported SW not in navigator'
    );