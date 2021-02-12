/**
 * 打包components文件
 */

const chalk = require('chalk')
const ora = require('ora');
const fs = require('fs');
const {exit} = require('process');

let spinner;
const log = console.log;
const context = process.cwd()

const createBuildTaskWithComponents = async () => {
    const tips = chalk.redBright.bold('start build all components')
    spinner = ora(tips).start()
    
}

export default {
    createBuildTaskWithComponents
}