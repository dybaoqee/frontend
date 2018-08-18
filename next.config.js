const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
const {ANALYZE, BUILD} = process.env

module.exports = {
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

    if (BUILD) {
      config.mode = 'production'
    }

    return config
  }
}
