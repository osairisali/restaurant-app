const FetchResto = {
  // return [{city: "Medan", description: "Lorem,id: "rqdv5juczeskfw1e867", name: "Melting Pot", pictureId: "14",rating: 4.2}]
  async getRestoList () {
    try {
      const response = await fetch('https://restaurant-api.dicoding.dev/list')

      if (response.status === 200) {
        const { restaurants } = await response.json()
        return restaurants
      }
      return []
    } catch (error) {
      console.log(error)
    }
  },

  async getRestoDetail (id) {
    try {
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      )
      console.log('response status: ', response.status)

      if (response.status !== 400) {
        const { restaurant } = await response.json()
        return restaurant
      }
    } catch (error) {
      console.log('error on fetching restaurant resources: ', error.message)

      throw error
    }
  },

  async searchResto () {}
}

export default FetchResto
