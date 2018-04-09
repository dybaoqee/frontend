const browserify = require('@cypress/browserify-preprocessor')
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  const options = browserify.defaultOptions

  options.browserifyOptions.transform[1][1].babelrc = true
  options.browserifyOptions.transform[1][1].plugins.push(
    'babel-plugin-transform-class-properties'
  )

  on('file:preprocessor', browserify(options))
}
