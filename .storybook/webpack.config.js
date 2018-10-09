module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.jsx?$/,
        include: require('path').resolve('./'),
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader'
      }
    ]
  }
})

