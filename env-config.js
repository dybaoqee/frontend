const prod = process.env.NODE_ENV === 'production'

let api_url
let favicon

if (!prod) {
  api_url = 'http://localhost:4000'
  favicon = 'favicon-dev.png'
} else if (process.env.IS_STAGING === 'true') {
  api_url = 'https://em-casa-backend-staging.herokuapp.com'
  favicon = 'favicon-staging.png'
} else {
  api_url = 'https://em-casa.herokuapp.com/'
  favicon ='favicon.png'
}

module.exports = {
  'process.env.NODE_ENV': prod ? 'production' : 'development',
  'process.env.REACT_APP_API_URL': api_url,
  'process.env.REACT_APP_S3_BASE_URL': 'https://s3-sa-east-1.amazonaws.com/emcasa',
  'process.env.REACT_APP_CLOUDINARY_BASE_URL': 'http://res.cloudinary.com/emcasa/image/upload',
  'process.env.REACT_APP_FAVICON': favicon
}
