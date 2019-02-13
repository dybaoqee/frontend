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
  'process.env.APOLLO_ENGINE': process.env.APOLLO_ENGINE || null,
  'process.env.REACT_APP_API_URL':
    process.env.WEBSERVICE_BASE_URL || 'http://localhost:4000',
  'process.env.GARAGEM_URL': process.env.GARAGEM_URL || 'http://garagem.staging.emcasa.com',
  'process.env.REACT_APP_CLOUDINARY_BASE_URL':
    'https://res.cloudinary.com/emcasa/image/upload',
  'process.env.REACT_APP_FAVICON': favicon,
  'process.env.GOOGLE_ANALYTICS_TRACKING_ID': prod
    ? process.env.GOOGLE_ANALYTICS_TRACKING_ID
    : null,
  'process.env.GOOGLE_MAPS_KEY':
    process.env.GOOGLE_MAPS_KEY || 'AIzaSyAxgyVJYcA8NjH3Qvr32agv8VQPLjSNrk4',
  'process.env.TEST': process.env.TEST === 'cypress' ? 'cypress' : 'jest',
  'process.env.ADMIN_MESSENGER_ID': process.env.ADMIN_MESSENGER_ID || 30,
  'process.env.FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID || null,
  'process.env.ACCOUNT_KIT_APP_SECRET':
    process.env.ACCOUNT_KIT_APP_SECRET || null
}
