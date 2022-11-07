
const CACHE_NAME = 'version-v1';
const resourcesToCache = [
    '/',
    './index.html',
    './offline.html',
    './images/01.jpg',
    './images/02.jpg',
    './images/icons/icon-48x48.png',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png'
]

const self = this;
//STEPS
//Install Service Worker(SW)
self.addEventListener("install", (event) => {
    console.log("install")

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Cache Opened !");
                return cache.addAll(resourcesToCache)
            })
    );
});


//Listen For requests
self.addEventListener("fetch", (event) => {
    console.log("fetched");

    event.respondWith(
        caches.match(event.request)
            .then(res => {
                console.log('xxxxxxxx', res)
                //when we are online

                fetch(event.request)
                    .then(r => {
                        console.log('yyyyyyyy', r)
                    })
                    //when we offline
                    .catch(err => {
                        console.log('zzzzzzzzzzz', resourcesToCache[1])
                        caches.match(resourcesToCache[1])
                    })
            })
    );
})


// //Activate the SW

self.addEventListener("activate", (event) => {
    console.log("activate")

    //remove previous caches and fresh the cache
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(cachedKeys => Promise.all(
            cachedKeys.map(key => {
                if (!cacheWhiteList.includes(key)) {
                    return caches.delete(key);
                }
            })
        ))

    );
})


const findFiles = () => {

}

// console.log("Main Service Worker In Public Folder")