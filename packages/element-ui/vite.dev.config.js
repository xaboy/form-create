import {createVuePlugin} from 'vite-plugin-vue2'
import path from 'node:path';
import {defineConfig} from 'vite';
import {version} from './package.json'

const rootPath = path.join(process.cwd(), 'examples');

console.log(rootPath);
/* @type {import('vite').UserConfig} */
export default defineConfig({
    root: rootPath,
    plugins: [createVuePlugin({
            jsx: true,
        })],
    define: {
        'process.env.UI': '"element-ui"',
        'process.env.VERSION': `'${version}'`,
        'process.env.NODE_ENV': '"development"'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
});
