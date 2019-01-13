const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require("../package.json");

module.exports = {
    entry: {
        app: path.join(__dirname, '../src', 'index.js')
    },
    output: {//输出文件
        filename: 'dist/form-create.js',
        library: 'formCreate',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.BannerPlugin('form-create v' + pkg.version + ' | github https://github.com/xaboy/form-create | author xaboy'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../demo/index.html'),
            filename: path.resolve(__dirname, '../demo/index.html'),
            inject: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`
        }),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js',
            'iview': 'iview'
        }
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        iview: {
            root: 'iview',
            commonjs: 'iview',
            commonjs2: 'iview',
            amd: 'iview'
        }
    },

};
