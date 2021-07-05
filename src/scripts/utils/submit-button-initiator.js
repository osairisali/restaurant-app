import {
  createSubmitButtonTemplate,
  createFormReviewTemplate,
  createFailedPageTemplate
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
      // console.log(name.value, review.value);
      const response = await fetch(
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

      console.log('your review is submitted: ', response)
      name.value = ''
      review.value = ''
      location.reload()
    } catch (error) {
      console.log(error)
      if (error.message === 'Failed to fetch') {
        // render offline page if error in submitting response
        createFailedPageTemplate('#restoDetail')
      }
    }
  }
}

export default SubmitButtonInitiator
