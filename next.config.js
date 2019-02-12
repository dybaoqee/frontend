const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const isEmpty = require('lodash').isEmpty
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')

const {ANALYZE, BUILD, AWS_DEFAULT_REGION, AWS_S3_BUCKET_NAME} = process.env
const s3URL = `https://s3-${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_S3_BUCKET_NAME}`
const shouldUseAssetPrefix = !isEmpty(AWS_S3_BUCKET_NAME)

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
  env: {
    NODE_ENV: prod ? 'production' : 'development',
    APOLLO_ENGINE: process.env.APOLLO_ENGINE || null,
    REACT_APP_API_URL: process.env.WEBSERVICE_BASE_URL || 'http://localhost:4000',
    REACT_APP_CLOUDINARY_BASE_URL: 'https://res.cloudinary.com/emcasa/image/upload',
    REACT_APP_FAVICON: favicon,
    GOOGLE_ANALYTICS_TRACKING_ID: prod ? process.env.GOOGLE_ANALYTICS_TRACKING_ID : null,
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY || 'AIzaSyAxgyVJYcA8NjH3Qvr32agv8VQPLjSNrk4',
    TEST: process.env.TEST === 'cypress' ? 'cypress' : 'jest',
    ADMIN_MESSENGER_ID: process.env.ADMIN_MESSENGER_ID || 30,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || null,
    ACCOUNT_KIT_APP_SECRET: process.env.ACCOUNT_KIT_APP_SECRET || null
  },
  assetPrefix: shouldUseAssetPrefix ? s3URL : '',
  webpack: function(config, {isServer}) {
    if (ANALYZE) {
      config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true
        })
      )
    }
    // It turns out that the slug module, has a postinstall hook that creates some unicode files
    // to handle different languages & So.js is one of them & it holds mainly Arabic & Tibetan unicode symbols.
    config.plugins.push(
      new webpack.IgnorePlugin(/unicode\/category\/So/, /node_modules/)
    )
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (BUILD) {
      config.mode = 'production'

      if (shouldUseAssetPrefix) {
        config.plugins.push(
          new CompressionPlugin({
            asset: 'gzip/[path][query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/
          })
        )
      }
    }

    return config
  }
}
