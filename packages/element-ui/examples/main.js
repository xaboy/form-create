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
import VueCompositionAPI from '@vue/composition-api'
import FormCreate from '../src'
import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.use(FormCreate)

//todo api 示例,rule 优化
//demo 用
import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';

Vue.use(VJsoneditor)
FormCreate.register(addressEffect);

//自定义组件
Vue.component('testSlot', {
    render(h) {
        return h('div', {}, [this.$slots.asd]);
    }
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
