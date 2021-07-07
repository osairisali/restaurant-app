class FavouriteRestoShowPresenter {
  constructor ({ view, favoriteRestaurants }) {
    this._view = view
    this._favoriteRestaurants = favoriteRestaurants
    this._showFavoriteRestaurants()
  }

  async _showFavoriteRestaurants () {
    const restaurants = await this._favoriteRestaurants.getRestaurantList()
    this._displayRestaurants(restaurants)
  }

  _displayRestaurants (restaurants) {
    this._view.showFavoriteRestaurants(restaurants)
  }
}

export default FavouriteRestoShowPresenter
