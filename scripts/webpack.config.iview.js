/*
 * @Methods: webpack.iview
 * @Desc: webpack.iview
 * @Author: djkloop
 * @Date: 2019-05-12 22:07:32
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-05-14 10:34:52
 */
const path = require('path');
const webpack = require('webpack');
const webpackMergeConfig = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const Config = require('webpack-chain');
const config = new Config();

const UI = 'iview';
const basePublicPath = path.join(__dirname, '/../', `/packages/${UI}`);
const baseSrcPath = path.join(basePublicPath + '/src/index.js');
const baseTemplatePath = path.join(basePublicPath + '/demo/component/index.html');
const devServerOpenPage = path.join(`packages/${UI}/demo/component/`);

// entry
config.entry('app').add(baseSrcPath).end();
// console.log(basePublicPath)
// console.log(baseSrcPath)
// console.log(baseDistPath)
// console.log(baseTemplatePath)
// console.log(config.toString());
const iviewConfig = webpackMergeConfig(baseWebpackConfig, {
    entry: {
        app: baseSrcPath
    },
    output: {
        filename: 'form-create.iview.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: baseTemplatePath,
            filename: baseTemplatePath,
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.UI': JSON.stringify(UI)
        })
    ],
    devServer: {
        openPage: devServerOpenPage,
        hot: true,
    },
    resolve: {
        alias: {
            [UI]: UI
        }
    }
});

module.exports = iviewConfig;