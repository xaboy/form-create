const webpack = require('webpack');
module.exports = {
    entry: __dirname + '/../src/index.js',
    output: {//输出文件
        filename: 'form-create.js',
        path: __dirname + '/../dist',
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
        new webpack.BannerPlugin('form-create v1.4 | github https://github.com/xaboy/form-create | author xaboy')
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
};
