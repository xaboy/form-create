/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 17:21:22
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-20 18:59:45
 * @Description  : 头部注释
 * @FilePath     : /form-create2/tools/lib/build.ts
 */
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import { exit } from 'process';
import shell from 'shelljs';
import createBuildComponents  from './components';
import createBuildPackages from './packages';
import { targets as getAllTargetsPath, yellow } from './utils'


let spinner
const log = console.log
const context = process.cwd()

async function createBuildTask(args: any) {
    const isAll = args.all || Object.keys(args).length === 0
    yellow(isAll ? 'all packages' : args.packages.join(', ') + ' packages', true)
    const packageCreateTips = chalk.blue.bold('create-form-create-build-task: ')
    // const packageCreateBuildingTips = chalk.yellow.bold('create-form-create-build-task-building: ', tips)
    // const packageCreateFinishSuccessTips = chalk.green.bold('create-form-create-build-task-success: ', tips)
    // const packageCreateFinishErrorTips = chalk.redBright.bold('create-form-create-build-task-error: ')
    spinner = ora(packageCreateTips).start();
    /// default core packages
    const defaultPkgs = ['core', 'data']
    /// 如果是打包全部
    if (isAll) {
        /// 先打对应的依赖components
        const componentsAllPaths = getAllTargetsPath('components')
        const packagesAllPaths = getAllTargetsPath('packages')
        if (!Object.keys(componentsAllPaths).length && !Object.keys(packagesAllPaths).length) {
            yellow('\n no build components and packages task! please check buildFormCreateOptions or private with components/*/*/package.json \n')
            exit(1);
        }
        if (!Object.keys(componentsAllPaths).length) {
            yellow('\n no build components task! please check buildFormCreateOptions or private with components/*/*/package.json \n')
        }
        if (!Object.keys(packagesAllPaths).length) {
            yellow('\n no build packages task! please check buildFormCreateOptions or private with packages/*/package.json \n')
        }
        await createBuildComponents(componentsAllPaths)
        /// 再打对应的包
        await createBuildPackages(packagesAllPaths)

        await exit();
        // spinner.text = packageCreateBuildingTips + '\n';
        // shell.exec('lerna run build', (code) => {
        //     if (code !== 0) {
        //         exit(code)
        //     } else {
        //         spinner.succeed(packageCreateFinishSuccessTips)
        //         exit(code)
        //     }
        // })
    } else {
        /// 处理单独的包
        // spinner.text = packageCreateBuildingTips + '\n';
        // args.packages.forEach((scope) => {
        //     const isExists = fs.existsSync(context + '/packages/' + scope)
        //     /// check packages folder exists package
        //     if (!isExists) {
        //         spinner.fail(packageCreateFinishErrorTips + chalk.red.bold(`In the packages folder no [${scope}] package name, Please check packages folder have [${scope}] name.`))
        //         exit(1)
        //     }
        // })
        // /// building
        // const addPrefix = '--scope @form-create/'
        // const packagesNames = []
        // defaultPkgs.concat(args.packages).forEach(scope => {
        //     packagesNames.push(addPrefix + scope)
        // })
        // /// lerna command
        // const lernaBuildPackagesCommand = `lerna run build ${packagesNames.join(' ')}`
        // shell.exec(lernaBuildPackagesCommand, (code) => {
        //     if (code !== 0) {
        //         exit(code)
        //     } else {
        //         spinner.succeed(packageCreateFinishSuccessTips)
        //         exit(code)
        //     }
        // })

    }
}

export default (_: any, args: any) => {
    return createBuildTask(args)
}