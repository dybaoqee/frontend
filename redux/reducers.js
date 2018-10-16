import {
  NAVIGATE
} from './actions'

const initialState = {
  step: 'intro'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        step: action.step
      }
    default:
      return state
  }
}

export default reducer
