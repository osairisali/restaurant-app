/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/liked')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#resto')
  I.see('No Liked Restaurant!')
})

Scenario('liking one restaurant', async ({ I }) => {
  I.see('No Liked Restaurant!')
  I.amOnPage('/')
  I.seeElement('.resto-item')

  const firstRestaurant = locate('.resto-title a').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)

  I.click(firstRestaurant)
  I.seeElement('#likeButton')
  I.click('#likeButton')
  I.amOnPage('/#/liked')
  I.seeElement('.resto-title')

  const firstLikedRestaurant = await I.grabTextFrom('.resto-title a')

  assert.strictEqual(firstLikedRestaurant, firstRestaurantName)
})

Scenario('searching liked restaurants', async ({ I }) => {
  I.see('No Liked Restaurant!')

  I.amOnPage('/')
  I.seeElement('.resto-item')

  // limit to like only five restaurants
  const restaurants = []
  for (let i = 1; i <= 5; i++) {
    I.click(locate('.resto-title a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    const restaurantName = (await I.grabTextFrom('.resto__title')).trim().toLowerCase()
    restaurants.push(restaurantName)
    I.amOnPage('/')
  }

  I.amOnPage('/#/liked')
  I.seeElement('#query')
  const searchQuery = restaurants[1].trim().toLowerCase().substring(0, 4)
  const matchedRestaurants = restaurants.filter((resto) => {
    return resto.indexOf(searchQuery) !== -1
  })
  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  // assert length of matched restaurants
  const visibleMatchedRestaurants = await I.grabNumberOfVisibleElements('.resto-title a')
  assert.strictEqual(visibleMatchedRestaurants, matchedRestaurants.length)

  // assert name of each matched restaurant with visible element
  for (let i = 0; i < matchedRestaurants.length; i++) {
    const locateRestaurantName = (await I.grabTextFrom(locate('.resto-title a').at(i + 1)))
    const visibleMatchedRestaurantName = locateRestaurantName.trim().toLowerCase()
    assert.strictEqual(visibleMatchedRestaurantName, matchedRestaurants[i])
  }
})
