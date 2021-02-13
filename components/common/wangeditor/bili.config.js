const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

console.log(`开始打包 component -> ${name}\n`);

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
        author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create with ${name}`,
        license,
        name,
        version
    },
    output: {
        format: ['umd-min'],
        moduleName: 'FcEditor',
        fileName: 'index.js',
        extractCSS: false
    },
    
    input: join(cwd, '/src/index.js')
};
