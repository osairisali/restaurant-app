import {
  createRestoDetailTemplate,
  createReviewItemTemplate,
  createError404Template,
  createInfo
} from '../templates/template-creator'
import UrlParser from '../../routes/url-parser'
import FetchResto from '../../data/fetch-resto'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import SubmitButtonInitiator from '../../utils/submit-button-initiator'
import { addLoader, removeLoader } from '../../utils/loader'
import clearElement from '../../utils/clear-element'
import FavouriteRestoIdb from '../../data/favourite-resto-idb'
import NotificationHelper from '../../utils/notification-helper'

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

      restoDetailContainer.innerHTML = createRestoDetailTemplate(restaurant)

      // add like button
      const likeButtonContainer = document.querySelector(
        '#likeButtonContainer'
      )
      await LikeButtonInitiator.init({
        likeButtonContainer,
        resto: restaurant,
        favouriteResto: FavouriteRestoIdb,
        notificationHelper: NotificationHelper
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
      if (error.message === 'Failed to fetch') {
        // render offline page if error in fetching response
        createInfo('.restoDetail', 'Maybe you are offline!')
      } else {
        // render failed 404 page if restaurant is undefined
        restoDetailContainer.innerHTML = createError404Template()
      }
    }
  }
}

export default RestoDetail
