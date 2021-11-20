import chalk from "chalk";
import fs from "fs";
import { projRoot } from "./paths";


export function yellow(str: string, isBold: boolean = false) {
  isBold ? console.log(chalk.bold.yellow(str)) : console.log(chalk.yellow(str))
}

export function green(str: string, isBold: boolean = false) {
  isBold ? console.log(chalk.bold.green(str)) : console.log(chalk.green(str))
}

export function blue(str: string, isBold: boolean = false) {
  isBold ? console.log(chalk.bold.blue(str)) : console.log(chalk.blue(str))
}

export function red(str: string, isBold: boolean = false) {
  isBold ? console.log(chalk.bold.red(str)) : console.log(chalk.red(str))
}

export function errorAndExit(e) {
  red(e.message)
  process.exit(1)
}


export const targets = (dir: 'packages' | 'components' = 'packages') => {
  const componentsAllPaths = Object.create(null);
  const uiFoldersPath = fs.readdirSync(dir).filter(uiFolderPath => {
    if (fs.statSync(`${projRoot}/${dir}/${uiFolderPath}`).isDirectory()) {
      return true
    }
  })

  // uiFoldersPath.forEach(uiPath => {
  //   const pkg = require(`${projRoot}/${dir}/${uiPath}/package.json`)
  //   if (pkg.private || !pkg.buildFormCreateOptions) {
  //     blue(`\n info: ${projRoot}/${dir}/${uiPath}/package.json private is true or buildFormCreateOptions is not exists!`)
  //   }
  // })

  if (dir === 'packages') {
    const packagesFolderPath = []
    for (let index = 0; index < uiFoldersPath.length; index++) {
      const uiPath = uiFoldersPath[index];
      if (!fs.statSync(`${projRoot}/${dir}/${uiPath}`).isDirectory()) {
        continue;
      }
      const pkg = require(`${projRoot}/${dir}/${uiPath}/package.json`)
      fs.rmdirSync(`${projRoot}/${dir}/${uiPath}/dist`, { recursive: true });
      if (pkg.private || !pkg.buildFormCreateOptions) {
        red(`\n info: ${projRoot}/${dir}/${uiPath}/package.json private is true or buildFormCreateOptions is not exists!`)
        continue;
      }
      packagesFolderPath.push(`${projRoot}/${dir}/${uiPath}`)
      if (packagesFolderPath.length) {
        componentsAllPaths[uiPath] = packagesFolderPath
      }
    }
  }

  if (dir === 'components') {
    uiFoldersPath.forEach(uiPath => {
      const componentFolderPath = []
      const alen = fs.readdirSync(`${projRoot}/${dir}/${uiPath}`).length
      for (let index = 0; index < alen; index++) {
        const comPath = fs.readdirSync(`${projRoot}/${dir}/${uiPath}`)[index];
        if (!fs.statSync(`${projRoot}/${dir}/${uiPath}/${comPath}`).isDirectory()) {
          continue;
        }
        const pkg = require(`${projRoot}/${dir}/${uiPath}/${comPath}/package.json`)
        fs.rmdirSync(`${projRoot}/${dir}/${uiPath}/${comPath}/dist`, { recursive: true });
        if (pkg.private || !pkg.buildFormCreateOptions) {
          red(`\n info: ${projRoot}/${dir}/${uiPath}/${comPath}/package.json private is true or buildFormCreateOptions is not exists!`)
          continue;
        }
        componentFolderPath.push(`${projRoot}/${dir}/${uiPath}/${comPath}`)
      }
      if (componentFolderPath.length) {
        componentsAllPaths[uiPath] = componentFolderPath
      }
    })
  }


  return componentsAllPaths
}


export const getSingleComponentPaths = (dir: string = 'components', libname: string = '', comname: string = '') => {
  const fpath = Object.create(null)
  const _rootPath = dir
  const _libPath = libname
  const _compPath = comname

  if (!fs.statSync(`${projRoot}/${_rootPath}/${_libPath}/${_compPath}`).isDirectory()) {
    return
  }

  const pkg = require(`${projRoot}/${_rootPath}/${_libPath}/${_compPath}/package.json`)
  fs.rmdirSync(`${projRoot}/${_rootPath}/${_libPath}/${_compPath}/dist`, { recursive: true });
  if (pkg.private || !pkg.buildFormCreateOptions) {
    red(`\n info: ${projRoot}/${_rootPath}/${_libPath}/${_compPath}/package.json private is true or buildFormCreateOptions is not exists!`)
    return
  }
  fpath[_libPath] = [`${projRoot}/${_rootPath}/${_libPath}/${_compPath}`]

  return fpath
}

export const getSinglePackagePaths = (dir: string = 'packages', libname: string = '') => {
  const fpath = Object.create(null)
  const _rootPath = dir
  const _libPath = libname

  if (!fs.statSync(`${projRoot}/${_rootPath}/${_libPath}`).isDirectory()) {
    return
  }

  const pkg = require(`${projRoot}/${_rootPath}/${_libPath}/package.json`)
  fs.rmdirSync(`${projRoot}/${_rootPath}/${_libPath}/dist`, { recursive: true });
  if (pkg.private || !pkg.buildFormCreateOptions) {
    red(`\n info: ${projRoot}/${_rootPath}/${_libPath}/package.json private is true or buildFormCreateOptions is not exists!`)
    return
  }
  fpath[_libPath] = [`${projRoot}/${_rootPath}/${_libPath}`]

  return fpath
}

/// Get all the folder names under the current folder
export const getFolderNames = (folder: string, uiFolder: string) => {
  return fs.readdirSync(`${folder}/${uiFolder}`).map(uiFolderPath => {
    if (fs.statSync(`${projRoot}/${folder}/${uiFolder}`).isDirectory()) {
      fs.rmdirSync(`${projRoot}/${folder}/${uiFolder}/dist`, { recursive: true });
      return `${uiFolder}/${uiFolderPath}`
    }
  })
}