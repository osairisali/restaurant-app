import SearchButtonInitiator from '../../utils/search-button-initiator'

const RestoSearch = {
  async render () {
    // create search input container on top of content-component
    const mainContent = document.querySelector('#content-component')
    mainContent.insertAdjacentHTML(
      'beforebegin',
      `<div id="searchRestoContainer">
    <!-- to be inserted by search page -->
       </div>`
    )

    // return blank resto list container for search results
    return `
    <div class="content">
      <h2 class="content__heading">Restaurant List</h2>
      <div id="restoList" class="restoList"></div>
      </div> 
        `
  },

  async afterRender () {
    const searchResultContainer = document.querySelector(
      '#searchRestoContainer'
    )

    await SearchButtonInitiator.init(searchResultContainer)
  }
}

export default RestoSearch
