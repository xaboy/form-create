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
import dayjs from 'dayjs';
import fs from 'fs';
import { exit } from 'process';
import shell from 'shelljs';
import createBuildComponents from './components';
import createBuildPackages from './packages';
import { blue, getFolderNames, getSingleComponentPaths, getSinglePackagePaths, red, targets as getAllTargetsPath, yellow } from './utils'


let spinner
const log = console.log
const context = process.cwd()


async function buildAllComponents(paths: string[] = []) {
    let componentsPathsObject = Object.create(null)
    paths.forEach((comPath: string) => {
        const [name, cname] = comPath.split('/')
        const componentsPaths = getSingleComponentPaths('components', name, cname)

        if (!componentsPathsObject[name]) {
            componentsPathsObject[name] = componentsPaths[name]
        } else {
            componentsPathsObject[name] = [...componentsPathsObject[name], ...componentsPaths[name]]
        }
    });
    await createBuildComponents(componentsPathsObject)
    await exit();
}


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
    } else {
        tips = '    build task time' + ' ' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '\n'
    }
    yellow(tips, true)
    blue('    ---------------------- start ----------------------\n', true)
    /// not all components
    if (!isComponentsAll && args?.components?.length) {
        const libs = args?.components
        if (libs.length === 1) {
            /// 先切包名
            const lib = libs[0];
            /// 单包下存在多个包
            if (lib.includes('*') || !lib.includes('/')) {
                /// xxx/*
                const [name] = !lib.includes('/') ? [lib] : lib.split('/')
                const _p = getFolderNames('components', name)
                buildAllComponents(_p)
            } else {
                const [name, cname] = lib.split('/')
                const componentsPaths = getSingleComponentPaths('components', name, cname)
                await createBuildComponents(componentsPaths)
                await exit();
            }
        } else {
            const compsPaths = args?.components;
            const allPaths = compsPaths.filter(cp => cp.includes('*') || !cp.includes('/'));
            const fixPaths = compsPaths.filter(cp => !cp.includes('*') && cp.includes('/'));
            let _all_ = [...fixPaths]
            if (allPaths.length) {
                allPaths.forEach(allp => {
                    const [name] = !allp.includes('/') ? [allp] : allp.split('/')
                    const _p = getFolderNames('components', name)
                    _all_ = [..._all_, ..._p]
                });
            }
            buildAllComponents(_all_)
        }
    }

    if (!isPackagesAll && args?.packages?.length) {
        const libs = args?.packages
        if (libs.length === 1) {
            /// 先切包名
            const lib = libs[0];
            const [name] = lib.split('/')
            const packagesAllPaths = getSinglePackagePaths('packages', name)
            await createBuildPackages(packagesAllPaths)
            await exit();
        } else {
            let componentsPathsObject = Object.create(null)
            libs.forEach(async lib => {
                const componentsPaths = getSinglePackagePaths('packages', lib)
                componentsPathsObject[lib] = componentsPaths[lib]
            });
            await createBuildPackages(componentsPathsObject)
            await exit();
        }
    }

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