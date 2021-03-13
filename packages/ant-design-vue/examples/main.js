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
import FormCreate from '../src'

Vue.use(Antd)
Vue.use(FormCreate)


//todo ------------------ Demo 用 ------------------

import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import wangEditor from '@form-create/component-wangeditor/src'


Vue.use(VueCompositionAPI)
Vue.use(VJsoneditor)
FormCreate.register(addressEffect);
FormCreate.component('wangEditor', wangEditor);

//自定义组件
Vue.component('testSlot', {
    render(h) {
        return h('div', {}, [this.$slots.asd]);
    }
})

//todo ------------------ Demo 用 ------------------

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
