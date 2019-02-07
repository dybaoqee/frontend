import get from 'lodash/get'

// Listing Search Events
export const LISTING_SEARCH_OPEN = 'listing-search-open'
export const LISTING_SEARCH_LOAD_MORE = 'listing-search-load-more'
export const LISTING_SEARCH_MAP_CLUSTER = 'listing-search-map-cluster'
export const LISTING_SEARCH_MAP_PIN = 'listing-search-map-pin'
export const LISTING_SEARCH_VIEW_LISTING = 'listing-search-view-listing'
export const LISTING_SEARCH_FAVORITE_LISTING = 'listing-search-favorite-listing'
export const LISTING_SEARCH_FILTER_OPEN = 'listing-search-filter-open'
export const LISTING_SEARCH_FILTER_CLOSE = 'listing-search-filter-close'
export const LISTING_SEARCH_FILTER_APPLY = 'listing-search-filter-apply'
export const LISTING_SEARCH_FILTER_CLEAR = 'listing-search-filter-clear'
export const LISTING_SEARCH_FILTER_LOCATION = 'listing-search-filter-location'
export const LISTING_SEARCH_FILTER_TOGGLE = 'listing-search-filter-toggle'
export const LISTING_SEARCH_NOT_FOUND = 'listing-search-not-found'

// Neighborhood Picker events
export const LISTING_SEARCH_NEIGHBORHOOD_OPEN = 'listing-search-neighborhood-open'
export const LISTING_SEARCH_NEIGHBORHOOD_APPLY = 'listing-search-neighborhood-apply'
export const LISTING_SEARCH_NEIGHBORHOOD_CLEAR = 'listing-search-neighborhood-clear'
export const LISTING_SEARCH_NEIGHBORHOOD_EXPAND = 'listing-search-neighborhood-expand'
export const LISTING_SEARCH_NEIGHBORHOOD_CHANGE_CITY = 'listing-search-neighborhood-change-city'
export const LISTING_SEARCH_NEIGHBORHOOD_SELECT_ALL = 'listing-search-neighborhood-select-all'

// Listing Details
export const LISTING_DETAIL_OPEN = 'listing-detail-open'
export const LISTING_DETAIL_SCHEDULE_VISIT = 'listing-detail-schedule-visit'
export const LISTING_DETAIL_PHOTOS_LEFT = 'listing-detail-photos-left'
export const LISTING_DETAIL_PHOTOS_RIGHT = 'listing-detail-photos-right'
export const LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN = 'listing-detail-photos-fullscreen-open'
export const LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE = 'listing-detail-photos-fullscreen-close'
export const LISTING_DETAIL_MATTERPORT_OPEN = 'listing-detail-matterport-open'
export const LISTING_DETAIL_MATTERPORT_CLOSE = 'listing-detail-matterport-close'
export const LISTING_DETAIL_VIEW_FEATURED_LISTING = 'listing-detail-view-featured-listing'

// Seller on-boarding
export const SELLER_ONBOARDING_EVENT_BASE = 'seller-onboarding-'

// Home events
export const BUYER_LANDING_PAGE = 'buyer-landing-page'
export const BUYER_LANDING_EXPLORE_LISTINGS = 'buyer-landing-explore-listings'
export const BUYER_LANDING_NEIGHBORHOOD_IMAGE = 'buyer-landing-neighborhood-image'
export const BUYER_LANDING_NEIGHBORHOOD_LINK = 'buyer-landing-neighborhood-link'
export const BUYER_LANDING_SCROLL_25 = 'buyer-landing-scroll-25'
export const BUYER_LANDING_SCROLL_50 = 'buyer-landing-scroll-50'
export const BUYER_LANDING_SCROLL_75 = 'buyer-landing-scroll-75'
export const BUYER_LANDING_SCROLL_100 = 'buyer-landing-scroll-100'
export const SELLER_LANDING_PAGE = 'seller-landing-page'
export const SELLER_LANDING_SCROLL_25 = 'seller-landing-scroll-25'
export const SELLER_LANDING_SCROLL_50 = 'seller-landing-scroll-50'
export const SELLER_LANDING_SCROLL_75 = 'seller-landing-scroll-75'
export const SELLER_LANDING_SCROLL_100 = 'seller-landing-scroll-100'

// Seller page
const SELLER_LANDING_EXPLORE_LISTINGS = 'seller-landing-explore-listings'

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
export function log(event, properties) {
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
export function getPreferredContactType(interestTypeId) {
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
export function normalizeLocation(location) {
  return {
    state: location.stateSlug,
    city: location.citySlug,
    neightborhood: location.name
  }
}
