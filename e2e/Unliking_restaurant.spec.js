/* eslint-disable no-undef */
const assert = require('assert')

Feature('Unliking restaurant')

const compareArrayElements = (actual, expected) => {
  if (actual.length !== expected.length) throw new Error('arrays are not the same')
  for (const actualEl of actual) {
    if (expected.indexOf(actualEl) !== -1) {
      continue
    } else {
      throw new Error('arrays are not the same')
    }
  }
  return true
}

const likingSeveralRestaurants = async (numRes, I) => {
  try {
    I.amOnPage('/')
    const likedRestaurants = []

    for (let i = 1; i <= numRes; i++) {
      I.click(locate('.resto-title a').at(i))
      I.seeElement('#likeButton')
      I.click('#likeButton')
      const restaurantName = await I.grabTextFrom('.resto__title')
      likedRestaurants.push(restaurantName)
      I.amOnPage('/')
    }
    return likedRestaurants
  } catch (error) {
  }
}

Scenario('unliking a restaurant', async ({ I }) => {
  let likedRestaurants = await likingSeveralRestaurants(5, I)

  I.amOnPage('/#/liked')
  I.seeElement('.resto-title a')

  // assert number of visible liked restaurants
  const numberOfVisibleElements = await I.grabNumberOfVisibleElements('.resto-title a')
  assert.strictEqual(numberOfVisibleElements, likedRestaurants.length)

  // asserting that liked restaurants before are the same with the list showed in the liked page
  const showedRestaurants = []
  for (let i = 0; i < likedRestaurants.length; i++) {
    const locateRestaurantName = locate('.resto-title a').at(i + 1)
    showedRestaurants.push(await I.grabTextFrom(locateRestaurantName))
  }
  //   assert.notStrictEqual(showedRestaurants, likedRestaurants)
  compareArrayElements(showedRestaurants, likedRestaurants)
  // assert.deepEqual(showedRestaurants, likedRestaurants)

  // assert unliking first restaurant
  const firstUnliking = locate('.resto-title a').first()
  I.click(firstUnliking)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  // remove liked restaurants from likedRestaurant's array
  const removedRestaurant = await I.grabTextFrom('.resto__title')
  likedRestaurants = [...likedRestaurants].filter((resto) => resto !== removedRestaurant)

  I.amOnPage('/#/liked')

  const numRemainingLikedRestaurants = await I.grabNumberOfVisibleElements('.resto-item')
  assert.strictEqual(likedRestaurants.length, numRemainingLikedRestaurants)

  // asserting the names of remaining liked restaurants
  const remainingLikedRestaurants = await I.grabTextFromAll('.resto-title a')
  // should we use assert.notStrictEqual to compare array??? NO for element to element comparisons
  compareArrayElements(likedRestaurants, remainingLikedRestaurants)

  // for testing custom function only
  //   assert.notStrictEqual(likedRestaurants, ['Kafe Kita', 'Bring Your Phone Cafe', 'Istana Emas'])
  //   compareArrayElements(likedRestaurants, ['Kafe Kita', 'Bring Your Phone Cafe', 'Istana Emas'])
  //   compareArrayElements(['Kafe Kita', 'Bring Your Phone Cafe', 'Istana Emas'], likedRestaurants)
})

Scenario('unliking restaurants until favorite restaurant is empty', async ({ I }) => {
  // liking several restaurants first
  I.amOnPage('/')
  let likedRestaurants = await likingSeveralRestaurants(3, I)

  I.amOnPage('/#/liked')

  for (let i = 0, len = likedRestaurants.length; i < len; i++) {
    const locator = locate('.resto-title a').first()
    const restaurantToRemove = await I.grabTextFrom(locator)
    I.click(locator)
    I.seeElement('#likeButton')
    I.click('#likeButton')

    // updating likedRestaurants
    likedRestaurants = [...likedRestaurants].filter((resto) => resto !== restaurantToRemove)
    I.amOnPage('/#/liked')
  }

  const showedLikedRestaurants = await I.grabTextFromAll('.resto-title a')
  assert.strictEqual(showedLikedRestaurants.length, likedRestaurants.length)
})
