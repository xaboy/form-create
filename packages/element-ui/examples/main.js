/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/main.js
 */
import {createApp,h, defineComponent, resolveComponent} from 'vue'
import ElementUI from 'element-plus/lib/index'
import 'element-plus/lib/theme-chalk/index.css'
import FormCreate from '../src'
import App from './App.vue'

const app = createApp(App)

app.use(ElementUI)
app.use(FormCreate)

//todo ------------------ Demo 用 ------------------

// import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
import {ElInput} from 'element-plus';
// import VueCompositionAPI from '@vue/composition-api'
// import wangEditor from '@form-create/component-wangeditor/src'


// app.use(VueCompositionAPI)
// app.use(VJsoneditor)
FormCreate.register(addressEffect);
// FormCreate.component('wangEditor', wangEditor);

//自定义组件
app.component('testSlot', defineComponent({
    // components:{
    //     ElInput,
    // },
    // template:'<el-input />'
    render(_,b) {
        window.bbb = this;
        return h('div',{}, this.$slots.asd());
    }
}))

//todo ------------------ Demo 用 ------------------

// app.config.productionTip = false

app.mount('#app')
