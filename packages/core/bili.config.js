const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

const {UI_LIB} = process.env;

module.exports = {
    plugins: {
        commonjs: true,
    },
    banner: {
        author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create`,
        license,
        name,
        version
    },
    globals: {
        vue: 'Vue'
    },
    externals: ['vue', 'Vue'],
    output: {
        format: ['esm','esm-min'],
        moduleName: 'formCreateFactory',
        fileName: 'index[min].js',
        target: 'browser',
        extractCSS: false,
    },
    input: join(cwd, '/src/index.js'),
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
        'UI': UI_LIB,
    }
};