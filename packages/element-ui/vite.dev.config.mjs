import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {version} from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.join(__dirname, 'examples');

export default defineConfig({
    root: rootPath,
    plugins: [
        vue(),
        vueJsx()
    ],
    define: {
        'process.env.UI': '"element-ui"',
        'process.env.VERSION': `'${version}'`,
        'process.env.NODE_ENV': '"development"'
    },
    server: {
        port: 8080,
        open: true
    },
    optimizeDeps: {
        include: ['element-plus', 'dayjs']
    }
});
