const {program} = require('commander')
const path = require('path')
const chalk = require('chalk')
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
    .description('build packages')
    .option('-a,--all', 'Build @form-create/[all]packages') /// 默认打包搓个
    .option('-p, --packages <ui-package...>', 'Build @form-create/<ui-package> package or packages array') // 默认打单独的包支持数据
    .action((_, cmd) => require('../lib/build')(_, cleanArgs(cmd)));

program.parse(process.argv);



// code with vue-cli: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js#L275
function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}