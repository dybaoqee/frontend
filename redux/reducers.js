import {
  NAVIGATE,
  SELECT_BEDROOMS,
  SELECT_SUITES,
  SELECT_BATHROOMS
} from './actions'

const initialState = {
  step: 'intro'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        step: action.step
      }
    case SELECT_BEDROOMS:
      return {
        ...state,
        bedrooms: action.value
      }
    case SELECT_SUITES:
      return {
        ...state,
        suites: action.value
      }
    case SELECT_BATHROOMS:
      return {
        ...state,
        bathrooms: action.value
      }
    default:
      return state
  }
}

export default reducer
