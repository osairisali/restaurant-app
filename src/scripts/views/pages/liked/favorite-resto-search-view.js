import { createNoRestaurantFoundTemplate, createRestoItemTemplate } from '../../templates/template-creator'

class FavouriteRestoSearchView {
  getTemplate () {
    return `
        <div class="content">
            <input id="query" type="text">
            <h2 class="content__heading">Your Liked Restaurant</h2>
            <div id="resto" class="resto"></div>
        </div>
    `
  }

  runWhenUserIsSearching (callback) {
    document.querySelector('#query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showFavoriteRestaurants (restaurants = []) {
    let html
    if (restaurants.length > 0) {
      html = restaurants.reduce((acc, restaurant) => {
        return acc.concat(createRestoItemTemplate(restaurant))
      }, '')
    } else {
      html = this._getEmptyRestoTemplate()
    }

    document.querySelector('#resto').innerHTML = html

    document.querySelector('#resto').dispatchEvent(new Event('resto:updated'))
  }

  _getEmptyRestoTemplate () {
    return createNoRestaurantFoundTemplate()
  }
}

export default FavouriteRestoSearchView