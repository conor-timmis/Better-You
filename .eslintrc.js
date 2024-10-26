module.exports = {
    "env": {
      "browser": true,
      "es2021": true,
      "jest": true,
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "settings": {
      "react": {
        "version": "16.0"
      }
    },
    "rules": {
      "react/prop-types": "off",
      "react/no-unknown-property": ["error", { ignore: ["jsx"] }],
    }
  };
  