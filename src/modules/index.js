import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form';
import listings from './listings/index'
import listing from './listings/show'

export default combineReducers({
  router: routerReducer,
  form: reduxFormReducer,
  listings,
  listing
})
