import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import banner from 'vite-plugin-banner';
import {author, license, name, version} from './package.json';

function getBanner(opt) {
    const _author = opt.author;
    const _license = opt.license || '';
    return (
        '/*!\n' +
        ' * FormCreate 低代码表单渲染器\n' +
        ` * ${opt.name} v${opt.version}\n` +
        ` * (c) ${_author || ''}\n` +
        (_license && ` * Released under the ${_license} License.\n`) +
        ' */'
    );
}

const __banner__ = {
    author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create\n * Site https://form-create.com/`,
    license,
    name,
    version
};

let umdIdx = 0;
const umdFileNames = ['', '.min'];

export default defineConfig({
    publicDir: false,
    build: {
        target: 'es2015',
        lib: {
            entry: 'src/index.js',
            name: 'formCreate',
            formats: ['esm', 'umd', 'umd'],
            fileName: (format) => {
                return `form-create${format === 'umd' ? umdFileNames[umdIdx++] : ('.' + format)}.js`;
            }
        },
        rollupOptions: {
            external: ['vue', 'Vue', 'naive-ui'],
            output: {
                globals: {
                    vue: 'Vue',
                    'naive-ui': 'naive'
                }
            }
        }
    },
    define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.VERSION': `'${version}'`,
        'process.env.UI': '"naive-ui"'
    },
    plugins: [
        vue(),
        vueJsx(),
        cssInjectedByJsPlugin(),
        banner(getBanner(__banner__))
    ]
});
