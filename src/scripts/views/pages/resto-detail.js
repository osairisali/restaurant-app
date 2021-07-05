import {
  createRestoDetailTemplate,
  createReviewItemTemplate,
  createError404Template,
  createFailedPageTemplate
} from '../templates/template-creator'
import UrlParser from '../../routes/url-parser'
import FetchResto from '../../data/fetch-resto'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import SubmitButtonInitiator from '../../utils/submit-button-initiator'
import { addLoader, removeLoader } from '../../utils/loader'
import clearElement from '../../utils/clear-element'

const RestoDetail = {
  async render () {
    return `
    <div id="restoDetail" class="resto"></div>
    <div id="likeButtonContainer"></div>
  `
  },
  async afterRender () {
    const restoDetailContainer = document.querySelector('#restoDetail')
    try {
      addLoader('#restoDetail')

      const { id } = UrlParser.parseActiveUrlWithoutCombiner()

      // fetch restaurant data from web api
      const restaurant = await FetchResto.getRestoDetail(id)

      // remove loading indicator
      removeLoader('#restoDetail')

      console.log('restaurant: ', restaurant)
      restoDetailContainer.innerHTML = createRestoDetailTemplate(restaurant)

      // add like button
      const likeButtonContainer = document.querySelector(
        '#likeButtonContainer'
      )
      await LikeButtonInitiator.init({
        likeButtonContainer,
        resto: restaurant
      })

      // submit review field
      const submitButtonContainer = document.querySelector('#submitReview')
      await SubmitButtonInitiator.init({ submitButtonContainer, id })

      // review section
      const reviewContainer = document.querySelector('.review')
      const { customerReviews } = restaurant
      customerReviews.forEach(({ name, date, review }) => {
        reviewContainer.innerHTML += createReviewItemTemplate(
          name,
          date,
          review
        )
      })

      // remove search input field when this page comes from search results
      clearElement(['#searchRestoContainer'])
    } catch (error) {
      console.log(error.message)

      if (error.message === 'Failed to fetch') {
        // render offline page if error in fetching response
        createFailedPageTemplate('#restoDetail')
      } else {
        // render failed 404 page if restaurant is undefined
        restoDetailContainer.innerHTML = createError404Template()
      }
    }
  }
}

export default RestoDetail
