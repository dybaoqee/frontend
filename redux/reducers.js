import {
  NAVIGATE,
  SELECT_BEDROOMS,
  SELECT_MORE_BEDROOMS,
  SELECT_SUITES,
  SELECT_BATHROOMS,
  SELECT_MORE_BATHROOMS
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
    case SELECT_MORE_BEDROOMS:
      return {
        ...state,
        inputBedrooms: true
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
    case SELECT_MORE_BATHROOMS:
      return {
        ...state,
        inputBathrooms: true
      }
    default:
      return state
  }
}

export default reducer
