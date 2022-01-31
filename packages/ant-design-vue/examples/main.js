/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/ant-design-vue/examples/main.js
 */
import {createApp,h, inject, defineComponent} from 'vue'
import FormCreate from '../src'
import install from '../auto-import'
import App from './App.vue'

FormCreate.use(install);
const app = createApp(App)
app.use(FormCreate)

//todo ------------------ Demo 用 ------------------

// import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
import wangEditor from '@form-create/component-wangeditor/src'


// app.use(VJsoneditor)
FormCreate.register(addressEffect);
FormCreate.component('wangEditor', wangEditor);

//自定义组件
FormCreate.component('testSlot', defineComponent({
    render(_,b) {
        return h('div',{}, this.$slots.asd());
    }
}))

FormCreate.directive('afocus',{  // 在绑定元素的 attribute 或事件监听器被应用之前调用
    created() {
        console.log('created');
    }
})

//todo ------------------ Demo 用 ------------------

// app.config.productionTip = false

app.mount('#app')
