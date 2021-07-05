const registerServiceWorker = async () => {
  try {
    console.log('registering service worker...')
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('sw.js')
    } else {
      console.log('service worker is not supported in this browser!')
    }
  } catch (error) {
    console.log(error)
  }
}

export default registerServiceWorker
