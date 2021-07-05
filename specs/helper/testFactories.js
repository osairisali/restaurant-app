import FavouriteRestoIdb from '../../src/scripts/data/favourite-resto-idb'
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator'

const createLikeButtonPresenter = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FavouriteRestoIdb,
    restaurant
  })
}

export { createLikeButtonPresenter }
