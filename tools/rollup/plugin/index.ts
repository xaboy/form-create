/*
 * @Author       : djkloop
 * @Date         : 2021-09-19 13:53:31
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-19 14:11:52
 * @Description  : 头部注释
 * @FilePath     : /form-create2/tools/rollup/plugin/index.ts
 */
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { cssUrl } from '@sixian/css-url';
import externals from 'rollup-plugin-node-externals';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export const createRollupPlugins = () => {

  const rollupPlugins = [
    vue({
      preprocessStyles: true,
    })
  ];

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
    devDeps: true
  }));

  /// j
  rollupPlugins.push(nodeResolve({
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    preferBuiltins: true,
    browser: true
  }));

  /// commonjs
  rollupPlugins.push(commonjs());

  rollupPlugins.push(babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  }));


  // if (visualizer) {
    
  // }


  return rollupPlugins
}