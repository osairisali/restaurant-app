import {
  createSubmitButtonTemplate,
  createFormReviewTemplate,
  createInfo
} from '../views/templates/template-creator'

const SubmitButtonInitiator = {
  async init ({ submitButtonContainer, id }) {
    this._id = id
    this._submitButtonContainer = submitButtonContainer
    this._postHandler = this._postHandler.bind(this)

    await this._renderForm()
  },
  async _renderForm () {
    this._submitButtonContainer.innerHTML = createFormReviewTemplate(this._id)

    const submitButtonContainer = document.querySelector(
      '.submitButtonContainer'
    )
    submitButtonContainer.innerHTML = createSubmitButtonTemplate()
    const submitButton = document.querySelector('#submitButton')

    submitButton.addEventListener('click', this._postHandler)
  },
  async _postHandler (event) {
    const name = document.querySelector('#name')
    const review = document.querySelector('#review')
    try {
      event.preventDefault()
      await fetch(
        'https://restaurant-api.dicoding.dev/review',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': 12345
          },
          body: JSON.stringify({
            id: this._id,
            review: review.value,
            name: name.value
          })
        }
      )

      name.value = ''
      review.value = ''
      location.reload()
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        // render offline page if error in submitting response
        createInfo('#restoDetail', 'Failed to fetch! Maybe you are offline')
      }
    }
  }
}

export default SubmitButtonInitiator
