const NotificationHelper = {
  async sendNotification ({ title, options }) {
    if (!this._checkAvailibility()) {
      console.log('notification is not supported!')
      return
    }
    if (!this._checkPermission()) {
      console.log("user doesn't grant permission")
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
    const status = await Notification.requestPermission()

    if (status === 'denied') {
      console.log('notification denied')
    }

    if (status === 'default') {
      console.log('notification request is closed by user')
    }
  },
  async _showNotification ({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready

    serviceWorkerRegistration.showNotification(title, options)
  }
}

export default NotificationHelper
