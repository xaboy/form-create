/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 17:21:22
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-10-04 19:33:38
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
    const isComponentsAll = args?.components?.includes('all')
    const isPackagesAll = args?.packages?.includes('all')
    let tips = '';
    if (isAll) {
        tips = 'build all components and all packages'
    } else if (isComponentsAll) {
        tips = 'build all components'
    } else if (isPackagesAll) {
        tips = 'build all packages'
    }
    yellow(tips, true)
    const packageCreateTips = chalk.blue.bold('create-form-create-build-task: ')
    spinner = ora(packageCreateTips).start();
    /// default core packages
    // const defaultPkgs = ['core', 'data']
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
        /// 打印对应的组件
        await createBuildComponents(componentsAllPaths)
        /// 再打对应的包
        await createBuildPackages(packagesAllPaths)
        /// 退出
        await exit();
    } else {

        /// 单独打所有的component组件
        if(isComponentsAll) {
            const componentsAllPaths = getAllTargetsPath('components')
            if (!Object.keys(componentsAllPaths).length) {
                yellow('\n no build components task! please check buildFormCreateOptions or private with components/*/*/package.json \n')
                await exit(1)
            }

            await createBuildComponents(componentsAllPaths)
            await exit();
        }

        /// 单独打所有的package包
        if (isPackagesAll) {
            const packagesAllPaths = getAllTargetsPath('packages')
            if (!Object.keys(packagesAllPaths).length) {
                yellow('\n no build packages task! please check buildFormCreateOptions or private with packages/*/package.json \n')
                await exit(1)
            }

            await createBuildPackages(packagesAllPaths)
            await exit();
        }
    }
}

export default (_: any, args: any) => {
    return createBuildTask(args)
}