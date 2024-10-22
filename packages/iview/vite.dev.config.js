import vue from '@vitejs/plugin-vue2';
import vue2JsxPlugin from '@vitejs/plugin-vue2-jsx';
import path from 'node:path';
import {defineConfig} from 'vite';
import {version} from './package.json'

const rootPath = path.join(process.cwd(), 'examples');

console.log(rootPath);
/* @type {import('vite').UserConfig} */
export default defineConfig({
  root: rootPath,
  plugins: [vue(), vue2JsxPlugin()],
  define: {
    'process.env.UI': '"iview"',
    'process.env.VERSION': `'${version}'`,
    'process.env.NODE_ENV': '"development"'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
});
