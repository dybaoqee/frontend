const env = require('../env-config')

const plugins = [
  ['lodash'],
  ['transform-define', env],
  ['@babel/plugin-syntax-decorators', {legacy: true}],
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        components: './components',
        constants: './constants',
        lib: './lib',
        permissions: './permissions',
        services: './services',
        utils: './utils',
        styles: './styles'
      }
    }
  ],
  [
    'babel-plugin-styled-components',
    {
      ssr: true
    }
  ]
]

module.exports = {
  plugins
}
