/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favoriteResto) => {
  it('should return the restaurant that has been added', async () => {
    await favoriteResto.putRestaurant({ id: 1 })
    await favoriteResto.putRestaurant({ id: 2 })

    expect(await favoriteResto.getRestaurant(1)).toEqual({ id: 1 })
    expect(await favoriteResto.getRestaurant(2)).toEqual({ id: 2 })
    expect(await favoriteResto.getRestaurant(3)).toEqual(undefined)
  })

  it('should refuse adding restaurant with incorrect property', async () => {
    await favoriteResto.putRestaurant({ ids: 1 })

    expect(await favoriteResto.getRestaurantList()).toEqual([])
  })

  it('can return all liked restaurants', async () => {
    await favoriteResto.putRestaurant({ id: 1 })
    await favoriteResto.putRestaurant({ id: 2 })

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('should remove selected favorite restaurant', async () => {
    await favoriteResto.putRestaurant({ id: 1 })
    await favoriteResto.putRestaurant({ id: 2 })
    await favoriteResto.putRestaurant({ id: 3 })
    await favoriteResto.putRestaurant({ id: 4 })

    await favoriteResto.deleteRestaurant(3)

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 1 }, { id: 2 }, { id: 4 }])
  })

  it('should handle request to remove non existed restaurant', async () => {
    await favoriteResto.putRestaurant({ id: 1 })
    await favoriteResto.putRestaurant({ id: 2 })

    await favoriteResto.deleteRestaurant(3)

    expect(await favoriteResto.getRestaurantList()).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('should be able to search favourite restaurants', async () => {
    await favoriteResto.putRestaurant({ id: 1, title: 'restaurant a' })
    await favoriteResto.putRestaurant({ id: 2, title: 'restaurant bas' })
    await favoriteResto.putRestaurant({ id: 3, title: 'restaurant bes' })
    await favoriteResto.putRestaurant({ id: 4, title: 'restaurant bos' })
    await favoriteResto.putRestaurant({ id: 5 })

    const foundRestaurants = await favoriteResto.searchRestaurants('as')
    expect(foundRestaurants).toEqual([{ id: 2, title: 'restaurant bas' }])

    // test for empty query
    const foundRestaurants2 = await favoriteResto.searchRestaurants('')
    expect(foundRestaurants2).toEqual([{id: 5}])

    // test for - query
    const foundRestaurants3 = await favoriteResto.searchRestaurants('-')
    expect(foundRestaurants3).toEqual([{ id: 5 }])
  })
}

export { itActsAsFavoriteRestaurantModel }
