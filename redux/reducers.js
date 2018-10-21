import {
  NAVIGATE,
  UPDATE_ROOMS
} from './actions'

const initialState = {
  step: 'intro',
  rooms: {
    bedrooms: null,
    suites: null,
    bathrooms: null,
    enterMoreBedrooms: false,
    enterMoreBathrooms: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        step: action.step
      }
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.value
      }
    default:
      return state
  }
}

export default reducer
