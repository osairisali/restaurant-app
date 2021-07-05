import {
  createSearchButtonTemplate,
  createSearchRestoTemplate,
  createRestoItemTemplate,
  createNoRestaurantFoundTemplate,
  createFailedPageTemplate
} from '../views/templates/template-creator'
import { addLoader, removeLoader } from '../utils/loader'

const SearchButtonInitiator = {
  async init (searchResultContainer) {
    this._searchResultContainer = searchResultContainer
    this._searchHandler = this._searchHandler.bind(this)

    await this._renderSearchButton()
  },
  async _renderSearchButton () {
    this._searchResultContainer.innerHTML = createSearchRestoTemplate()
    const searchButtonContainer = document.querySelector(
      '#searchButtonContainer'
    )
    searchButtonContainer.innerHTML = createSearchButtonTemplate()

    const searchButton = document.querySelector('#submitSearch')

    searchButton.addEventListener('click', this._searchHandler)
  },

  async _searchHandler () {
    try {
      // render loading indicator first
      addLoader('#restoList')

      const keyword = document.querySelector('#searchInput')
      // console.log("keyword: ", keyword.value);
      const response = await fetch(
          `https://restaurant-api.dicoding.dev/search?q=${keyword.value}`
      )

      const { restaurants } = await response.json()
      console.log('search results: ', restaurants)

      // render search results
      removeLoader('#restoList')
      const resultsContainer = document.querySelector('#restoList')
      console.log('resultsContainer: ', resultsContainer)

      resultsContainer.innerHTML = ''
      keyword.value = ''

      if (restaurants.length === 0) {
        console.log('redirecting to search page')
        resultsContainer.innerHTML = createNoRestaurantFoundTemplate()
      }

      const restoListContainer = document.querySelector('#restoList')
      restaurants.forEach((resto) => {
        restoListContainer.innerHTML += createRestoItemTemplate(resto)
      })
    } catch (error) {
      console.log(error)
      createFailedPageTemplate('#restoList')
    }
  }
}

export default SearchButtonInitiator