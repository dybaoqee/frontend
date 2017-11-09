export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'
export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS'
export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE'
export const LOCK_GOOGLE_MAP = 'LOCK_GOOGLE_MAP'
export const UNLOCK_GOOGLE_MAP = 'UNLOCK_GOOGLE_MAP'

const initialState = {
  index: false,
  isFetching: false,
  lockGoogleMap: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LISTINGS:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        index: action.index,
        receivedAt: action.receivedAt
      }

    case FETCH_LISTINGS_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    case LOCK_GOOGLE_MAP:
      return {
        ...state,
        lockGoogleMap: true
      }

    case UNLOCK_GOOGLE_MAP:
      return {
        ...state,
        lockGoogleMap: false
      }

    default:
      return state
  }
}

function requestPosts() {
  return {
    type: REQUEST_LISTINGS
  }
}

function receivePosts(json) {
  return {
    type: FETCH_LISTINGS_SUCCESS,
    index: json.data,
    receivedAt: Date.now()
  }
}

function lockGoogleMap() {
  return {
    type: LOCK_GOOGLE_MAP
  }
}

function unlockGoogleMap() {
  return {
    type: UNLOCK_GOOGLE_MAP
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(process.env.REACT_APP_API_URL + 'listings')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const listings = state.listings
  if (!listings.index) {
    return true
  } else if (listings.isFetching) {
    return false
  } else {
    return listings.didInvalidate
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}

export function handleScroll(scrollTop) {
  return (dispatch, getState) => {
    return (scrollTop > 133) ?
      dispatch(lockGoogleMap()) :
      dispatch(unlockGoogleMap())
  }
}
