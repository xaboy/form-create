import Vue from 'vue'
import FormCreate from '../src'
import TDesign from 'tdesign-vue';
// 引入组件库全局样式资源
import 'tdesign-vue/es/style/index.css';

Vue.use(TDesign)
Vue.use(FormCreate)

//todo ------------------ Demo 用 ------------------

import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
import App from './App.vue'
import wangEditor from '@form-create/component-wangeditor/src/index'


Vue.use(VJsoneditor)
FormCreate.register(addressEffect);
FormCreate.component('wangEditor', wangEditor);

//自定义组件
formCreate.component('testSlot', {
    render(h) {
        return h('div', {}, [this.$slots.asd]);
    }
})
window.Vue = Vue;

//todo ------------------ Demo 用 ------------------

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
