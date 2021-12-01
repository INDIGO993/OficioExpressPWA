;
const CACHE_NAME = 'v1_cache_OEX', 
urlsToCache=[
'./',

'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css',
'./estilos.css',
'./script.js',
'./img/macuin4.png',
'./img/macuin3.png'

]


self.addEventListener('install', e=>{
e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache =>{
        return cache.addAll(urlsToCache)
       .then(() => self.skipWaiting())
    })
    .catch(err=> console.log('Fallo registro de cache', err))
)
})



self.addEventListener('activate', e=>{
    const cacheWhitelist=[CACHE_NAME]

e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                cacheNames.map(cacheName =>{
                   
                    if(cacheWhitelist.indexOf(cacheName)===-1){
                        return caches.delete(cacheName)
                    }
                })
                )

    })
    .then(()=>self.clients.claim())
    
)

})


self.addEventListener('fetch', e=>{

    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res
            }
            return fetch(e.request)
        })
)

})