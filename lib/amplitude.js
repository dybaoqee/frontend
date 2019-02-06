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

// Buyer Events
const BUYER_LANDING_PAGE = 'buyer-landing-page'

// Seller on-boarding events
const SELLER_ONBOARDING_EVENT_BASE = 'seller-onboarding-'

// Seller landing page
const SELLER_LANDING_PAGE = 'seller-landing-page'

function isAdmin() {
  if (process.browser && window) {
    const currentUser = get(window, '__NEXT_DATA__.props.initialProps.currentUser')
    return currentUser && currentUser.isAdmin
  }
  return false
}

/**
 * Logs an event to Amplitude. Properties are optional. Do not log anything if
 * the user is an Admin.
 * @param event
 * @param properties
 */
function log(event, properties) {
  if (!isAdmin()) {
    amplitude.getInstance().logEvent(event, properties)
  }
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
  BUYER_LANDING_PAGE,
  SELLER_ONBOARDING_EVENT_BASE,
  SELLER_LANDING_PAGE
}
