import {createApp,h, defineComponent} from 'vue'
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

//todo ------------------ Demo 用 ------------------

// app.config.productionTip = false

app.mount('#app')
