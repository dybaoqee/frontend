import get from 'lodash/get'

// Listing Search Events
const LISTING_SEARCH_OPEN = 'listing-search-open'
const LISTING_SEARCH_LOAD_MORE = 'listing-search-load-more'
const LISTING_SEARCH_MAP_CLUSTER = 'listing-search-map-cluster'
const LISTING_SEARCH_MAP_PIN = 'listing-search-map-pin'
const LISTING_SEARCH_VIEW_LISTING = 'listing-search-view-listing'
const LISTING_SEARCH_FAVORITE_LISTING = 'listing-search-favorite-listing'
const LISTING_SEARCH_FILTER_OPEN = 'listing-search-filter-open'
const LISTING_SEARCH_FILTER_CLOSE = 'listing-search-filter-close'
const LISTING_SEARCH_FILTER_APPLY = 'listing-search-filter-apply'
const LISTING_SEARCH_FILTER_CLEAR = 'listing-search-filter-clear'
const LISTING_SEARCH_FILTER_LOCATION = 'listing-search-filter-location'
const LISTING_SEARCH_FILTER_TOGGLE = 'listing-search-filter-toggle'

// Neighborhood Picker events
const LISTING_SEARCH_NEIGHBORHOOD_OPEN = 'listing-search-neighborhood-open'
const LISTING_SEARCH_NEIGHBORHOOD_APPLY = 'listing-search-neighborhood-apply'
const LISTING_SEARCH_NEIGHBORHOOD_CLEAR = 'listing-search-neighborhood-clear'
const LISTING_SEARCH_NEIGHBORHOOD_EXPAND = 'listing-search-neighborhood-expand'
const LISTING_SEARCH_NEIGHBORHOOD_CHANGE_CITY = 'listing-search-neighborhood-change-city'
const LISTING_SEARCH_NEIGHBORHOOD_SELECT_ALL = 'listing-search-neighborhood-select-all'

// Listing Details
const LISTING_DETAIL_OPEN = 'listing-detail-open'
const LISTING_DETAIL_SCHEDULE_VISIT = 'listing-detail-schedule-visit'
const LISTING_DETAIL_PHOTOS_LEFT = 'listing-detail-photos-left'
const LISTING_DETAIL_PHOTOS_RIGHT = 'listing-detail-photos-right'
const LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN = 'listing-detail-photos-fullscreen-open'
const LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE = 'listing-detail-photos-fullscreen-close'
const LISTING_DETAIL_MATTERPORT_OPEN = 'listing-detail-matterport-open'
const LISTING_DETAIL_MATTERPORT_CLOSE = 'listing-detail-matterport-close'

// Buyer Events
const BUYER_LANDING_PAGE = 'buyer-landing-page'

// Seller on-boarding events
const SELLER_ONBOARDING_EVENT_BASE = 'seller-onboarding-'

// Seller landing page
const SELLER_LANDING_PAGE = 'seller-landing-page'

/**
 * Returns the logged in user object or null if there is none.
 */
function getUser() {
  if (process.browser && window) {
    return get(window, '__NEXT_DATA__.props.initialProps.currentUser')
  }
  return null
}

/**
 * Return true if user is admin.
 * @param currentUser
 */
function isAdmin(currentUser) {
  return currentUser && currentUser.isAdmin
}

/**
 * Logs an event to Amplitude. Properties are optional. Do not log anything if
 * the user is an Admin.
 * @param event
 * @param properties
 */
function log(event, properties) {
  const currentUser = getUser()
  if (!isAdmin(currentUser)) {
    if (currentUser && currentUser.id) {
      amplitude.getInstance().setUserId(currentUser.id)
    }
    amplitude.getInstance().logEvent(event, properties)
  }
}

/**
 * Returns the user's preferred contact type when scheduling a visit.
 * @param interestTypeId
 */
function getPreferredContactType(interestTypeId) {
  const contactTypes = {
    1: 'call-within-5-min',
    2: 'call-at',
    3: 'email',
    4: 'whatsapp'
  }
  return contactTypes[interestTypeId]
}

/**
 * Returns a location object ready to be sent to Amplitude as an Event Property.
 * @param location
 */
function normalizeLocation(location) {
  return {
    state: location.stateSlug,
    city: location.citySlug,
    neightborhood: location.name
  }
}

export {
  log,
  getPreferredContactType,
  normalizeLocation,

  LISTING_SEARCH_OPEN,
  LISTING_SEARCH_LOAD_MORE,
  LISTING_SEARCH_MAP_CLUSTER,
  LISTING_SEARCH_MAP_PIN,
  LISTING_SEARCH_VIEW_LISTING,
  LISTING_SEARCH_FAVORITE_LISTING,
  LISTING_SEARCH_FILTER_OPEN,
  LISTING_SEARCH_FILTER_CLOSE,
  LISTING_SEARCH_FILTER_APPLY,
  LISTING_SEARCH_FILTER_CLEAR,
  LISTING_SEARCH_FILTER_LOCATION,
  LISTING_SEARCH_FILTER_TOGGLE,

  LISTING_SEARCH_NEIGHBORHOOD_OPEN,
  LISTING_SEARCH_NEIGHBORHOOD_APPLY,
  LISTING_SEARCH_NEIGHBORHOOD_CLEAR,
  LISTING_SEARCH_NEIGHBORHOOD_EXPAND,
  LISTING_SEARCH_NEIGHBORHOOD_CHANGE_CITY,
  LISTING_SEARCH_NEIGHBORHOOD_SELECT_ALL,

  LISTING_DETAIL_OPEN,
  LISTING_DETAIL_SCHEDULE_VISIT,
  LISTING_DETAIL_PHOTOS_LEFT,
  LISTING_DETAIL_PHOTOS_RIGHT,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE,
  LISTING_DETAIL_MATTERPORT_OPEN,
  LISTING_DETAIL_MATTERPORT_CLOSE,

  BUYER_LANDING_PAGE,
  SELLER_ONBOARDING_EVENT_BASE,
  SELLER_LANDING_PAGE
}
