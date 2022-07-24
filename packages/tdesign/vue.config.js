/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:16:03
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-21 17:18:46
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/tdesign/vue.config.js
 */
module.exports = {
    pages: {
        app: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                },
            ]
        }
    }
}
