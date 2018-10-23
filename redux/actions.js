// Action Types
const NAVIGATE = 'NAVIGATE'
const START = 'START'
const RESET_STORE = 'RESET_STORE'
const UPDATE_LOCATION = 'UPDATE_LOCATION'
const UPDATE_HOME_DETAILS = 'UPDATE_HOME_DETAILS'
const UPDATE_ROOMS = 'UPDATE_ROOMS'
const UPDATE_GARAGE = 'UPDATE_GARAGE'
const UPDATE_DIFFERENTIAL = 'UPDATE_DIFFERENTIAL'
const UPDATE_PHONE = 'UPDATE_PHONE'
const UPDATE_PERSONAL = 'UPDATE_PERSONAL'

// Action creators
const navigateTo = (step) => {
  return {
    type: NAVIGATE,
    step: step
  }
}

const start = (timestamp) => {
  return {
    type: START,
    value: timestamp
  }
}

const resetStore = () => {
  return {
    type: RESET_STORE
  }
}

const updateLocation = (value) => {
  return {
    type: UPDATE_LOCATION,
    value: value
  }
}

const updateHomeDetails = (value) => {
  return {
    type: UPDATE_HOME_DETAILS,
    value: value
  }
}

const updateRooms = (value) => {
  return {
    type: UPDATE_ROOMS,
    value: value
  }
}

const updateGarage = (value) => {
  return {
    type: UPDATE_GARAGE,
    value: value
  }
}

const updateDifferential = (value) => {
  return {
    type: UPDATE_DIFFERENTIAL,
    value: value
  }
}

const updatePhone = (value) => {
  return {
    type: UPDATE_PHONE,
    value: value
  }
}

const updatePersonal = (value) => {
  return {
    type: UPDATE_PERSONAL,
    value: value
  }
}

export {
  NAVIGATE,
  START,
  RESET_STORE,
  UPDATE_LOCATION,
  UPDATE_HOME_DETAILS,
  UPDATE_ROOMS,
  UPDATE_GARAGE,
  UPDATE_DIFFERENTIAL,
  UPDATE_PHONE,
  UPDATE_PERSONAL,

  navigateTo,
  start,
  resetStore,
  updateLocation,
  updateHomeDetails,
  updateRooms,
  updateGarage,
  updateDifferential,
  updatePhone,
  updatePersonal
}
