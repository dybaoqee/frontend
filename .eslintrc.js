module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "prettier",
  ],
  "rules": {
    "array-bracket-spacing": [2, "never"],
    "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
    }],
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
