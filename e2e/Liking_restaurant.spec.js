/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/liked')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#resto')
  I.see('No Liked Restaurant Found!')
})

Scenario('liking one restaurant', async ({ I }) => {
  I.see('No Liked Restaurant Found!')
  I.amOnPage('/')
  I.seeElement('.resto-item')

  const firstRestaurant = locate('.resto-title a').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)

  I.click(firstRestaurant)
  I.seeElement('#likeButton')
  I.click('#likeButton')
  I.amOnPage('/#/liked')
  // pause()
  I.seeElement('.resto-title')

  const firstLikedRestaurant = await I.grabTextFrom('.resto-title a')

  assert.strictEqual(firstLikedRestaurant, firstRestaurantName)
})

Scenario('searching liked restaurants', async ({ I }) => {
  I.see('No Liked Restaurant Found!')

  I.amOnPage('/')
  I.seeElement('.resto-item')

  // limit to like only five restaurants
  const restaurants = []
  for (let i = 1; i <= 5; i++) {
    I.click(locate('.resto-title a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    const restaurantName = (await I.grabTextFrom('.resto__title')).trim().toLowerCase()
    console.log('restaurant name pushed: ', restaurantName)
    restaurants.push(restaurantName)
    I.amOnPage('/')
  }

  I.amOnPage('/#/liked')
  I.seeElement('#query')
  console.log('liked restaurants: ', restaurants)
  const searchQuery = restaurants[1].trim().toLowerCase().substring(0, 4)
  const matchedRestaurants = restaurants.filter((resto) => {
    return resto.indexOf(searchQuery) !== -1
  })
  console.log('matched restaurants: ', matchedRestaurants)
  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  // assert length of matched restaurants
  const visibleMatchedRestaurants = await I.grabNumberOfVisibleElements('.resto-title a')
  assert.strictEqual(visibleMatchedRestaurants, matchedRestaurants.length)

  // assert name of each matched restaurant with visible element
  for (let i = 0; i < matchedRestaurants.length; i++) {
    const locateRestaurantName = (await I.grabTextFrom(locate('.resto-title a').at(i + 1)))
    console.log('locateRestaurantName: ', locateRestaurantName.trim().toLowerCase())
    const visibleMatchedRestaurantName = locateRestaurantName.trim().toLowerCase()
    console.log('visibleMatchedRestaurantName: ', visibleMatchedRestaurantName)
    assert.strictEqual(visibleMatchedRestaurantName, matchedRestaurants[i])
  }
})
