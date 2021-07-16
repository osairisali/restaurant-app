const registerServiceWorker = async () => {
  try {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('sw.js')
    }
  } catch (error) {
  }
}

export default registerServiceWorker
