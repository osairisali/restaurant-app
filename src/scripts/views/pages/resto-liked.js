/* eslint-disable no-new */
import FavouriteRestoIdb from '../../data/favourite-resto-idb'
import {
  createFailedPageTemplate
} from '../templates/template-creator'
import clearElement from '../../utils/clear-element'
import FavouriteRestoSearchView from './liked/favorite-resto-search-view'
import FavoriteRestoShowPresenter from './liked/favorite-resto-show-presenter'
import FavoriteRestoSearchPresenter from './favorite-resto-search-presenter'

const view = new FavouriteRestoSearchView()
console.log('view instance: ', view.showFavoriteRestaurants)

const RestoLiked = {
  async render () {
    clearElement(['#searchRestoContainer'])

    return view.getTemplate()
  },
  async afterRender () {
    try {
      new FavoriteRestoShowPresenter({ view, favoriteRestaurants: FavouriteRestoIdb })
      new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: FavouriteRestoIdb })
    } catch (error) {
      console.log(error)
      createFailedPageTemplate('#resto')
    }
  }
}

export default RestoLiked
