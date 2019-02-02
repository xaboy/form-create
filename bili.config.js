const {author, license, name, version} = require('./package.json');
module.exports = {
    format: ["umd", "umd-min"],
    exports: "named",
    filename: `${name}.js`,
    global: {
        vue: "Vue",
        iview: "iview"
    },
    input: "src/index.js",
    name: "formCreate",
    external: ["vue", "Vue", "iview", "iView"],
    banner: '/*!\n' +
        ` * ${name} v${version} iviewUI\n` +
        ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
        ` * Github https://github.com/xaboy/form-create\n` +
        ` * Released under the ${license} License.\n` +
        ' */',
    js: "babel",
    replace: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VERSION': JSON.stringify(version),
        'process.env.UI': JSON.stringify('iview')
    }
}
