const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

const {UI_LIB} = process.env;
console.log(`开始打包 -> ${UI_LIB} \n`);

module.exports = {
    plugins: {
        commonjs: true,
        postcss: {
            modules: {
                generateScopedName: '[local]'
            }
        }
    },
    banner: {
        author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create`,
        license,
        name,
        version
    },
    globals: {
        vue: 'Vue',
        ELEMENT: 'element-ui'
    },
    externals: ['vue', 'Vue', 'element-ui', 'elementUI'],
    output: {
        format: ['umd', 'umd-min'],
        moduleName: 'formCreate',
        fileName: 'form-create[min].js',
        extractCSS: false
    },
    input: join(cwd, '/src/index.js'),
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
        'UI': UI_LIB,
    }
};