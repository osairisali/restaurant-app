const NotificationHelper = {
  async sendNotification ({ title, options }) {
    if (!this._checkAvailibility()) {
      return
    }
    if (!this._checkPermission()) {
      await this._requestPermission()
      return
    }
    await this._showNotification({ title, options })
  },
  _checkAvailibility () {
    return !!('Notification' in window)
  },
  _checkPermission () {
    return Notification.permission === 'granted'
  },
  async _requestPermission () {
    await Notification.requestPermission()
  },
  async _showNotification ({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready

    serviceWorkerRegistration.showNotification(title, options)
  }
}

export default NotificationHelper
