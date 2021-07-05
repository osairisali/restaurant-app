const clearElement = (elements) => {
  for (const element of elements) {
    if (document.querySelector(`${element}`) === null) continue

    const toBeCleared = document.querySelector(`${element}`)
    toBeCleared.remove()
  }
}

export default clearElement
