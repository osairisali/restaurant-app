// @param html element containing ul and li elements of navigation
// @param drawer html element of navigation toggle button
function addToggleToNav (elements, drawer) {
  const navElements = Array.from(elements[0].children[0].children)

  navElements.forEach((element) => {
    element.children[0].addEventListener('click', (event) => {
      this._closeDrawer(event, drawer)
    })
  })
}

export default addToggleToNav
