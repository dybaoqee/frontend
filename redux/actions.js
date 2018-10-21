// Action Types
const NAVIGATE = 'NAVIGATE'
const UPDATE_ROOMS = 'UPDATE_ROOMS'

// Action creators
const navigateTo = (step) => {
  return {
    type: NAVIGATE,
    step: step
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

  navigateTo,
  updateRooms
}
