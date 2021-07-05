import addToggleToNav from './add-toggle-to-nav'

const DrawerInitator = {
  init ({ button, drawer, content, nav }) {
    // toggle functionality on mobile navigation
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer)
    })

    // hide an opening mobile navigation when main content is clicked
    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer)
    })

    // hide an opening mobile navigation after user clicking the menu button
    addToggleToNav.call(this, nav, drawer)
  },

  _toggleDrawer (event, drawer) {
    event.stopPropagation()
    drawer.classList.toggle('open')
  },

  _closeDrawer (event, drawer) {
    event.stopPropagation()
    drawer.classList.remove('open')
  }
}

export default DrawerInitator
