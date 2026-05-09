import {createApp, h, defineComponent} from 'vue'
import 'antdv-next/dist/reset.css'
import FormCreate from '../src'
import install from '../auto-import'
import App from './App.vue'

FormCreate.use(install);
const app = createApp(App)
app.use(FormCreate)

//todo ------------------ Demo 用 ------------------

import wangEditor from '@form-create/component-wangeditor/src'

FormCreate.component('wangEditor', wangEditor);

//自定义组件
FormCreate.component('testSlot', defineComponent({
    render() {
        return h('div', {}, this.$slots.asd());
    }
}))

FormCreate.directive('afocus', {
    created() {
        console.log('created');
    }
})

//todo ------------------ Demo 用 ------------------

app.mount('#app')
