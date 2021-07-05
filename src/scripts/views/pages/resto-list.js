import FetchResto from '../../data/fetch-resto'
import {
  createRestoItemTemplate,
  // createFooterTemplate,
  createFailedPageTemplate
} from '../templates/template-creator'
import { addLoader, removeLoader } from '../../utils/loader'

const RestoList = {
  // render loader first
  async render () {
    return `
    <!-- JUMBOTRON -->
          <div class="jumbotron">
              <div class="jumbotron__inner">
                  <h1 class="jumbotron__title">Daftar restoran terbaik Indonesia</h1>
                  <p class="jumbotron__tagline">Dapatkan restoran terbaik dari anak muda untuk anak muda!</p>
              </div>
          </div>
  
          <br>
          <h1 id="explore">Explore Restaurants Below!</h1>
          <br>
          
      <div class="content">
          <h2 class="content__heading">Restaurant List</h2>
          <div id="restoList" class="restoList"></div>
      </div>
    </div>
  `
  },
  // render restaurant item cards after initialising restaurant list container
  async afterRender () {
    try {
      addLoader('#restoList')
      const restaurantList = await FetchResto.getRestoList()
      console.log('restaurantList: ', restaurantList)

      // replace loader icon with jumbotron & restaurant list container when restaurant list is ready
      removeLoader('#restoList')

      // render restaurant list
      const restoListContainer = document.querySelector('#restoList')
      console.log('restoListContainer: ', restoListContainer)
      restaurantList.forEach((restaurant) => {
        restoListContainer.innerHTML += createRestoItemTemplate(restaurant)
      })
    } catch (error) {
      console.log(error)
      createFailedPageTemplate('#restoList')
    }
  }
}

export default RestoList
