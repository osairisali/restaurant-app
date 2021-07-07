class FavoriteRestoSearchPresenter {
  constructor ({ view, favoriteRestaurants }) {
    this._view = view
    this._favoriteRestaurants = favoriteRestaurants
    this._listenToSearchRequestByUser()
  }

  _listenToSearchRequestByUser () {
    this._view.runWhenUserIsSearching((latestQuery) => {
    //   console.log('latest query catch: ', latestQuery)
      this._searchResto(latestQuery)
    })
  }

  async _searchResto (query) {
    this._latestQuery = query.trim()
    let foundRestaurants

    if (query.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this._latestQuery)
    } else {
      foundRestaurants = await this._favoriteRestaurants.getRestaurantList()
    }

    this._showFoundRestaurants(foundRestaurants)
  }

  _showFoundRestaurants (restaurants) {
    this._view.showFavoriteRestaurants(restaurants)
  }

  get latestQuery () {
    return this._latestQuery
  }
}

export default FavoriteRestoSearchPresenter
