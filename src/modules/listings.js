export const INDEX_REQUESTED = 'listings/INDEX_REQUESTED'
export const INDEX = 'listings/INDEX'

const initialState = {
  indexRequested: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INDEX_REQUESTED:
      return {
        ...state,
        indexRequested: true
      }

    case INDEX:
      return {
        ...state,
        indexRequested: !state.indexRequested
      }

    default:
      return state
  }
}

export const index = () => {
  return dispatch => {
    dispatch({
      type: INDEX_REQUESTED
    })

    dispatch({
      type: INDEX
    })
  }
}

