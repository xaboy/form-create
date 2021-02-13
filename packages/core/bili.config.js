const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

const {UI_LIB} = process.env;

const rollupConfig = {
    outputConfig: {
        exports: 'named',
    }
};

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
        format: ['umd', 'umd-min'],
        moduleName: 'FormCreateFactory',
        fileName: 'index[min].js',
        extractCSS: false,
    },
    input: join(cwd, '/src/index.js'),
    extendRollupConfig: (config) => {
        config.outputConfig = Object.assign({}, config.outputConfig, {'outputConfig': rollupConfig.outputConfig});
        return config;
    },
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
        'UI': UI_LIB,
    }
};