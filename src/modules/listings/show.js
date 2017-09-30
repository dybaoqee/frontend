export const REQUEST_LISTING = 'REQUEST_LISTING'
export const FETCH_LISTING_SUCCESS = 'FETCH_LISTING_SUCCESS'
export const FETCH_LISTING_FAILURE = 'FETCH_LISTING_FAILURE'
export const SWITCH_LISTING_POPUP = 'SWITCH_LISTING_POPUP'

const initialState = {
  listing: null,
  isFetching: false,
  isShowingPopup: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LISTING:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_LISTING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listing: action.index,
        receivedAt: action.receivedAt
      }

    case FETCH_LISTING_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    case SWITCH_LISTING_POPUP:
      return {
        ...state,
        isShowingPopup: !state.isShowingPopup
      }

    default:
      return state
  }
}

function requestListing() {
  return {
    type: REQUEST_LISTING
  }
}

function receiveListing(json) {
  return {
    type: FETCH_LISTING_SUCCESS,
    index: json.data,
    receivedAt: Date.now()
  }
}

function fetchListing(id) {
  return dispatch => {
    dispatch(requestListing())
    return fetch(process.env.REACT_APP_API_URL + 'listings/' + id)
      .then(response => response.json())
      .then(json => dispatch(receiveListing(json)))
  }
}

function shouldFetchListing(state, id) {
  const listing = state.listing

  if (!listing.listing) return true
  if (listing.listing.id === id) return false
  if (listing.isFetching) return false
  return listing.didInvalidate
}

export function fetchListingIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchListing(getState(), id)) {
      return dispatch(fetchListing(id))
    }
  }
}

export function switchPopup() {
  return {
    type: SWITCH_LISTING_POPUP
  }
}

export function postForm() {
  console.log('To post form');
  return {
    type: SWITCH_LISTING_POPUP
  }
}
