const plugins = require('./config/babel-setup').plugins
const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    ['next/babel', {'preset-env': {modules: isTest ? 'commonjs' : false}}]
  ],
  plugins
}

exports.plugins = plugins
