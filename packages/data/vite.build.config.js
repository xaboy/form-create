import { defineConfig } from "vite";
import banner from 'vite-plugin-banner'
import { author, license, name, version } from './package.json'

const { LIB } = process.env;


function getBanner(banner, pkg) {
  if (!banner || typeof banner === 'string') {
    return banner || '';
  }

  banner = { ...pkg, ...(banner === true ? {} : banner) };

  const author = banner.author

  const license = banner.license || '';
  return (
    '/*!\n' +
    ' * FormCreate 可视化表单\n' +
    ` * ${banner.name} v${banner.version}\n` +
    ` * (c) ${author || ''}\n` +
    (license && ` * Released under the ${license} License.\n`) +
    ' */'
  );
}

const __banner__ = {
  author: `2021-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create\n * Site https://form-create.com/`,
  license,
  name,
  version
}

/* @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    // 不删除dist目录
    emptyOutDir: false,
    target: 'es2015',
    lib: {
      entry: `src/${LIB}.js`,
      name: LIB,
      formats: ["umd"], // 指定打包模式为 es
      fileName: () => `${LIB}.js` // es 模式打包文件名为 index.es.js
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VERSION': `'${version}'`
  },
  plugins: [
    banner(getBanner(__banner__))
  ],
});
