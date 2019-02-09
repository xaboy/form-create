const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require("./package.json");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        app: path.join(__dirname, './src', 'element.js')
    },
    output: {    //输出
        filename: 'dist/form-create.elm.js',
        library: 'formCreate',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './demo/element/index.html'),
            filename: path.resolve(__dirname, './demo/element/index.html'),
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`,
            'process.env.UI': JSON.stringify('element')
        }),
    ],
    devServer: {
        openPage: './demo/element/index.html',
        hot: true,
        inline: true,
        open: true
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js',
            'element-ui': 'element-ui'
        }
    }
};
