<p align="center">
    <a href="http://www.form-create.com">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>


# form-create

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xaboy/form-create)
[![github](https://img.shields.io/badge/Author-xaboy-blue.svg)](https://github.com/xaboy)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://www.form-create.com/en/v2/)

**form-create is a form generation component that can generate dynamic rendering, data collection, verification and submission functions through JSON. Supports 3 UI frameworks, and supports the generation of any Vue components. Built-in 20 kinds of commonly used form components and custom components, no matter how complex forms can be easily handled.**

**Adapting to vue3 version**

[开源的vue可视化表单设计器组件](https://github.com/xaboy/form-create-designer) ([功能演示](http://form-create.com/designer?fr=fc))

## [中文 README](https://github.com/xaboy/form-create/blob/2.5/README_zh-CN.md)

## Support
- **iview**
- **view-design**
- **element-ui**
- **ant-design-vue**

If you have a form component suitable for form-create, please feel free to [click here to leave a message](https://github.com/xaboy/form-create/issues/124)

>  If it helps, you can click on "Star" in the upper right corner. Thank you!
>  The project is still being developed and improved. If there are any 'recommendations or questions, please ask [here](https://github.com/xaboy/form-create/issues/new)

> 本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

> [Update log](http://www.form-create.com/en/v2/guide/update.html)

- **Preview**

![demo1](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live3.gif)

<details>
<summary><b>More</b></summary>

- **Form operations**

[description](http://www.form-create.com/en/v2/instance.html)

![demo2](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live2.gif)

- **`group` component**

[description](http://www.form-create.com/en/v2/guide/group.html)

![demo3](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-group.gif)

- **`control` configuration**

[description](http://www.form-create.com/en/v2/guide/control.html)

![demo2](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live4.gif)
</details>

## Docs

[简体中文](http://www.form-create.com/v2/) | [English](http://www.form-create.com/en/v2/)


## Packages

| Name               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| @form-create/iview [![version](https://img.shields.io/npm/v/@form-create/iview.svg)](https://www.npmjs.com/package/@form-create/iview) [![npm](https://img.shields.io/npm/dt/@form-create/iview.svg)](https://www.npmjs.com/package/@form-create/iview)    | [iview version](http://form-create.com/v2/iview/) |
| @form-create/iview4 [![version](https://img.shields.io/npm/v/@form-create/iview4.svg)](https://www.npmjs.com/package/@form-create/iview4) [![npm](https://img.shields.io/npm/dt/@form-create/iview4.svg)](https://www.npmjs.com/package/@form-create/iview4)    | [view-design version](http://form-create.com/v2/iview/) |
| @form-create/element-ui [![version](https://img.shields.io/npm/v/@form-create/element-ui.svg)](https://www.npmjs.com/package/@form-create/element-ui) [![npm](https://img.shields.io/npm/dt/@form-create/element-ui.svg)](https://www.npmjs.com/package/@form-create/element-ui) | [element-ui version](http://form-create.com/v2/element-ui/)        |
| @form-create/ant-design-vue [![version](https://img.shields.io/npm/v/@form-create/ant-design-vue.svg)](https://www.npmjs.com/package/@form-create/ant-design-vue) [![npm](https://img.shields.io/npm/dt/@form-create/ant-design-vue.svg)](https://www.npmjs.com/package/@form-create/ant-design-vue) | [ant-design-vue version](http://form-create.com/v2/ant-design-vue/)     |
| @form-create/designer [![version](https://img.shields.io/npm/v/@form-create/designer.svg)](https://www.npmjs.com/package/@form-create/designer) [![npm](https://img.shields.io/npm/dt/@form-create/designer.svg)](https://www.npmjs.com/package/@form-create/designer) | [Form Designer](http://form-create.com/designer)     |

## Example

- [Demo case](https://github.com/HeyMrLin/fc-demo) ([Demo station](http://jeekweb.pro/form-create-demo))

- [Generate a form using the maker generator](https://jsrun.net/NQhKp/edit)

- [Generate a form using the json parameter](https://jsrun.net/NQhKp/edit)

- [Component example](http://www.form-create.com/en/v2/guide/demo.html)



<details>
<summary><b>Legend</b></summary>

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)
</details>


## Install

> Install the corresponding version according to the UI you use

>iview
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

## Import

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

## Usage

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
                    title:'Modify field1',
                    native: false,
                    on:{
                        click: ()=>{
                            this.rule[0].value+='a'
                        }
                    },
                    children: ['Click'],
                }
            ]
        }
    }
}
```


## Demo

Download project
```sh
$ git clone https://github.com/xaboy/form-create.git
$ cd form-create
```
Install dependencies
```sh
$ npm run bootstrap
```
iview Demo
```sh 
$ npm run dev:iview
```
view-design Demo
```sh 
$ npm run dev:iview4
```
element-ui Demo
```sh 
$ npm run dev:ele
```
ant-design-vue Demo
```sh 
$ npm run dev:antd
```

## Thank

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss)  |  [HeyMrLin](https://github.com/HeyMrLin)  |  [djkloop](https://github.com/djkloop) | [JetBrains](https://www.jetbrains.com/?from=form-create)

## Donation

![donation.jpg](http://form-create.com/img/donation.jpg)

## Contact

##### email : xaboy2005@qq.com

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
