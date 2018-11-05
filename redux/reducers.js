import {
  NAVIGATE,
  UPDATE_LOCATION,
  UPDATE_HOME_DETAILS,
  UPDATE_ROOMS,
  UPDATE_GARAGE,
  UPDATE_DIFFERENTIAL,
  UPDATE_PHONE,
  UPDATE_PERSONAL,
  UPDATE_PRICING,
  UPDATE_SERVICES,
  UPDATE_TOUR,
  RESET_STORE,
  START
} from './actions'

const initialState = {
  step: 'intro',
  startedAt: null,
  location: {
    address: null,
    complement: null,
    addressData: null
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
  },
  personal: {
    name: null,
    email: null
  },
  pricing: {
    suggestedPrice: null,
    userPrice: null,
    editingPrice: null
  },
  services: {
    wantsTour: false,
    wantsPhotos: false,
    availableTimes: null
  },
  tour: {
    date: null,
    time: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        step: action.step
      }
    case START:
      return {
        ...state,
        startedAt: action.value
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
    case UPDATE_PERSONAL:
      return {
        ...state,
        personal: action.value
      }
    case UPDATE_PRICING:
      return {
        ...state,
        pricing: action.value
      }
    case UPDATE_SERVICES:
      return {
        ...state,
        services: action.value
      }
    case UPDATE_TOUR:
      return {
        ...state,
        tour: action.value
      }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default reducer
