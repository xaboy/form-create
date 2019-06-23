/*
 * @Methods: webpack
 * @Desc: webpack.base
 * @Author: djkloop
 * @Date: 2019-05-12 21:58:25
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-06-09 14:17:48
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
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            // use: ['to-string-loader', 'css-loader'],
            // loader: 'css-loader',
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]'
                    }
                }
            ]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
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
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.jsx', '.vue', '.json']
    }

}