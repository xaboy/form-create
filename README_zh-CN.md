<p align="center">
    <a href="http://www.form-create.com">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>


# form-create

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xaboy/form-create)
[![github](https://img.shields.io/badge/Author-xaboy-blue.svg)](https://github.com/xaboy)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://www.form-create.com/v2/)


**form-create 是一个可以通过 JSON 生成具有动态渲染、数据收集、验证和提交功能的表单生成组件。支持3个UI框架，并且支持生成任何 Vue 组件。内置20种常用表单组件和自定义组件，再复杂的表单都可以轻松搞定。**

**正在适配 vue3 版本中**

[开源的vue可视化表单设计器组件](https://github.com/xaboy/form-create-designer) ([功能演示](http://form-create.com/designer?fr=fc))

## 支持
- **iview**
- **view-design**
- **element-ui**
- **ant-design-vue**

如果您有适合 form-create 的表单组件, 欢迎[点击这里留言](https://github.com/xaboy/form-create/issues/124)

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！本项目还在不断开发完善中,如有任何建议或问题[请在这里提出](https://github.com/xaboy/form-create/issues/new)

> 本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

> [更新日志](http://www.form-create.com/v2/guide/update.html)

- **预览**

![demo1](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live3.gif)

<details>
<summary><b>更多</b></summary>

- **操作表单**

[详细说明](http://www.form-create.com/v2/instance.html)

![demo2](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live2.gif)

- **`group` 组件**

[详细说明](http://www.form-create.com/v2/guide/group.html)

![demo3](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-group.gif)

- **`control` 配置项**

[详细说明](http://www.form-create.com/v2/guide/control.html)

![demo2](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live4.gif)
</details>

## 文档

[简体中文](http://www.form-create.com/v2/) | [English](http://www.form-create.com/en/v2/)


## 包说明

| 包名             | 说明                                                |
| ------------------ | ---------------------------------------------------------- |
| @form-create/iview [![version](https://img.shields.io/npm/v/@form-create/iview.svg)](https://www.npmjs.com/package/@form-create/iview) [![npm](https://img.shields.io/npm/dt/@form-create/iview.svg)](https://www.npmjs.com/package/@form-create/iview)    | [iview 版本](http://form-create.com/v2/iview/) |
| @form-create/iview4 [![version](https://img.shields.io/npm/v/@form-create/iview4.svg)](https://www.npmjs.com/package/@form-create/iview4) [![npm](https://img.shields.io/npm/dt/@form-create/iview4.svg)](https://www.npmjs.com/package/@form-create/iview4)    | [view-design 版本](http://form-create.com/v2/iview/) |
| @form-create/element-ui [![version](https://img.shields.io/npm/v/@form-create/element-ui.svg)](https://www.npmjs.com/package/@form-create/element-ui) [![npm](https://img.shields.io/npm/dt/@form-create/element-ui.svg)](https://www.npmjs.com/package/@form-create/element-ui) | [element-ui 版本](http://form-create.com/v2/element-ui/)        |
| @form-create/ant-design-vue [![version](https://img.shields.io/npm/v/@form-create/ant-design-vue.svg)](https://www.npmjs.com/package/@form-create/ant-design-vue) [![npm](https://img.shields.io/npm/dt/@form-create/ant-design-vue.svg)](https://www.npmjs.com/package/@form-create/ant-design-vue) | [ant-design-vue 版本](http://form-create.com/v2/ant-design-vue/)     |
| @form-create/designer [![version](https://img.shields.io/npm/v/@form-create/designer.svg)](https://www.npmjs.com/package/@form-create/designer) [![npm](https://img.shields.io/npm/dt/@form-create/designer.svg)](https://www.npmjs.com/package/@form-create/designer) | [表单设计器](http://form-create.com/designer)     |



## 示例

- [演示案例](https://github.com/HeyMrLin/fc-demo) ([演示站](http://jeekweb.pro/form-create-demo))

- [使用生成器生成](https://jsrun.net/NQhKp/edit)

- [使用 json 生成](https://jsrun.net/NQhKp/edit)

- [各种示例](http://www.form-create.com/v2/guide/demo.html)



<details>
<summary><b>图例</b></summary>

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)
</details>


## 安装

> 根据自己使用的 UI 安装对应的版本

iview
```shell
npm install @form-create/iview
```

view-design
```shell
npm install @form-create/iview4
```

element-ui
```shell
npm install @form-create/element-ui
```

ant-design-vue
```shell
npm install @form-create/ant-design-vue
```

## 引入

**CDN:**

iview
```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
<!-- import iView -->
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<!-- import form-create/iview -->
<script src="//unpkg.com/@form-create/iview/dist/form-create.min.js"></script>
```

element-ui
```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- import element -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<!-- import form-create/element -->
<script src="//unpkg.com/@form-create/element-ui/dist/form-create.min.js"></script>
```

ant-design-vue
```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link href="https://unpkg.com/ant-design-vue@1.5.3/dist/antd.min.css" rel="stylesheet">
<!-- import moment -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/zh-cn.js"></script>
<!-- import ant-design-vue -->
<script defer src="https://unpkg.com/ant-design-vue@1.5.3/dist/antd.js"></script>
<!-- import form-create -->
<script src="//unpkg.com/@form-create/ant-design-vue/dist/form-create.min.js"></script>
```
**NodeJs:**

iview
```js
import formCreate from '@form-create/iview'
Vue.use(formCreate)
```

element-ui
```js
import formCreate from '@form-create/element-ui'
Vue.use(formCreate)
```

ant-design-vue
```js
import formCreate from '@form-create/ant-design-vue'
Vue.use(formCreate)
```


##  使用

```html
<form-create :rule="rule" v-model="fApi" :option="options" :value.sync="value"/>
```
```javascript
export default {
    data(){
        return {
            fApi:{},
            value:{field1:'111',field2:'222',time:'11:11:11'},
            options:{
                onSubmit:(formData)=>{
                    alert(JSON.stringify(formData))
                }
            },
            rule:[
                {type:'input', field:'field1',title:'field1',value:'aaa'},
                {type:'input', field:'field2',title:'field2',value:'sss'},
                {type:'timePicker', field:'time',title:'time',value:'12:12:12'},
                {
                    type:'ElButton',
                    title:'修改 field1',
                    native: false,
                    on:{
                        click: ()=>{
                            this.rule[0].value+='a'
                        }
                    },
                    children: ['点击'],
                }
            ]
        }
    }
}
```

## 示例

下载项目
```sh
$ git clone https://github.com/xaboy/form-create.git
$ cd form-create
```
安装依赖
```sh
$ npm run bootstrap
```
查看 iview 示例
```sh 
$ npm run dev:iview
```
查看 view-design 示例
```sh 
$ npm run dev:iview4
```
查看 element-ui 示例
```sh 
$ npm run dev:ele
```
查看 ant-design-vue 示例
```sh 
$ npm run dev:antd
```

## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss)  |  [HeyMrLin](https://github.com/HeyMrLin)  |  [djkloop](https://github.com/djkloop) | [JetBrains](https://www.jetbrains.com/?from=form-create)


## 捐赠

![donation.jpg](http://form-create.com/img/donation.jpg)

## 联系

##### email : xaboy2005@qq.com

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
