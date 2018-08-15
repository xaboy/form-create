const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {//输出文件
        filename: 'form-create.min.js',
        // filename: 'form-create.js',
        path: __dirname + '/dist',
        libraryTarget:'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output:{
                comments:false,
                beautify: false
            }
        }),
        new webpack.BannerPlugin('form-create v1.3 | github https://github.com/xaboy/form-create | author xaboy')
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
};