const plugins = require('./config/babel-setup').plugins
const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    'next/babel'
  ],
  plugins
}

exports.plugins = plugins
