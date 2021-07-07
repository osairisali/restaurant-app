/* eslint-disable no-undef */
import FavouriteRestoIdb from '../src/scripts/data/favourite-resto-idb'
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/favorite-resto-search-presenter'
import FavouriteRestoSearchView from '../src/scripts/views/pages/liked/favorite-resto-search-view'

describe('Searching liked restaurants', () => {
  let presenter, favoriteResto, view

  const searchResto = (query) => {
    const queryElement = document.querySelector('#query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestoSearchContainer = () => {
    view = new FavouriteRestoSearchView()
    document.body.innerHTML = view.getTemplate()
    // console.log('doc body: ', document.body)
  }

  const constructPresenter = () => {
    favoriteResto = spyOnAllFunctions(FavouriteRestoIdb)
    presenter = new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: favoriteResto })
  }

  beforeEach(() => {
    setRestoSearchContainer()
    constructPresenter()
  })

  describe('when query is not empty', () => {
    it('should be able to capture the query by user', () => {
      favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
        { id: 1, name: 'resto asek' }
      ])

      searchResto('resto a')

      expect(presenter.latestQuery).toEqual('resto a')
    })

    it('should ask the model to search for liked restaurant names', () => {
      favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([{ id: 1, name: 'resto asek' }])

      searchResto('resto a')

      expect(favoriteResto.searchRestaurants).toHaveBeenCalledWith('resto a')
    })

    it('should show - when the restaurant returned does not have a name', (done) => {
      document.querySelector('#resto').addEventListener('resto:updated', (event) => {
        expect(document.querySelectorAll('.resto-title').item(0).textContent).toEqual('-')
        done()
      })

      favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([{ id: 1 }])

      searchResto('resto a')
    })

    it('should show favorite restaurants found by Favorite Restaurant search function', (done) => {
      document.querySelector('#resto').addEventListener('resto:updated', (event) => {
        expect(document.querySelectorAll('.resto-title').length).toEqual(2)
        done()
      })

      favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
        { id: 1, name: 'resto as' },
        { id: 1, name: 'resto ab' }
      ])

      searchResto('resto a')
    })

    it('should show the name of restaurants found by search favorite restaurants', (done) => {
      const stub = [
        { id: 1, name: 'resto asek' },
        { id: 2, name: 'resto asik' },
        { id: 3, name: 'resto asok' }
      ]
      document.querySelector('#resto').addEventListener('resto:updated', (event) => {
        const restoTitles = document.querySelectorAll('.resto-title')
        console.log(restoTitles)
        for (let i = 0; i < stub.length; i++) {
          expect(restoTitles[i].textContent).toEqual(stub[i].name)
        }
        done()
      })

      favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues(stub)

      searchResto('resto a')
    })
  })

  describe('when query is empty', () => {})
})
