import { getUser } from 'lib/user'

/**
 * Logs an event. Properties are optional. Do not log anything if
 * the user is an Admin.
 * @param event event name.
 * @param properties amplitude event properties.
 * @param gtmProperties additional properties to add to the gtm event.
 */
export function log(event, properties, gtmProperties) {
  // Skip log if admin
  const currentUser = getUser()
  if (isAdmin(currentUser)) {
    return
  }

  // Amplitude Log
  if (currentUser && currentUser.id) {
    amplitude.getInstance().setUserId(currentUser.id)
  }
  amplitude.getInstance().logEvent(event, properties)

  // Gtag
  let gtmEvent = GTM_EVENTS[event]
  if (gtmEvent) {
    if (event === LISTING_SEARCH_NEIGHBORHOOD_APPLY && (!properties || !properties.fromHome)) {
      return
    }
    gtmEvent = Object.assign(gtmEvent, gtmProperties)
    window.dataLayer.push(gtmEvent)
  }
}

/**
 * Creates an object containing listing info to be passed as Amplitude event property.
 * @param listing
 */
export function getListingInfoForLogs(listing) {
  const {id, address, area, bathrooms, floor, garageSpots, price, rooms, type, maintenanceFee, propertyTax} = listing
  return {
    listingId: id,
    neighborhood: address.neighborhoodSlug,
    city: address.citySlug,
    area,
    bathrooms,
    floor,
    garageSpots,
    price,
    rooms,
    type,
    maintenanceFee,
    propertyTax
  }
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

/**
 * Return true if user is admin.
 * @param currentUser
 */
function isAdmin(currentUser) {
  return currentUser && currentUser.isAdmin
}

// Listing Search Events
export const LISTING_SEARCH_OPEN = 'listing-search-open'
export const LISTING_SEARCH_LOAD_MORE = 'listing-search-load-more'
export const LISTING_SEARCH_MAP_CLUSTER = 'listing-search-map-cluster'
export const LISTING_SEARCH_MAP_PIN = 'listing-search-map-pin'
export const LISTING_SEARCH_MAP_PAN = 'listing-search-map-pan'
export const LISTING_SEARCH_MAP_ZOOM = 'listing-search-map-zoom'
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
export const LISTING_DETAIL_OPEN_VISIT_FORM = 'listing-detail-open-visit-form'
export const LISTING_DETAIL_SCHEDULE_VISIT = 'listing-detail-schedule-visit'
export const LISTING_DETAIL_PHOTOS_LEFT = 'listing-detail-photos-left'
export const LISTING_DETAIL_PHOTOS_RIGHT = 'listing-detail-photos-right'
export const LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN = 'listing-detail-photos-fullscreen-open'
export const LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE = 'listing-detail-photos-fullscreen-close'
export const LISTING_DETAIL_MATTERPORT_OPEN = 'listing-detail-matterport-open'
export const LISTING_DETAIL_MATTERPORT_CLOSE = 'listing-detail-matterport-close'
export const LISTING_DETAIL_VIEW_FEATURED_LISTING = 'listing-detail-view-featured-listing'
export const LISTING_DETAIL_EXPAND_DESCRIPTION = 'listing-detail-expand-description'

// Seller on-boarding
export const SELLER_ONBOARDING_EVENT_BASE = 'seller-onboarding-'
export const SELLER_ONBOARDING_EDIT_PRICE = 'seller-onboarding-edit-price'
export const SELLER_ONBOARDING_EDIT_PRICE_CANCEL = 'seller-onboarding-edit-price-cancel'
export const SELLER_ONBOARDING_EDIT_PRICE_CONFIRM = 'seller-onboarding-edit-price-confirm'

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
export const SELLER_LANDING_EXPLORE_LISTINGS = 'seller-landing-explore-listings'

// Login actions
export const LANDING_LOGIN = 'landing-login'
export const LOGIN_SUCCESS = 'login-success'
export const LOGIN_FAIL = 'login-fail'
export const SIGNUP_SUCCESS = 'signup-success'

// Profile Pages
export const PROFILE_OPEN = 'profile-open'
export const PROFILE_MY_PROFILE = 'profile-my-profile'
export const PROFILE_MY_LISTINGS = 'profile-my-listings'
export const PROFILE_FAVORITES = 'profile-favorites'
export const PROFILE_LOGOUT = 'profile-logout'
export const PROFILE_EDIT = 'profile-edit'
export const PROFILE_EDIT_CANCEL = 'profile-edit-cancel'
export const PROFILE_EDIT_SAVE = 'profile-edit-save'
export const PROFILE_FAVORITES_EXPLORE_LISTINGS = 'profile-favorites-explore-listings'

// Calculator
export const CALCULATOR_USED = 'calculator-used'

// Data Layer
const GTM_EVENTS = {
  [SIGNUP_SUCCESS]: {
    action: 'User Signed up',
    event: 'user_signed_up'
  },
  [LISTING_SEARCH_NEIGHBORHOOD_APPLY]: {
    action: 'User Search Home Page',
    event: 'search_home'
  },
  [CALCULATOR_USED]: {
    action: 'User used calculator',
    event: 'user_used_calculator'
  }
}
