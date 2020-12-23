/*
 * @Author       : djkloop
 * @Date         : 2020-12-23 13:48:23
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-12-23 14:01:29
 * @Description  : 头部注释
 * @FilePath      : /form-create2/packages/iview4/examples/main.js
 */
import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueCompositionAPI from '@vue/composition-api'
import FormCreate from '../src'
import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(ViewUI)
Vue.use(FormCreate)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
