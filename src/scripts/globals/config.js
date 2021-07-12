const config = {
  DATABASE_NAME: 'resto-catalogue-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'resto',
  TOKEN: 12345,
  // size options: large, medium, small
  BASE_IMAGE_URL (id, size = 'small') {
    console.log('requesting image size: ', size)
    return `https://restaurant-api.dicoding.dev/images/${size}/${id}`
  }
}

export default config
