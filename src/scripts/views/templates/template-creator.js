import config from '../../globals/config'

const createRestoItemTemplate = ({
  name,
  pictureId,
  rating,
  id,
  description,
  city
}) => {
  return `
    <div class="resto-item">
    <div class="resto-item__header">
    <picture>
      <source media="(min-width: 768px)" srcset="${config.BASE_IMAGE_URL(pictureId, 'medium')}" type="image/jpeg">
      <source media="(min-width: 1024px)" srcset="${config.BASE_IMAGE_URL(pictureId, 'large')}" type="image/jpeg">
      <img class="resto-item__header__poster" alt="${name || '-'}" src="${config.BASE_IMAGE_URL(pictureId, 'small')}"
           loading="lazy" class="lazyload">
    </picture>
        <div class="resto-item__header__rating">
            <p>⭐️<span class="resto-item__header__rating__score">${rating}</span></p>
        </div>
    </div>
    <div class="resto-item__content">
        <h3 class="resto-title"><a href="${`/#/detail/${id}`}">${name || '-'}</a></h3>
        <h4>${city}</h4>
        <p>${description}</p>
    </div>
  </div>
    `
}

const createRestoDetailTemplate = ({
  name,
  pictureId,
  rating,
  description,
  address,
  city,
  categories,
  menus
}) => {
  return `
 <h2 class="resto__title">${name}</h2>
 <div class="imageResto">
 <picture>
    <source media="(min-width: 768px)" srcset="${config.BASE_IMAGE_URL(pictureId, 'medium')}" type="image/jpeg">
    <source media="(min-width: 1024px)" srcset="${config.BASE_IMAGE_URL(pictureId, 'large')}" type="image/jpeg">
    <img class="resto-item__header__poster" alt="${name || '-'}" src="${config.BASE_IMAGE_URL(pictureId, 'small')}"
        loading="lazy" class="lazyload">
 </picture>
 </div>
 

 <h3>Information</h3>
 <div class="mainInfo">

  <div class="resto__box">
    <h4>Overall Rating</h4>
    <p>${rating}</p>
    <h4>Categories</h4>
    <p>${categories.map((cat) => `\n${cat.name}`)}</p>
    <h4>City</h4>
    <p>${city}</p>
    <h4>Address</h4>
    <p>${address}</p>
  </div>

  <div class="resto__box">
     <h4>Food Menus</h4>
     <p>${menus.foods.map((food) => `\n${food.name}`)}</p>
     <h4>Drink Menus</h4>
     <p>${menus.drinks.map((drink) => `\n${drink.name}`)}</p>
  </div>

  </div> 
  <div class="resto__overview">
   <h3>Description</h3>
   <p>${description}</p>
 </div>

 <div id="submitReview">
 </div>

 <h3>User Reviews</h3>
 <div class="review"> </div>
 </div>
 `
}

const createReviewItemTemplate = (name, review, date) => `
<div class="reviewItem">
<h4>${name}</h4>
<h5>Review: ${review}</h5>
<h5>Date: ${date}</h5>
</div>`

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`

const createSubmitButtonTemplate = () => `
  <button type="submit" id="submitButton">Submit!</button>
`

const createFormReviewTemplate = (id) => `
<h3>Review this restaurant!</h3>

<form class="flexColumn" id="reviewForm">
<div class="nameInput gap flexColumn">
    <label for="name">Name Field</label>
    <input type="text" class="border" name="name" id="name" placeholder="your name" required>
</div>
<div class="reviewInput gap flexColumn">
    <label for="review">Review Field</label>
    <input id="review" class="border" name="review" type="text" placeholder="your review" required>
</div>

<div class="submitButtonContainer gap">
</div>
</form>
`

const createSearchRestoTemplate = () => `
<div class="searchInputContainer">
<input name="searchInput" id="searchInput" class="searchInput" type="text" placeholder="Search restaurant list here">
</div>
<div id="searchButtonContainer">
</div>
`

const createSearchButtonTemplate = () => `
<input type="submit" id="submitSearch" class="submitSearch" value="Search!">
`

const createFooterTemplate = () => `
<footer>
        <p id="footer">Hak Cipta (c) 2021 - Hunger Apps</p>
    </footer>
`

const createNoRestaurantFoundTemplate = (component) => {
  document.querySelector(component).textContent = 'No restaurant found!'
}

const createFailedPageTemplate = (component) => {
  document.querySelector(component).textContent = "We think you are offline, or maybe there's a server error. Try again later."
}

const createInfo = (component, info) => {
  document.querySelector(component).textContent = info
}

const createError404Template = () => '<h3>URL not found! Check your url spelling.</h3>'

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createSubmitButtonTemplate,
  createFormReviewTemplate,
  createSearchRestoTemplate,
  createSearchButtonTemplate,
  createFooterTemplate,
  createNoRestaurantFoundTemplate,
  createFailedPageTemplate,
  createReviewItemTemplate,
  createError404Template,
  createInfo
}
