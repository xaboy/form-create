module.exports = {
    'env': {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true,
        "commonjs": true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
    ],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        "parser": "babel-eslint",
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'block-spacing': 'error',
        'no-unused-vars': 'warn',
        'object-curly-spacing': 'error',
        'no-console': 'warn',
    }
};