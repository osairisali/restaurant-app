import { createError404Template } from '../templates/template-creator'

const ErrorPage = {
  async render () {
    return '<div class="content"></div>'
  },
  async afterRender () {
    document.querySelector('.content').innerHTML = createError404Template()
  }
}

export default ErrorPage
