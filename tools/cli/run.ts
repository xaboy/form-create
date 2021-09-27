/*
 * @Author       : djkloop
 * @Date         : 2021-09-15 15:13:17
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-19 16:10:22
 * @Description  : 头部注释
 * @FilePath     : /form-create2/tools/cli/run.ts
 */
import {program} from 'commander';
import path from 'path';
import chalk from 'chalk';
import build from '../lib/build';
// pkgUrl
const log = console.log
const commandExecUrl = process.cwd()
log()
log('    ' + chalk.green('command run path with: ', commandExecUrl))
log()
const pkgUrl = path.join(commandExecUrl, '/lerna.json');

program.on('--help', () => {
    log();
    log(chalk.blue.bold('  Usage:'), chalk.cyan.bold('tools build tools with Node 👍 ~'));
    log();
})

/// tools 版本
program
    .version(`@form-create/tools v${require(pkgUrl).version}`, '-v, --version', 'tools versions')

program
    .command('build [flag]')
    .description('build components && packages || build components || build packages')
    .option('-a,--all', 'Build @form-create/[all]packages') /// 默认打包components和packages
    .option('-c, --components <ui-compnents...>', 'Build @form-create/component-<ui-package> package or packages array') // 打单独的组件
    .option('-p, --packages <ui-package...>', 'Build @form-create/<ui-package> package or packages array') // 打单独的包
    .action((_: any, cmd: any) => build(_, cleanArgs(cmd)));

program.parse(process.argv);



// code with vue-cli: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js#L275
function camelize(str: string) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd: any) {
    const args: any = {}
    cmd.options.forEach((o: any) => {
        const key = camelize(o.long.replace(/^--/, ''))
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}