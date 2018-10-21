// Action Types
const NAVIGATE = 'NAVIGATE'
const SELECT_BEDROOMS = 'SELECT_BEDROOMS'
const SELECT_MORE_BEDROOMS = 'SELECT_MORE_BEDROOMS'
const SELECT_SUITES = 'SELECT_SUITES'
const SELECT_BATHROOMS = 'SELECT_BATHROOMS'
const SELECT_MORE_BATHROOMS = 'SELECT_MORE_BATHROOMS'

// Action creators
const navigateTo = (step) => {
  return {
    type: NAVIGATE,
    step: step
  }
}

const selectBedrooms = (value) => {
  return {
    type: SELECT_BEDROOMS,
    value: value
  }
}

const selectMoreBedrooms = () => {
  return {
    type: SELECT_MORE_BEDROOMS
  }
}

const selectSuites = (value) => {
  return {
    type: SELECT_SUITES,
    value: value
  }
}

const selectBathrooms = (value) => {
  return {
    type: SELECT_BATHROOMS,
    value: value
  }
}

const selectMoreBathrooms = () => {
  return {
    type: SELECT_MORE_BATHROOMS
  }
}


export {
  NAVIGATE,
  SELECT_BEDROOMS,
  SELECT_MORE_BEDROOMS,
  SELECT_SUITES,
  SELECT_BATHROOMS,
  SELECT_MORE_BATHROOMS,

  navigateTo,
  selectBedrooms,
  selectMoreBedrooms,
  selectSuites,
  selectBathrooms,
  selectMoreBathrooms
}
