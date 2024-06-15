/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/main.js
 */
import {createApp} from 'vue'
import FormCreateMobile from '../src'
import vant from 'vant'
import 'vant/lib/index.css';
import App from './App.vue'

const app = createApp(App)

app.use(vant);
app.use(FormCreateMobile);

app.mount('#app')
