import UrlParser from '../routes/url-parser'
import routes from '../routes/routes'
import DrawerInitator from '../utils/drawer-initiator'

class App {
  constructor ({ content, drawer, button, nav }) {
    this._content = content
    this._drawer = drawer
    this._button = button
    this._nav = nav
    this._initialAppShell()
  }

  _initialAppShell () {
    DrawerInitator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      nav: this._nav
    })
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url] || routes['/error']
    this._content.innerHTML = await page.render()
    await page.afterRender()
  }
}

export default App
