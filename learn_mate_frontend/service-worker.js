// LearnMate South Sudan - Service Worker for Offline Functionality

const CACHE_NAME = 'learnmate-v1';
const DYNAMIC_CACHE = 'learnmate-dynamic-v1';

// Files to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/app.js',
    '/js/lessons.js',
    '/js/quiz.js',
    '/js/i18n.js',
    '/manifest.json'
];

// ====================
// Install Event
// ====================
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installed successfully');
                return self.skipWaiting(); // Activate immediately
            })
            .catch(err => {
                console.error('[ServiceWorker] Install failed:', err);
            })
    );
});

// ====================
// Activate Event
// ====================
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            // Delete old caches
                            return cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE;
                        })
                        .map(cacheName => {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activated successfully');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// ====================
// Fetch Event - Network First, Fallback to Cache
// ====================
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Different strategies for different types of requests
    if (request.method === 'GET') {
        // For API calls, try network first
        if (url.pathname.startsWith('/api/')) {
            event.respondWith(networkFirstStrategy(request));
        }
        // For static assets, try cache first
        else {
            event.respondWith(cacheFirstStrategy(request));
        }
    }
});

// ====================
// Strategy: Cache First
// ====================
async function cacheFirstStrategy(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('[ServiceWorker] Serving from cache:', request.url);
            return cachedResponse;
        }
        
        // If not in cache, fetch from network
        console.log('[ServiceWorker] Fetching from network:', request.url);
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[ServiceWorker] Fetch failed:', error);
        
        // Return offline page if available
        const offlinePage = await caches.match('/offline.html');
        return offlinePage || new Response('Offline', { 
            status: 503, 
            statusText: 'Service Unavailable' 
        });
    }
}

// ====================
// Strategy: Network First
// ====================
async function networkFirstStrategy(request) {
    try {
        // Try network first
        console.log('[ServiceWorker] Network first for:', request.url);
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[ServiceWorker] Network failed, trying cache:', request.url);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return error response
        return new Response(JSON.stringify({ 
            error: 'Network request failed and no cache available' 
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// ====================
// Background Sync
// ====================
self.addEventListener('sync', event => {
    console.log('[ServiceWorker] Background sync:', event.tag);
    
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    try {
        // Get pending sync data from IndexedDB or storage
        const pendingData = await getPendingSyncData();
        
        if (pendingData && pendingData.length > 0) {
            // Send to server
            for (const item of pendingData) {
                await fetch('/api/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
            }
            
            // Clear pending data
            await clearPendingSyncData();
            console.log('[ServiceWorker] Sync completed');
        }
    } catch (error) {
        console.error('[ServiceWorker] Sync failed:', error);
        throw error; // Retry sync
    }
}

// ====================
// Push Notifications
// ====================
self.addEventListener('push', event => {
    console.log('[ServiceWorker] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('LearnMate', options)
    );
});

// ====================
// Notification Click
// ====================
self.addEventListener('notificationclick', event => {
    console.log('[ServiceWorker] Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ====================
// Message Handler
// ====================
self.addEventListener('message', event => {
    console.log('[ServiceWorker] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then(cache => cache.addAll(event.data.urls))
        );
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.delete(DYNAMIC_CACHE)
                .then(() => caches.open(DYNAMIC_CACHE))
        );
    }
});

// ====================
// Helper Functions
// ====================
async function getPendingSyncData() {
    // This would typically read from IndexedDB
    // For now, returning empty array
    return [];
}

async function clearPendingSyncData() {
    // This would typically clear IndexedDB
    console.log('[ServiceWorker] Clearing pending sync data');
}

// ====================
// Cache Management
// ====================
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        // Delete oldest items
        const itemsToDelete = keys.length - maxItems;
        for (let i = 0; i < itemsToDelete; i++) {
            await cache.delete(keys[i]);
        }
    }
}

// Limit dynamic cache size periodically
setInterval(() => {
    limitCacheSize(DYNAMIC_CACHE, 50);
}, 60000); // Every minute