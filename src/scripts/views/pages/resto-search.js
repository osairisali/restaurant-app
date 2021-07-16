import SearchButtonInitiator from '../../utils/search-button-initiator'

const RestoSearch = {
  async render () {
    // return blank resto list container for search results
    return `
    <div class="content">
    <div id="searchRestoContainer">
    </div>
      <h2 class="content__heading">Restaurant List</h2>
      <h3 class="searchInfo"></h3>
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
