const version = process.env.VERSION || require('./package.json').version;
const { author, license, name: LIBNAME, homepage } = require('./package.json');
module.exports = {
  format: ["umd", "umd-min"],
  exports: "named",
  filename: `${LIBNAME}.js`,
  global: {
    vue: "Vue",
    iview: "iview"
  },
  name: "formCreate",
  external: ["vue", "Vue", "iview", "iView"],
  banner: '/*!\n' +
  ` * ${LIBNAME} v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ` * Github https://github.com/xaboy/form-create\n` +
  ` * Released under the ${license} License.\n` +
  ' */',
  js: "buble",
  replace: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VERSION': JSON.stringify(version)
  }
}