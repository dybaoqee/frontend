import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import listings from './listings'

export default combineReducers({
  router: routerReducer,
  counter,
  listings
})
