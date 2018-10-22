// Action Types
const NAVIGATE = 'NAVIGATE'
const UPDATE_LOCATION = 'UPDATE_LOCATION'
const UPDATE_HOME_DETAILS = 'UPDATE_HOME_DETAILS'
const UPDATE_ROOMS = 'UPDATE_ROOMS'
const UPDATE_GARAGE = 'UPDATE_GARAGE'

// Action creators
const navigateTo = (step) => {
  return {
    type: NAVIGATE,
    step: step
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

export {
  NAVIGATE,
  UPDATE_LOCATION,
  UPDATE_HOME_DETAILS,
  UPDATE_ROOMS,
  UPDATE_GARAGE,

  navigateTo,
  updateLocation,
  updateHomeDetails,
  updateRooms,
  updateGarage
}
