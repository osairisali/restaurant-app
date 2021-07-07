import FavouriteRestoIdb from '../src/scripts/data/favourite-resto-idb'
import { createLikeButtonPresenterWithResto } from './helper/testFactories'

/* eslint-disable no-undef */
describe('Liking a restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
  }

  beforeEach(() => {
    addLikeButtonContainer()
  })

  it('should show the like button when the restaurant is not liked before', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 })

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy()
  })

  it('should not show unlike button when the restaurant has not been liked before', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 })

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy()
  })

  it('should be able to like the restaurant', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 })

    document.querySelector('#likeButton').dispatchEvent(new Event('click'))

    const restaurant = await FavouriteRestoIdb.getRestaurant(1)
    expect(restaurant).toEqual({ id: 1 })

    await FavouriteRestoIdb.deleteRestaurant(1)
  })

  it('should not add the already liked restaurant', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 })

    // putting {id: 1} manually to restaurants idb
    await FavouriteRestoIdb.putRestaurant({ id: 1 })

    // simulate adding favorite restaurant via FE click event
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))

    const restaurants = await FavouriteRestoIdb.getRestaurantList()

    expect(restaurants).toEqual([{ id: 1 }])

    await FavouriteRestoIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant with no id', async () => {
    await createLikeButtonPresenterWithResto({ ids: 1 })

    document.querySelector('#likeButton').dispatchEvent(new Event('click'))

    const restaurants = await FavouriteRestoIdb.getRestaurantList()

    expect(restaurants.length).toEqual(0)
  })
})
