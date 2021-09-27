/**
 * 打包components文件
 */
import type { Ora } from 'ora';
import chalk from 'chalk';
import ora from 'ora';
import os from 'os';
import execa from 'execa';
import dayjs from 'dayjs';

let spinner: Ora;
const build = async (target: string, comp: string, targetName: string) => {
  dayjs().startOf('millisecond');
  spinner.text = chalk.bold.yellow(`start build ${targetName} ui components with ${comp} \n`);
  /// env 先写死
  const env = 'production'
  await execa(
    'rollup',
    [
      `-c`,
      '--environment',
      [
        `NODE_ENV:${env}`,
        `BUILD_TARGET:${targetName}`,
        `BUILD_TARGET_COMP:${comp}`,
        `BUILD_TYPE:component`,
        `BUILD_TARGET_PATH:${target}`
      ].filter(Boolean).join(',')
    ],
    { stdio: 'inherit' }
  );
  spinner.text = chalk.bold.green(`finished build ${targetName} ui components with ${comp} time: ${dayjs().startOf('millisecond').format('SSS')}ms. \n `);
}


const runParallel = async (maxConcurrency: number, source: string[], buildName: string, iteratorFn: Function) => {
  const ret = []
  const executing = []
  for (const item of source) {
    const comp = item.split('/').pop()
    const p = Promise.resolve().then(() => iteratorFn(item, comp, buildName))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

const buildAll = async (comAllTargets) => {
  await runParallel(os.cpus().length, comAllTargets[1], comAllTargets[0], build)
}

const createBuildComponents = async (cpaths: { [k: string]: any }) => {
  const tips = chalk.redBright.bold('\n start build all components \n')
  spinner = ora(tips).start()
  /// 根据每个不同的ui库去生成每个ui库下面的不同的组件打包
  const cps = Object.entries(cpaths)
  for (const cpath of cps) {
    await buildAll(cpath)
  }
}

export default createBuildComponents