// Action Types
const NAVIGATE = 'NAVIGATE'

// Action creators
const navigateTo = (step) => {
  return {
    type: NAVIGATE,
    step: step
  }
}

export {
  NAVIGATE,
  navigateTo
}
