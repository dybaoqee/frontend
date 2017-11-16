const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.REACT_APP_API_URL': prod ? 'https://em-casa.herokuapp.com/' : 'http://localhost:4000/',
  'process.env.REACT_APP_S3_BASE_URL': 'https://s3-sa-east-1.amazonaws.com/emcasa/'
}
