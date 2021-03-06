/* eslint-disable no-new */
import FavouriteRestoIdb from '../../data/favourite-resto-idb'
import {
  createInfo
} from '../templates/template-creator'
import clearElement from '../../utils/clear-element'
import FavouriteRestoSearchView from './liked/favorite-resto-search-view'
import FavoriteRestoShowPresenter from './liked/favorite-resto-show-presenter'
import FavoriteRestoSearchPresenter from './liked/favorite-resto-search-presenter'

const view = new FavouriteRestoSearchView()

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
      createInfo('#resto', `${error}`)
    }
  }
}

export default RestoLiked
