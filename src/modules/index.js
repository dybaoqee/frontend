import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import listings from './listings/index'
import listing from './listings/show'

export default combineReducers({
  router: routerReducer,
  listings,
  listing
})
