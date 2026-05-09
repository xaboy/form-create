<p align="center">
    <a href="https://www.form-create.com" target="_blank">
        <img width="300" alt="FormCreate" src="https://static.form-create.com/file/img/info-logo2.png">
    </a>
</p>
<p align="center">
    基于 antdv-next 的低代码表单生成组件
</p>

<p align="center">
    <a href="https://www.form-create.com/" target="_blank">官网</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://form-create.com/v3/guide/" target="_blank">帮助文档</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://www.antdv-next.cn/" target="_blank">antdv-next</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://pro.form-create.com/view/" target="_blank">可视化表单设计器</a>
</p>

<p align="center">
  <a href="https://github.com/xaboy/form-create" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT" /></a>
</p>

**FormCreate 是一个可以通过 JSON 生成具有动态渲染、数据收集、验证和提交功能的低代码表单生成组件。支持多个UI框架，适配移动端，并且支持生成任何 Vue 组件。内置20种常用表单组件和自定义组件，再复杂的表单都可以轻松搞定。**

本包是 [antdv-next](https://www.antdv-next.cn/) 的适配实现, 基于 [`Ant Design Vue`](https://www.antdv.com/) API 兼容, 提供完整的 Vue3 低代码表单能力.

## 特点
- 使用 JSON 数据生成表单
- 支持扩展, 生成任何 Vue 组件和 HTML 标签
- 支持组件之间联动 (control)
- 提供丰富的表单操作 API
- 支持子表单和分组
- 高性能
- 多语言

## 安装

```sh
npm install @form-create/antdv-next
# 同时需要安装 antdv-next 作为 peer dependency
npm install antdv-next
```

> **环境要求**: `antdv-next` 是 Pure ESM 包,要求 Node.js >= 18, 推荐使用 Vite/Rollup 等支持 package.json `exports` 字段的现代构建工具。
> 本包的开发服务器已迁移至 Vite,执行 `npm run dev:antdv-next` 即可启动。

## 快速开始

```js
import { createApp } from 'vue'
import 'antdv-next/dist/reset.css'
import FormCreate from '@form-create/antdv-next'
import install from '@form-create/antdv-next/auto-import'
import App from './App.vue'

FormCreate.use(install)

const app = createApp(App)
app.use(FormCreate)
app.mount('#app')
```

```vue
<template>
  <form-create :rule="rule" v-model:api="fapi" v-model="formData" />
</template>

<script setup>
import { ref } from 'vue'
import { maker } from '@form-create/antdv-next'

const fapi = ref({})
const formData = ref({})
const rule = ref([
  maker.input('用户名', 'username').validate([
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ]),
  maker.password('密码', 'password').validate([
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]),
])
</script>
```

## 兼容性

`antdv-next` 与 `ant-design-vue` 的组件 API/标签 (`a-input`, `a-form`, `a-date-picker` 等) 完全兼容, 因此本适配包与 `@form-create/ant-design-vue` 的 rule/maker/api 用法保持一致.

## 相关包

- [@form-create/ant-design-vue](https://www.npmjs.com/package/@form-create/ant-design-vue) - ant-design-vue 适配包
- [@form-create/element-ui](https://www.npmjs.com/package/@form-create/element-ui) - element-plus 适配包
- [@form-create/core](https://www.npmjs.com/package/@form-create/core) - 核心库

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
