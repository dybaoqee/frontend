// Action Types
const NAVIGATE = 'NAVIGATE'
const UPDATE_LOCATION = 'UPDATE_LOCATION'
const UPDATE_ROOMS = 'UPDATE_ROOMS'

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

const updateRooms = (value) => {
  return {
    type: UPDATE_ROOMS,
    value: value
  }
}

export {
  NAVIGATE,
  UPDATE_ROOMS,
  UPDATE_LOCATION,

  navigateTo,
  updateRooms,
  updateLocation
}
