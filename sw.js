// Praan Kheti — AI Crop Health Guardian Service Worker
// Handles PWA installation, Web Push Notifications, and Action Button Clicks

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for Web Push events or simulated push messages from the client
self.addEventListener('push', (event) => {
  let payload = {
    title: 'Praan Kheti AI Guardian Alert',
    body: 'New crop health or weather risk detected on your farm.',
    priority: 'Warning',
    tag: 'praan-kheti-alert',
    url: '/#alerts',
  };

  if (event.data) {
    try {
      payload = { ...payload, ...event.data.json() };
    } catch {
      payload.body = event.data.text();
    }
  }

  const isCritical = payload.priority === 'Critical' || payload.priority === 'High Risk';

  const options = {
    body: payload.body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: payload.tag || 'praan-kheti-alert',
    renotify: true,
    requireInteraction: isCritical,
    vibrate: isCritical ? [300, 120, 300, 120, 450] : [180, 100, 180],
    data: {
      url: payload.url || '/',
      alertId: payload.alertId || null,
    },
    actions: [
      { action: 'view_farm', title: '🌱 View Farm' },
      { action: 'scan_now', title: '📷 Scan Now' },
      { action: 'mark_complete', title: '✅ Mark Complete' },
    ],
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

// Handle direct notification click or action button click on Android / Desktop
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const clickedAction = event.action || 'view_farm';
  const alertId = event.notification.data ? event.notification.data.alertId : null;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.postMessage({
            type: 'PRAAN_KHETI_NOTIFICATION_ACTION',
            action: clickedAction,
            alertId,
          });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});
