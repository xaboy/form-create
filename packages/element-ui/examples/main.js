/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/main.js
 */
import {createApp,h, inject, defineComponent, resolveComponent, defineAsyncComponent} from 'vue'
// import ElementUI from 'element-plus/es/index'
// import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import FormCreate from '../src'
import App from './App.vue'

const app = createApp(App)
// window.ELM = ElementUI;
// app.use(ElementUI, {
//     locale: zhCn,
// })
app.use(FormCreate)

//todo ------------------ Demo 用 ------------------

// import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
// import {ElInput} from 'element-plus';
// import VueCompositionAPI from '@vue/composition-api'
// import wangEditor from '@form-create/component-wangeditor/src'


// app.use(VueCompositionAPI)
// app.use(VJsoneditor)
FormCreate.register(addressEffect);
// FormCreate.component('wangEditor', wangEditor);

//自定义组件
FormCreate.component('testSlot', defineComponent({
    // components:{
    //     ElInput,
    // },
    // template:'<el-input />'
    setup(){
        console.log(inject('formCreateRule'));
    },
    render(_,b) {
        window.bbb = this;
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
