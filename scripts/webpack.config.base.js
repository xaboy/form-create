/*
 * @Methods: webpack
 * @Desc: webpack.base
 * @Author: djkloop
 * @Date: 2019-05-12 21:58:25
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-05-13 00:29:06
 */
const webpack = require('webpack');
const pkg = require('../package.json');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        library: 'formCreate',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'iview': 'iview',
        }
    }

}
