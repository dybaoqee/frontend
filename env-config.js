const prod = process.env.NODE_ENV === 'production'

let api_url

if (!prod) {
  api_url = 'http://localhost:4000/'
} else if (process.env.IS_STAGING === 'true') {
  api_url = 'https://em-casa-backend-staging.herokuapp.com'
} else {
  api_url = 'https://em-casa.herokuapp.com'
}

module.exports = {
  'process.env.NODE_ENV': prod ? 'production' : 'development',
  'process.env.REACT_APP_API_URL': api_url,
  'process.env.REACT_APP_S3_BASE_URL': 'https://s3-sa-east-1.amazonaws.com/emcasa/'
}
