import {
  NAVIGATE,
  UPDATE_ROOMS
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
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.value
      }
    default:
      return state
  }
}

export default reducer
