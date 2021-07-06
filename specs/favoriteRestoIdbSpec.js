/* eslint-disable no-undef */
import FavouriteRestoIdb from '../src/scripts/data/favourite-resto-idb'
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestoContract'

describe('Favorite restaurant IDB contract test implementation', () => {
  afterEach(async () => {
    const likedRestaurants = await FavouriteRestoIdb.getRestaurantList()

    await Promise.all(
      likedRestaurants.map(async ({ id }) => {
        await FavouriteRestoIdb.deleteRestaurant(id)
      }))
  })

  it(itActsAsFavoriteRestaurantModel(FavouriteRestoIdb))
})
