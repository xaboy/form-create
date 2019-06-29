<p align="center">
    <a href="http://www.form-create.com">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>


# form-create V2

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xaboy/form-create)
[![github](https://img.shields.io/badge/Author-xaboy-blue.svg)](https://github.com/xaboy)
[![version](https://badge.fury.io/js/@form-create%2Fcore.svg)](https://www.npmjs.com/package/@form-create/core)
[![npm](https://img.shields.io/npm/dt/@form-create/core.svg)](https://www.npmjs.com/package/@form-create/core)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://www.form-create.com/en/v2/)
[![iview gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@form-create/iview/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/@form-create/iview)
[![elment-ui gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@form-create/element-ui/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/@form-create/element-ui) [![Join the chat at https://gitter.im/xaboy/form-create](https://badges.gitter.im/xaboy/form-create.svg)](https://gitter.im/xaboy/form-create?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


**Form-create is a form generator that can generate dynamic rendering, data collection, validation, and submission via JSON. And support for generating any Vue components. Combined with the built-in 17 common form components and custom components, complex forms can be easily handled.**

## [中文 README](https://github.com/xaboy/form-create/blob/2.0/README_zh-CN.md)

## Support
- **iViewUI 2.13.0+**
- **iViewUI 3.x**
- **ElementUI 2.8.2+**

>  If it helps, you can click on "Star" in the upper right corner. Thank you!
>  The project is still being developed and improved. If there are any 'recommendations or questions, please ask [here](https://github.com/xaboy/form-create/issues/new)

> [Update log](http://www.form-create.com/en/v2/guide/update.html)


![http://file.lotkk.com/demo-live3.gif](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live3.gif)
![http://file.lotkk.com/demo-live2.gif](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live2.gif)


## Docs

<p>
    <a href="http://www.form-create.com/v2/">
        <strong>简体中文</strong>
    </a>
    <a href="http://www.form-create.com/en/v2/">
        <strong>English</strong>
    </a>
</p>



## Packages

| Name               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| @form-create/iview     | [iView Version](http://form-create.com/v2/iview/) |
| @form-create/element-ui | [ElementUI Version](http://form-create.com/v2/element-ui/)     |



## Example

- [In-depth use case of maker customize component](https://github.com/HeyMrLin/fc-demo) ([Demo station](http://jeekweb.pro/form-create-demo))

- [Generate a form using the maker generator](https://jsrun.net/NQhKp/edit)

- [Generate a form using the json parameter](https://jsrun.net/NQhKp/edit)

- [Component example](https://jsrun.net/user/xaboy)




## Legend

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)



## Install

iview
```shell
npm install @form-create/iview
```

elementUI
```shell
npm install @form-create/element-ui
```

## Import

**CDN:**

iviewUI
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

elementUI
```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- import element -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<!-- import form-create/element -->
<script src="//unpkg.com/@form-create/element-ui/dist/form-create.elm.min.js"></script>
```
**NodeJs:**

iviewUI
```js
import formCreate from '@form-create/iview'
import { maker } from '@form-create/iview'
Vue.use(formCreate)
```

ElementUI
```js
import formCreate from '@form-create/element-ui'
import { maker } from '@form-create/element-ui'
Vue.use(formCreate)
```

## Usage

```html
<form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
```
NodeJs
```javascript
    import {maker} from 'form-create'
    export default {
        data () {
            return {
                fApi:{},
                model: {},
                rule:[
                    maker.input('goods_name','goods_name'),
                    maker.date('create_at','created_at')
                ],
                option:{
                    onSubmit:function (formData) {
                        alert(JSON.stringify(formData));
                    }
                }
            };
        },
        mounted:function(){
            this.model = this.fApi.model();
        }
    };
```
Browser
```javascript
    new Vue({
        el:'#app1',
        data:{
            fApi:{},
            model: {},
            rule:[
                formCreate.maker.input('goods_name','goods_name'),
                formCreate.maker.date('create_at','created_at')
            ],
            option:{
                onSubmit:function (formData) {
                    alert(JSON.stringify(formData));
                }
            }
        },
        mounted:function () {
            this.model = this.fApi.model();
        }
    });
```
## Comparison 1.x

- faster

- Smaller size

- More powerful global configuration

- Customization is easier to expand

- Easier support for third-party UI libraries

- Less bugs


## Reference

- [Vue](https://github.com/vuejs/vue)

- [iViewUI](https://github.com/iview/iview)
- [ElementUI](https://github.com/ElemeFE/element)

- [async-validator](https://github.com/yiminghe/async-validator)

- [PHP form-builder](https://github.com/xaboy/form-builder)


## Thank

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss)  |  [HeyMrLin](https://github.com/HeyMrLin)  |  [djkloop](https://github.com/djkloop)

## Donation

![donation.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/donation.jpg)

## Contact

##### email : xaboy2005@qq.com

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
