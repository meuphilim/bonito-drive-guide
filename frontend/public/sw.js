const CACHE_NAME = 'ecoexpedicoes-v1.0.0';
const STATIC_CACHE = 'ecoexpedicoes-static-v1.0.0';
const API_CACHE = 'ecoexpedicoes-api-v1.0.0';
const IMAGE_CACHE = 'ecoexpedicoes-images-v1.0.0';

// Files to cache immediately
const CORE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/main.css',
  '/static/js/main.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/attractions',
  '/api/status'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        console.log('[ServiceWorker] Caching core files');
        await cache.addAll(CORE_FILES);
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('[ServiceWorker] Install failed:', error);
      }
    })()
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(cacheName => 
            cacheName !== CACHE_NAME && 
            cacheName !== STATIC_CACHE &&
            cacheName !== API_CACHE &&
            cacheName !== IMAGE_CACHE
          )
          .map(cacheName => {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          });
        
        await Promise.all(deletePromises);
        
        // Take control of all pages immediately
        self.clients.claim();
      } catch (error) {
        console.error('[ServiceWorker] Activate failed:', error);
      }
    })()
  );
});

// Fetch event - network strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    if (url.pathname.startsWith('/api/')) {
      // API requests - Network First with cache fallback
      event.respondWith(networkFirstStrategy(request, API_CACHE));
    } else if (isImageRequest(request)) {
      // Images - Cache First with network fallback
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    } else if (isStaticAsset(request)) {
      // Static assets - Cache First
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    } else {
      // HTML/Navigation - Network First with cache fallback
      event.respondWith(networkFirstWithOfflinePage(request));
    }
  }
});

// Network First Strategy (for API calls)
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[ServiceWorker] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for API
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'Dados não disponíveis offline',
        offline: true 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 503
      }
    );
  }
}

// Cache First Strategy (for images and static assets)
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[ServiceWorker] Cache and network failed:', error);
    
    // Return placeholder for images
    if (isImageRequest(request)) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#e5e5e5"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Imagem indisponível</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

// Network First with Offline Page
async function networkFirstWithOfflinePage(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return main app for navigation requests
    return caches.match('/');
  }
}

// Helper functions
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(request.url);
}

function isStaticAsset(request) {
  return request.destination === 'script' || 
         request.destination === 'style' ||
         /\.(js|css|woff|woff2|ttf|eot)$/i.test(request.url);
}

// Background sync for data updates (when supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-attractions') {
    console.log('[ServiceWorker] Background sync: attractions');
    event.waitUntil(syncAttractions());
  }
});

async function syncAttractions() {
  try {
    const response = await fetch('/api/attractions');
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put('/api/attractions', response);
      console.log('[ServiceWorker] Attractions synced in background');
    }
  } catch (error) {
    console.error('[ServiceWorker] Background sync failed:', error);
  }
}

// Push notification handling (for future features)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nova informação disponível',
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      tag: 'bonito-notification',
      requireInteraction: true,
      actions: [
        { action: 'open', title: 'Abrir App' },
        { action: 'close', title: 'Fechar' }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Bonito Guide', options)
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});