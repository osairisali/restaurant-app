const addLoader = (component) => {
  const contentComponent = document.querySelector(`${component}`)
  contentComponent.innerHTML = '<div id="loader-wrapper"></div>'
}

const removeLoader = (component) => {
  const contentComponent = document.querySelector(`${component}`)
  contentComponent.innerHTML = ''
}

export { addLoader, removeLoader }
