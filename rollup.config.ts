/*
 * @Author       : djkloop
 * @Date         : 2021-09-15 20:15:29
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-20 18:53:25
 * @Description  : rollup.config.ts
 * @FilePath     : /form-create2/rollup.config.ts
 *
 *
 * ****************************************** !!!Notice!!! ***********************************************
 *
 *    不要在本文件的函数参数上加ts类型，esno貌似支持的不完善
 *
 *    Do not add ts type to the function parameters of this file, esno seems to be imperfectly supported
 *
 *    issues:
 *      Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)
 *
 *  ******************************************************************************************************
 */
import path from 'path';
import fs from 'fs';
import humps from 'humps';
import stringifyAuthor from 'stringify-author'

/// plugins
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { cssUrl } from '@sixian/css-url';
import externals from 'rollup-plugin-node-externals';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import replace from "@rollup/plugin-replace";
import multiInput from 'rollup-plugin-multi-input';

// console.log()
// console.log(process.env.BUILD_TARGET_PATH, ' ------------------------\n')
// console.log(process.env.BUILD_TARGET_COMP, ' ------------------------\n')
// console.log()

// const masterVersion = require('./package.json').version
const buildRootDir = path.resolve(process.env.BUILD_TARGET_PATH)
// const packageDir = path.resolve(buildRootDir, process.env.BUILD_TARGET)
const resolve = p => path.resolve(buildRootDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildFormCreateOptions || {}
// const name = packageOptions.filename || path.basename(packageDir)
const exportName = packageOptions.exportName || humps.pascalize(`fc${process.env.BUILD_TARGET_COMP}`)
const fileName = packageOptions.fileName || 'index'
const libName = packageOptions.name || pkg.name
const version = pkg.version
const isPackaegs = process.env.BUILD_TYPE === 'packages'
const UI_LIB = process.env.BUILD_TARGET
const ExtendExternals = packageOptions.extendExternals || []
const ExtendGlobal = packageOptions.extendGlobal || {}
const isMult = packageOptions.isMulti


const _banner = {
  author: isPackaegs ? `2018-${new Date().getFullYear()} ${pkg.author}\n * Github https://github.com/xaboy/form-create` : `2018-${new Date().getFullYear()} ${pkg.author}\n * Github https://github.com/xaboy/form-create with ${process.env.BUILD_TARGET_COMP}`,
  license: pkg.license,
  name: libName,
  version
}

/// output config format and file
const outputConfigs = {
  'umd': {
    file: resolve(`dist/${fileName}.js`),
    format: `umd`
  },
  'esm': {
    file: resolve(`dist/${fileName}.esm.js`),
    format: `es`
  },
}

const defaultFormats = ['umd','esm']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))

if (process.env.NODE_ENV === 'production') {
  packageFormats.forEach(format => {
    packageConfigs.push(createMinifiedConfig(format))
  })
}

/// https://github.com/egoist/bili/blob/master/src/utils/get-banner.ts
function createBanner(banner, pkg) {
  if (!banner || typeof banner === 'string') {
    return banner || ''
  }

  banner = { ...pkg, ...(banner === true ? {} : banner) }

  const author =
    typeof banner.author === 'string'
      ? banner.author
      : typeof banner.author === 'object'
        ? stringifyAuthor(banner.author)
        : ''

  const license = banner.license || ''

  return (
    '/*!\n' +
    ` * ${banner.name} v${banner.version}\n` +
    ` * (c) ${author || ''}\n` +
    (license && ` * Released under the ${license} License.\n`) +
    ' */'
  )
}

function createReplacePlugin(format) {

  const replacements = {
    'process.env.NODE_ENV': 'production',
    'process.env.VERSION': version,
    'process.env.UI': UI_LIB,
    'process.env.format': format
  }

  return replace({
    values: replacements,
    preventAssignment: true
  })
}

/// create plugins
function createRollupPlugins(plugins, format) {

  const rollupPlugins = [
    vue({
      preprocessStyles: true,
    }),
  ];

  if (isMult) {
    rollupPlugins.push(multiInput({
      relative: resolve('src/')
    }))
  }

  /// css settings
  rollupPlugins.push(postcss({
    minimize: true,
    extract: false,
    plugins: [
      cssUrl({
        imgExtensions: /\.(png|jpg|jpeg|gif|svg)$/,
        fontExtensions: /\.(ttf|woff|woff2|eot)$/,
        limit: 8192,
        hash: false,
        slash: false
      })
    ]
  }));


  /// devDependencies
  rollupPlugins.push(externals({
    devDeps: true,
  }));

  /// j
  rollupPlugins.push(nodeResolve({
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    preferBuiltins: true,
    browser: true
  }));

  /// commonjs
  rollupPlugins.push(commonjs());
  /// replace
  if (isPackaegs) {
    rollupPlugins.push(createReplacePlugin(format));
  }


  rollupPlugins.push(babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  }));
  rollupPlugins.push(...plugins);


  rollupPlugins.push(visualizer({
    gzipSize: true,
    brotliSize: true
  }))

  return rollupPlugins
}


function createMultiInput() {
  const _path = resolve('src')
  const rootFolderFiles = fs.readdirSync(_path)
  let files = [];
  rootFolderFiles.forEach(function (item, index) {
    let fPath = path.join(_path, item);
    let stat = fs.statSync(fPath);
    let ext = path.extname(fPath)
    if (stat.isFile() === true && ext === '.js') {
      files.push(fPath);
    }
  });
  return files
}


function createConfig(format, output, plugins = []) {

  let entryFile = `src/index.js`
  const _plugins = createRollupPlugins(plugins, format);
  const _globals = ExtendGlobal ? Object.assign({}, {vue: 'Vue'}, ExtendGlobal) : {vue: 'Vue'};
  let _input = ''
  let _output = {
    banner: createBanner(_banner, pkg)
  }
  if (isMult) {
    _input = createMultiInput()
    _output = Object.assign({}, _output, {
      format: 'esm',
      dir: resolve('dist')
    })
  } else {
    _input = resolve(entryFile)
    _output = {
      ...output,
      ..._output,
      globals: _globals,
      name: exportName,
      exports: 'named',
      sourcemap: false,
      sourcemapExcludeSources: false,
    }
  }


  const configs = {
    input: _input,
    output: _output,
    external: ['vue', ...ExtendExternals],
    onwarn: (msg, warn) => {
      if (msg.code === 'EVAL') {
        return
      }
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    plugins: _plugins
  }

  return configs
}

function createMinifiedConfig(format) {
  /// example
  return createConfig(
    format,
    {
      file: outputConfigs[format].file.replace(/\.js$/, '.min.js'),
      format: outputConfigs[format].format,
    },
    [
      terser({
        /** @deprecated */  ///  terser
        output: {
          comments: false,
          preamble: createBanner(_banner, pkg)
        }
      })
    ]
  )
}


export default packageConfigs;