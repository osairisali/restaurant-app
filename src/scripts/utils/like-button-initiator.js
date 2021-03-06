import FavouriteRestoIdb from '../data/favourite-resto-idb'
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate
} from '../views/templates/template-creator'
import NotificationHelper from '../utils/notification-helper'

const LikeButtonInitiator = {
  async init ({ likeButtonContainer, resto, favouriteResto, notificationHelper }) {
    this._likeButtonContainer = likeButtonContainer
    this._resto = resto
    this._favouriteResto = favouriteResto
    this._notificationHelper = notificationHelper

    await this._renderButton()
  },
  async _renderButton () {
    const { id } = this._resto

    if (await this._isRestoExist(id)) {
      await this._renderLiked()
    } else {
      await this._renderLike()
    }
  },
  async _isRestoExist (id) {
    const resto = await this._favouriteResto.getRestaurant(id)
    return !!resto
  },
  async _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favouriteResto.putRestaurant(this._resto)
      await this._renderButton()
      await NotificationHelper.sendNotification({
        title: 'Hunger Apps',
        options: { body: 'your liked restaurant is added' }
      })
    })
  },
  async _renderLiked () {
    const { id } = this._resto
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate()

    const likedButton = document.querySelector('#likeButton')
    likedButton.addEventListener('click', async () => {
      await FavouriteRestoIdb.deleteRestaurant(id)
      await this._renderButton()
      await this._notificationHelper.sendNotification({
        title: 'Hunger Apps',
        options: { body: 'your liked restaurant removed' }
      })
    })
  }
}

export default LikeButtonInitiator
