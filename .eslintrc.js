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
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'block-spacing':'error',
        'no-unused-vars':'warn',
        'object-curly-spacing':'error',
    }
};