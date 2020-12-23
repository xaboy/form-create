/*
 * @Author       : djkloop
 * @Date         : 2020-12-23 13:48:23
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-12-23 14:08:17
 * @Description  : 头部注释
 * @FilePath      : /form-create2/packages/ant-design-vue/examples/main.js
 */
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueCompositionAPI from '@vue/composition-api'
import FormCreate from '../src'
import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(Antd)
Vue.use(FormCreate)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
