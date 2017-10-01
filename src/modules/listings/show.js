export const REQUEST_LISTING = 'REQUEST_LISTING'
export const FETCH_LISTING_SUCCESS = 'FETCH_LISTING_SUCCESS'
export const FETCH_LISTING_FAILURE = 'FETCH_LISTING_FAILURE'
export const SWITCH_LISTING_POPUP = 'SWITCH_LISTING_POPUP'
export const POST_LISTING_INTEREST = 'POST_LISTING_INTEREST'
export const POST_LISTING_INTEREST_SUCCESS = 'POST_LISTING_INTEREST_SUCCESS'
export const CLOSE_POST_SUCCESS_POPUP = 'CLOSE_POST_SUCCESS_POPUP'

const initialState = {
  listing: null,
  isFetching: false,
  isShowingPopup: false,
  isShowingPostSuccessPopup: false
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

    case POST_LISTING_INTEREST:
      return {
        ...state,
        isShowingPopup: false
      }

    case POST_LISTING_INTEREST_SUCCESS:
      return {
        ...state,
        isShowingPostSuccessPopup: true
      }

    case CLOSE_POST_SUCCESS_POPUP:
      return {
        ...state,
        isShowingPostSuccessPopup: false
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

function willPostForm() {
  return {
    type: POST_LISTING_INTEREST
  }
}

function didPostForm() {
  return {
    type: POST_LISTING_INTEREST_SUCCESS
  }
}

export function closeSuccessPostPopup() {
  return {
    type: CLOSE_POST_SUCCESS_POPUP
  }
}

export function postForm() {
  return (dispatch, getState) => {
    dispatch(willPostForm())

    const { name, email, phone } = getState().form.listingInterest.values
    const { id } = getState().listing.listing

    return fetch(process.env.REACT_APP_API_URL + 'users', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          phone: phone
        },
        listing: {
          id: id
        }
      })
    }).then(response => response.json())
      .then(json => dispatch(didPostForm(json)))
  }
}
