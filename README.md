<p align="center">
    <a href="http://www.form-create.com">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>


# form-create

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xaboy/form-create/blob/master/LICENSE)
[![github](https://img.shields.io/badge/Author-xaboy-blue.svg)](https://github.com/xaboy)
[![version](https://badge.fury.io/js/form-create.svg)](https://www.npmjs.com/package/form-create)
[![npm](https://img.shields.io/npm/dt/form-create.svg)](https://www.npmjs.com/package/form-create)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://www.form-create.com)
[![JS gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/gh/xaboy/form-create/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/form-create) [![Join the chat at https://gitter.im/xaboy/form-create](https://badges.gitter.im/xaboy/form-create.svg)](https://gitter.im/xaboy/form-create?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


**Form builder with dynamic rendering, data collection, validation and submission capabilities, built-in 17 commonly used form components, and supports the use of json to generate any vue component, supporting two-way data binding, event expansion.**


>  Support iview3.x
>  If it helps, you can click on "Star" in the upper right corner. Thank you!
>  The project is still being developed and improved. If there are any 'recommendations or questions, please ask [here](https://github.com/xaboy/form-create/issues/new)
>

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！本项目还在不断开发完善中,如有任何建议或问题[请在这里提出](https://github.com/xaboy/form-create/issues/new)
>  本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

> [Update log / 更新日志](http://www.form-create.com/guide/update.html)




### Plan (2018-11-30)
- [x] 内部结构重构 `1.5.0版本`

- [x] 性能优化`1.5.0版本`

- [ ] 支持 ElementUI

- [x] 英文文档 `1.5.4版本`



![http://file.lotkk.com/demo-live2.gif](http://file.lotkk.com/demo-live2.gif)



## Docs

**[简体中文](http://www.form-create.com/) | [English](http://www.form-create.com/en/)**



## Example

- [CRMEB客户管理+电商管理系统](https://gitee.com/ZhongBangKeJi/CRMEB) ([演示站](http://demo25.crmeb.net) 账号：demo 密码：crmeb.com)

- [In-depth use case of maker customize component / 自定义组件 案例](https://github.com/HeyMrLin/fc-demo) ([演示站](http://jeekweb.pro/form-create-demo))

- [Generate a form using the maker generator / 使用生成器生成](https://jsrun.net/NQhKp/edit)

- [Generate a form using the json parameter / 使用 json 生成](https://jsrun.net/NQhKp/edit)

- [Component example / 各种示例](https://jsrun.net/user/xaboy)




## Legend

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)



## Install

```shell
npm install form-create
```


## Import

CDN:
```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
<!-- import iView -->
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<!-- import form-create -->
<script src="//unpkg.com/form-create/dist/form-create.min.js"></script>

```
NodeJs:
```js
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import formCreat from 'form-create'
import { maker } from 'form-create'

Vue.use(iView);
Vue.use(formCreat)
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
                //表单生成规则
                rule:[
                    maker.input('商品名称','goods_name'),
                    maker.date('创建时间','created_at')
                ],
                //组件参数配置
                option:{
                    //表单提交事件
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
                formCreate.maker.input('商品名称','goods_name'),
                formCreate.maker.date('创建时间','created_at')
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

## Reference

vue框架: [Vue](https://github.com/vuejs/vue)

iviewUI框架: [iview](https://github.com/iview/iview)

validate 表单验证规则，具体配置查看: [async-validator](https://github.com/yiminghe/async-validator)

accept 文件类型:  [attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

icon图标: [图标](https://www.iviewui.com/components/icon#示例)

form-builder: [使用PHP快速生成现代化表单](https://github.com/xaboy/form-builder)


## Thank

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss) | [HeyMrLin](https://github.com/HeyMrLin) | 讨论群里的大佬们



## Contact

##### email : xaboy2005@qq.com



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
