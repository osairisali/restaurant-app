import RestoList from '../views/pages/resto-list'
import RestoDetail from '../views/pages/resto-detail'
import RestoLiked from '../views/pages/resto-liked'
import RestoSearch from '../views/pages/resto-search'
import ErrorPage from '../views/pages/error-404'

const routes = {
  '/': RestoList,
  '/list': RestoList,
  '/detail/:id': RestoDetail,
  '/liked': RestoLiked,
  '/search': RestoSearch,
  '/error': ErrorPage
}

export default routes
