const plugins = require('./config/babel-setup').plugins

module.exports = {
  env: {
    test: {
      presets: [['next/babel', {'preset-env': {modules: 'commonjs'}}]],
      plugins
    },

    development: {
      presets: [['@babel/preset-env', {modules: 'commonjs'}], 'next/babel'],
      plugins
    },

    production: {
      presets: [['@babel/preset-env', {modules: 'commonjs'}], 'next/babel'],
      plugins
    }
  }
}

exports.plugins = plugins
