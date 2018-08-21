const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')

const {ANALYZE, BUILD, AWS_DEFAULT_REGION, AWS_S3_BUCKET_NAME} = process.env
const s3URL = `https://s3-${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_S3_BUCKET_NAME}`
const shouldUseAssetPrefix = AWS_S3_BUCKET_NAME !== ''

module.exports = {
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
    }

    return config
  }
}
