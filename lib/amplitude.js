// Listing Search Events
const LISTING_SEARCH_OPEN = 'listing-search-open'
const LISTING_SEARCH_LOAD_MORE = 'listing-search-load-more'
const LISTING_SEARCH_MAP = 'listing-search-map'
const LISTING_SEARCH_SELECT_LISTING = 'listing-search-select-listing'
const LISTING_SEARCH_FAVORITE_LISTING = 'listing-search-favorite-listing'
const LISTING_SEARCH_FILTER_OPEN = 'listing-search-filter-open'
const LISTING_SEARCH_FILTER_CLOSE = 'listing-search-filter-close'
const LISTING_SEARCH_FILTER_APPLY = 'listing-search-filter-apply'
const LISTING_SEARCH_FILTER_CLEAR = 'listing-search-filter-clear'
const LISTING_SEARCH_FILTER_LOCATION = 'listing-search-filter-location'
const LISTING_SEARCH_FILTER_TOGGLE = 'listing-search-filter-toggle'

// Buyer Events
const BUYER_LANDING_PAGE = 'buyer-landing-page'

// Seller on-boarding events
const SELLER_ONBOARDING_EVENT_BASE = 'seller-onboarding-'

// Seller landing page
const SELLER_LANDING_PAGE = 'seller-landing-page'

function log(event, properties) {
  amplitude.getInstance().logEvent(event, properties)
}

export {
  log,
  LISTING_SEARCH_OPEN,
  LISTING_SEARCH_LOAD_MORE,
  LISTING_SEARCH_MAP,
  LISTING_SEARCH_SELECT_LISTING,
  LISTING_SEARCH_FAVORITE_LISTING,
  LISTING_SEARCH_FILTER_OPEN,
  LISTING_SEARCH_FILTER_CLOSE,
  LISTING_SEARCH_FILTER_APPLY,
  LISTING_SEARCH_FILTER_CLEAR,
  LISTING_SEARCH_FILTER_LOCATION,
  LISTING_SEARCH_FILTER_TOGGLE,
  BUYER_LANDING_PAGE,
  SELLER_ONBOARDING_EVENT_BASE,
  SELLER_LANDING_PAGE
}
