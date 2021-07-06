import FavouriteRestoIdb from '../../src/scripts/data/favourite-resto-idb'
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator'
import NotificationHelper from '../../src/scripts/utils/notification-helper'

const createLikeButtonPresenter = async (resto) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    resto,
    notificationHelper: NotificationHelper,
    favouriteResto: FavouriteRestoIdb
  })
}

const createUnlikeButtonPresenter = async () => {
  await FavouriteRestoIdb.putRestaurant({ id: 1 })

  await createLikeButtonPresenter({ id: 1 })
}

export { createLikeButtonPresenter, createUnlikeButtonPresenter }
