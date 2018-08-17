const env = require('../env-config')

const plugins = [
  ['lodash'],
  ['transform-define', env],
  ['transform-decorators-legacy'],
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
