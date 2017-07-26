export const FETCH_LISTINGS_REQUEST = 'FETCH_LISTINGS_REQUEST'
export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS'
export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE'

const initialState = {
  indexRequested: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        indexRequested: true
      }

    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        indexRequested: false
      }

    case FETCH_LISTINGS_FAILURE:
      return {
        ...state,
        indexRequested: false
      }

    default:
      return state
  }
}

export const index = () => {
  return dispatch => {
    dispatch({
      type: FETCH_LISTINGS_REQUEST
    })

    dispatch({
      type: FETCH_LISTINGS_SUCCESS
    })
  }
}

