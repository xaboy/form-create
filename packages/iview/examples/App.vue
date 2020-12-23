<!--
 * @Author        : djkloop
 * @Date          : 2020-12-23 13:49:26
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-12-23 13:49:36
 * @Description   : 头部注释
 * @FilePath      : /form-create2/packages/iview/examples/App.vue
-->
<template>
<div>
  <h2>组件模式生成 / <h6>使用Vue原型方法生成</h6> / <h6 style="color: #999;"> 8888 模式</h6> </h2>
  <form-create :rule="rule"></form-create>
</div>
</template>

<script>
import {defineComponent, reactive} from '@vue/composition-api'
import {maker} from '../src'
export default defineComponent({
    setup() {
        const rule = reactive([
            maker.input('商品名称', 'goods_name', 'iphone').props({
                placeholder: '请输入商品名称',
                clearable: true,
                disabled: false,
                maxlength: 20,
                prefixIcon: 'el-icon-info'
            })
        ])
        return {
            rule
        }
    }
})
</script>

<style>

</style>