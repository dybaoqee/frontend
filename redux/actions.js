// Action Types
const NAVIGATE = 'NAVIGATE'
const SELECT_BEDROOMS = 'SELECT_BEDROOMS'
const SELECT_SUITES = 'SELECT_SUITES'
const SELECT_BATHROOMS = 'SELECT_BATHROOMS'

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

export {
  NAVIGATE,
  SELECT_BEDROOMS,
  SELECT_SUITES,
  SELECT_BATHROOMS,  

  navigateTo,
  selectBedrooms,
  selectSuites,
  selectBathrooms
}
