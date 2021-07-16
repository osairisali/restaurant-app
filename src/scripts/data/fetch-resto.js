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
    }
  },

  async getRestoDetail (id) {
    try {
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      )

      if (response.status !== 400) {
        const { restaurant } = await response.json()
        return restaurant
      }
    } catch (error) {

    }
  },

  async searchResto () {}
}

export default FetchResto
