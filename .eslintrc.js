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
        'plugin:prettier/recommended'
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
        'vue','prettier'
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
        "prettier/prettier": [
            "warn",
            {
                "arrowParens": "always"
            }
        ],
        "no-unused-vars":"warn"
    }
};