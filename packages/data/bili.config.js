const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

const {LIB} = process.env;

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
    output: {
        format: ['umd-min'],
        moduleName: LIB,
        fileName: `${LIB}.js`,
    },
    input: join(cwd, `/src/${LIB}.js`),
    extendRollupConfig: (config) => {
        config.outputConfig = Object.assign({}, config.outputConfig, {'outputConfig': rollupConfig.outputConfig});
        return config;
    },
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
    }
};