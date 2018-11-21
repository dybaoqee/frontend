// Action Types
export const NAVIGATE = 'NAVIGATE'
export const START = 'START'
export const RESET_STORE = 'RESET_STORE'
export const RESET_STORE_EXCEPT_STEP = 'RESET_STORE_EXCEPT_STEP'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const UPDATE_HOME_DETAILS = 'UPDATE_HOME_DETAILS'
export const UPDATE_ROOMS = 'UPDATE_ROOMS'
export const UPDATE_GARAGE = 'UPDATE_GARAGE'
export const UPDATE_DIFFERENTIAL = 'UPDATE_DIFFERENTIAL'
export const UPDATE_PHONE = 'UPDATE_PHONE'
export const UPDATE_PERSONAL = 'UPDATE_PERSONAL'
export const UPDATE_PRICING = 'UPDATE_PRICING'
export const UPDATE_SERVICES = 'UPDATE_SERVICES'
export const UPDATE_TOUR = 'UPDATE_TOUR'
export const UPDATE_LISTING = 'UPDATE_LISTING'

// Action creators
export const navigateTo = (step) => {
  amplitude.getInstance().logEvent(`seller-onboarding-${step}`);
  return {
    type: NAVIGATE,
    step: step
  }
}

export const start = (timestamp) => {
  return {
    type: START,
    value: timestamp
  }
}

export const resetStore = () => {
  return {
    type: RESET_STORE
  }
}

export const resetStoreExceptStep = () => {
  return {
    type: RESET_STORE_EXCEPT_STEP
  }
}

export const updateLocation = (value) => {
  return {
    type: UPDATE_LOCATION,
    value: value
  }
}

export const updateHomeDetails = (value) => {
  return {
    type: UPDATE_HOME_DETAILS,
    value: value
  }
}

export const updateRooms = (value) => {
  return {
    type: UPDATE_ROOMS,
    value: value
  }
}

export const updateGarage = (value) => {
  return {
    type: UPDATE_GARAGE,
    value: value
  }
}

export const updateDifferential = (value) => {
  return {
    type: UPDATE_DIFFERENTIAL,
    value: value
  }
}

export const updatePhone = (value) => {
  return {
    type: UPDATE_PHONE,
    value: value
  }
}

export const updatePersonal = (value) => {
  return {
    type: UPDATE_PERSONAL,
    value: value
  }
}

export const updatePricing = (value) => {
  return {
    type: UPDATE_PRICING,
    value: value
  }
}

export const updateServices = (value) => {
  return {
    type: UPDATE_SERVICES,
    value: value
  }
}

export const updateTour = (value) => {
  return {
    type: UPDATE_TOUR,
    value: value
  }
}

export const updateListing = (value) => {
  return {
    type: UPDATE_LISTING,
    value: value
  }
}
