import 'regenerator-runtime'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { precacheAndRoute } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

// stale while revalidate assets
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker' ||
    request.destination === 'image',

  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      // limit caching to 100 items and set expiration for 3 days
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 3
      })
    ]
  })
)

registerRoute(
  ({ url }) => {
    return (
      url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://restaurant-api.dicoding.dev' ||
      // url.origin === "https://use.fontawesome.com" ||
      url.origin === 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' ||
      url.pathname === '/detail' ||
      url.pathname === '/list' ||
      url.pathname === '/'
    )
  },
  new StaleWhileRevalidate({
    cacheName: 'url',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 3 })
    ]
  })
)

precacheAndRoute(self.__WB_MANIFEST)
