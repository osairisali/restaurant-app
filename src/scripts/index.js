import 'regenerator-runtime' /* for async await transpile */
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

// styling
import '../styles/base.css'
import '../styles/burgerMenu.css'
import '../styles/header.css'
import '../styles/jumbotron.css'
import '../styles/main.css'
import '../styles/restoCard.css'
import '../styles/footer.css'
import '../styles/like.css'
import '../styles/loader.css'
import '../styles/detail.css'
import '../styles/reviewForm.css'
import '../styles/reviewItem.css'
import '../styles/search.css'

import App from './views/app'
import registerServiceWorker from './utils/sw-registration-helper'

const nav = document.querySelectorAll('#navigationDrawer')

const app = new App({
  content: document.querySelector('#content-component'),
  button: document.querySelector('#hamburgerBtn'),
  nav,
  drawer: document.querySelector('.nav')
})

window.addEventListener('hashchange', async () => {
  await app.renderPage()
})

// faster event with DOMContentLoaded rather than load event
window.addEventListener('DOMContentLoaded', async () => {
  await app.renderPage()

  try {
    await app.renderPage()
    // await registerServiceWorker()
  } catch (error) {
    console.log(error)
  }
})
