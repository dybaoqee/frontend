module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "object-curly-spacing": ["error", "never"],
    "quotes": ["error", "single"],
    "react/jsx-uses-vars": 1,
    "semi": ["error", "never"],
  },
  "globals": {
    "process": true,
  },
};
