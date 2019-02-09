const {author, license, name, version} = require('./package.json');
module.exports = {
    format: ["umd", "umd-min"],
    exports: "named",
    filename: `${name}.elm.js`,
    global: {
        vue: "Vue"
    },
    input: "src/element.js",
    name: "formCreate",
    external: ["vue", "Vue"],
    banner: '/*!\n' +
        ` * ${name} v${version} elementUI\n` +
        ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
        ` * Github https://github.com/xaboy/form-create\n` +
        ` * Released under the ${license} License.\n` +
        ' */',
    js: "babel",
    replace: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VERSION': JSON.stringify(version),
        'process.env.UI': JSON.stringify('element')
    }
}
