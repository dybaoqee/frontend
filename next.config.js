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

const findPlugin = ({plugins}, name) =>
  plugins.find((plugin) => plugin.constructor.name === name)
const findMinimizer = ({optimization}, name) =>
  (optimization.minimizer || []).find(
    (plugin) => plugin.constructor.name === name
  )

module.exports = {
  assetPrefix: shouldUseAssetPrefix ? s3URL : '',
  webpack: function(config, {dev, isServer}) {
    config.node = {fs: 'empty'}
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

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (
        entries['main.js'] &&
        !entries['main.js'].includes(
          './utils/polyfills/intersection-observer.js'
        )
      ) {
        entries['main.js'].unshift('./utils/polyfills/intersection-observer.js')
      }
      return entries
    }

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

    if (!dev) {
      config.devtool = 'source-map'
      const minimizer = findMinimizer(config, 'TerserPlugin') || findPlugin(config, 'UglifyJsPlugin')
      if (minimizer) minimizer.options.sourceMap = true
    }
    return config
  }
}
