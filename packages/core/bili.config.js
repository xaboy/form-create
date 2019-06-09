const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;
const {UI_LIB} = process.env;
const rollupConfig = {
    outputConfig: {
        exports: 'named'
    }
};

module.exports = {
    format: ['umd', 'umd-min'],
    banner: {
        author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create`,
        license,
        name,
        version
    },
    input: join(cwd, '/src/index.js'),
    output: {
        fileName: `form-create.${UI_LIB}[min].js`
    },
    extendRollupConfig: (config) => {
        config.outputConfig = Object.assign({}, config.outputConfig, {'outputConfig': rollupConfig.outputConfig});
        return config;
    },
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
    }
};