import FavouriteRestoIdb from '../src/scripts/data/favourite-resto-idb'
import { createUnlikeButtonPresenter } from './helper/testFactories'

/* eslint-disable no-undef */
describe('Unliking restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
  }

  beforeEach(async () => {
    addLikeButtonContainer()

    await createUnlikeButtonPresenter()
  })

  afterEach(async () => {
    await FavouriteRestoIdb.deleteRestaurant(1)
  })

  it('should show favourite restaurants', async () => {
    const restaurants = await FavouriteRestoIdb.getRestaurantList()

    expect(restaurants).toEqual([{ id: 1 }])
  })

  it('should show unlike button for already liked restaurant', async () => {
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  it('should not show like button for already liked restaurant', async () => {
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  it('should be able to unlike restaurant', async () => {
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))

    const restaurants = await FavouriteRestoIdb.getRestaurantList()

    expect(restaurants.length).toEqual(0)
  })

  it('should not able to delete non exist / already deleted favourite restaurant', async () => {
    // delete non exist favourite restaurant id
    await FavouriteRestoIdb.deleteRestaurant(2)

    const restaurants = await FavouriteRestoIdb.getRestaurantList()

    expect(restaurants).toEqual([{ id: 1 }])
  })
})
