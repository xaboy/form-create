# @form-create/tiny-vue

[![NPM version](https://img.shields.io/npm/v/@form-create/tiny-vue.svg)](https://www.npmjs.com/package/@form-create/tiny-vue)
[![License](https://img.shields.io/npm/l/@form-create/tiny-vue.svg)](LICENSE)

> 基于 [OpenTiny TinyVue](https://opentiny.design/tiny-vue) 组件库的 [FormCreate](https://github.com/xaboy/form-create) 低代码表单适配。

通过 JSON 生成具有动态渲染、数据收集、验证和提交功能的低代码表单生成组件。

## 安装

```bash
pnpm add @form-create/tiny-vue @opentiny/vue @opentiny/vue-icon @opentiny/vue-theme
```

## 使用

```js
import { createApp } from 'vue'
import FormCreate from '@form-create/tiny-vue'
import install from '@form-create/tiny-vue/auto-import'
import '@opentiny/vue-theme/index.css'
import App from './App.vue'

FormCreate.use(install)
const app = createApp(App)
app.use(FormCreate)
app.mount('#app')
```

模板中使用：

```vue
<template>
  <form-create :rule="rule" v-model="formData" :option="{ resetBtn: true }" />
</template>

<script setup>
import { ref } from 'vue'
const formData = ref({})
const rule = ref([
  { type: 'input', field: 'name', title: '姓名', value: '', validate: [{ required: true, message: '请输入姓名' }] },
  { type: 'select', field: 'city', title: '城市', value: '', options: [
    { label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }
  ] },
])
</script>
```

## 链接

- 官网：<https://form-create.com>
- GitHub：<https://github.com/xaboy/form-create>
- TinyVue：<https://opentiny.design/tiny-vue>

## License

MIT © xaboy
