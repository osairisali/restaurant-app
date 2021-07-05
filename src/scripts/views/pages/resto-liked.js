import FavouriteRestoIdb from '../../data/favourite-resto-idb'
import {
  createRestoItemTemplate,
  createFailedPageTemplate
} from '../templates/template-creator'
import clearElement from '../../utils/clear-element'

const RestoLiked = {
  async render () {
    clearElement(['#searchRestoContainer'])

    return `
        <div class="content">
        <h2 class="content__heading">Your Liked Restaurants</h2>
        <div id="resto" class="resto">
   
        </div>
      </div>
        `
  },
  async afterRender () {
    try {
      const restoLikedContainer = document.querySelector('#resto')
      const likedRestos = await FavouriteRestoIdb.getRestaurantList()

      likedRestos.forEach((resto) => {
        restoLikedContainer.innerHTML += createRestoItemTemplate(resto)
      })
    } catch (error) {
      console.log(error)
      createFailedPageTemplate('#resto')
    }
  }
}

export default RestoLiked
