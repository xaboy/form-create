import path from 'path';

/// 项目目录
export const projRoot = path.resolve(__dirname, '../../');
/// 单独component目录
export const compRoot = path.resolve(projRoot, './components');
/// packages目录
export const pkgRoot = path.resolve(projRoot, './packages');
/// file - packages.json \\\
export const pkgFileRoot = path.resolve(projRoot, './package.json');
/// file - lerna.json \\\
export const lernaFileRoot = path.resolve(projRoot, './lerna.json');
/// file - rollup.config.js \\\
export const rollupFileRoot = path.resolve(projRoot, './rollup.config.ts');