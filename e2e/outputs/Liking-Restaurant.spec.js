/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking restaurants')

Before(({ I }) => {
  I.amOnPage('/#/like')
})

Scenario('showing empty liked restaurants', (({I})) => {
    I.seeElement('')
})
