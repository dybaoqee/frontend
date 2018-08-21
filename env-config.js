const prod = process.env.NODE_ENV === 'production'
const staging = process.env.IS_STAGING === 'true'

let favicon

if (!prod) {
  favicon = 'favicon-dev.png'
} else if (staging) {
  favicon = 'favicon-staging.png'
} else {
  favicon = 'favicon.png'
}

module.exports = {
  'process.env.NODE_ENV': prod ? 'production' : 'development',
  'process.env.REACT_APP_API_URL':
    process.env.WEBSERVICE_BASE_URL || 'http://localhost:4000',
  'process.env.REACT_APP_CLOUDINARY_BASE_URL':
    'https://res.cloudinary.com/emcasa/image/upload',
  'process.env.REACT_APP_FAVICON': favicon,
  'process.env.GOOGLE_ANALYTICS_TRACKING_ID': prod
    ? process.env.GOOGLE_ANALYTICS_TRACKING_ID
    : null,
  'process.env.GOOGLE_MAPS_KEY':
    process.env.GOOGLE_MAPS_KEY || 'AIzaSyBZoa6AHssbg7GvCXYqmPN_PYfA4Xs0rmY',
  'process.env.TEST': process.env.TEST === 'cypress' ? 'cypress' : 'jest',
  'process.env.ADMIN_MESSENGER_ID': process.env.ADMIN_MESSENGER_ID || 30
}
