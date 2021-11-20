/*
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:39:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:01:32
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/main.js
 */
import {createApp,h, inject, defineComponent} from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import FormCreate from '../src'
import App from './App.vue'
// import {QuestionCircleOutlined, PlusOutlined, FolderOutlined, EyeOutlined, DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons-vue';

const app = createApp(App)

app.use(Antd)
app.use(FormCreate)

// app.component(QuestionCircleOutlined.name,QuestionCircleOutlined);
// app.component(PlusOutlined.name,PlusOutlined);
// app.component(FolderOutlined.name,FolderOutlined);
// app.component(DeleteOutlined.name,DeleteOutlined);
// app.component(EyeOutlined.name,EyeOutlined);
// app.component(MinusCircleOutlined.name,MinusCircleOutlined);
// app.component(PlusCircleOutlined.name,PlusCircleOutlined);

//todo ------------------ Demo 用 ------------------

// import VJsoneditor from 'v-jsoneditor'
import addressEffect from './addressEffect';
import wangEditor from '@form-create/component-wangeditor/src'


// app.use(VueCompositionAPI)
// app.use(VJsoneditor)
FormCreate.register(addressEffect);
FormCreate.component('wangEditor', wangEditor);

//自定义组件
FormCreate.component('testSlot', defineComponent({
    // components:{
    //     ElInput,
    // },
    // template:'<el-input />'
    setup(){
        console.log(inject('formCreateInject'));
    },
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
