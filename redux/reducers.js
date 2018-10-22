import {
  NAVIGATE,
  UPDATE_LOCATION,
  UPDATE_HOME_DETAILS,
  UPDATE_ROOMS,
  UPDATE_GARAGE,
  UPDATE_DIFFERENTIAL,
  UPDATE_PHONE
} from './actions'

const initialState = {
  step: 'intro',
  location: {
    address: null,
    complement: null
  },
  homeDetails: {
    homeType: null,
    floor: null,
    area: null,
    cond: null,
    iptu: null
  },
  rooms: {
    bedrooms: null,
    suites: null,
    bathrooms: null,
    enterMoreBedrooms: false,
    enterMoreBathrooms: false
  },
  garage: {
    spots: null,
    spotType: null
  },
  differential: {
    text: null
  },
  phone: {
    internationalCode: null,
    localAreaCode: null,
    number: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        step: action.step
      }
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.value
      }
    case UPDATE_HOME_DETAILS:
      return {
        ...state,
        homeDetails: action.value
      }
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.value
      }
    case UPDATE_GARAGE:
      return {
        ...state,
        garage: action.value
      }
    case UPDATE_DIFFERENTIAL:
      return {
        ...state,
        differential: action.value
      }
    case UPDATE_PHONE:
      return {
        ...state,
        phone: action.value
      }
    default:
      return state
  }
}

export default reducer
