import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import FormCreateMobile from '../src'

Vue.use(Vant)
Vue.use(FormCreateMobile)

//todo ------------------ Demo 用 ------------------

import VJsoneditor from 'v-jsoneditor'
import App from './App.vue'


Vue.use(VJsoneditor)

window.Vue = Vue;

//todo ------------------ Demo 用 ------------------

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
