import { openDB } from 'idb'
import config from '../globals/config'

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = config

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade (database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' })
  }
})

const FavouriteRestoIdb = {
  async getRestaurantList () {
    return (await dbPromise).getAll(OBJECT_STORE_NAME)
  },
  async getRestaurant (id) {
    if (!id) {
      return
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id)
  },
  async putRestaurant (restaurant) {
    if (!restaurant.id) {
      return
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant)
  },
  async deleteRestaurant (id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id)
  },
  async searchRestaurants (keywords) {
    const normalizedKeywords = keywords.toLowerCase() || '-'
    return (await this.getRestaurantList()).filter(({ name }) => {
      const normalizedName = name ? name.toLowerCase() : '-'
      return normalizedName.indexOf(normalizedKeywords) !== -1
    })
  }
}

export default FavouriteRestoIdb
