/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/main.js
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FormCreate from '../src'

Vue.use(ElementUI)
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
