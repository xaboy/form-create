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
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://www.form-create.com/v2/)
[![iview gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@form-create/iview/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/@form-create/iview)
[![elment-ui gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@form-create/element-ui/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/@form-create/element-ui) [![Join the chat at https://gitter.im/xaboy/form-create](https://badges.gitter.im/xaboy/form-create.svg)](https://gitter.im/xaboy/form-create?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


**form-create 是一个可以通过 JSON 生成具有动态渲染、数据收集、验证和提交功能的表单生成器。并且支持生成任何 Vue 组件。结合内置17种常用表单组件和自定义组件，再复杂的表单都可以轻松搞定。**


## 支持
- **iViewUI 2.13.0+**
- **iViewUI 3.x**
- **ElementUI 2.8.2+**

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！本项目还在不断开发完善中,如有任何建议或问题[请在这里提出](https://github.com/xaboy/form-create/issues/new)
> 本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

> [更新日志](http://www.form-create.com/v2/guide/update.html)


![http://file.lotkk.com/demo-live3.gif](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live3.gif)
![http://file.lotkk.com/demo-live2.gif](https://raw.githubusercontent.com/xaboy/form-create/dev/images/demo-live2.gif)


## 文档

<p>
    <a href="http://www.form-create.com/v2/">
        <strong>简体中文</strong>
    </a>
    <a href="http://www.form-create.com/en/v2/">
        <strong>English</strong>
    </a>
</p>


## 包说明

| 包名             | 说明                                                |
| ------------------ | ---------------------------------------------------------- |
| @form-create/iview     | [iview 版本](http://form-create.com/v2/iview/) |
| @form-create/element-ui | [ElementUI 版本](http://form-create.com/v2/element-ui/)        |



## 示例

- [CRMEB客户管理+电商管理系统](https://gitee.com/ZhongBangKeJi/CRMEB) ([演示站](http://demo25.crmeb.net) 账号：demo 密码：crmeb.com)

- [自定义组件 案例](https://github.com/HeyMrLin/fc-demo) ([演示站](http://jeekweb.pro/form-create-demo))

- [使用生成器生成](https://jsrun.net/NQhKp/edit)

- [使用 json 生成](https://jsrun.net/NQhKp/edit)

- [各种示例](https://jsrun.net/user/xaboy)




## 图例

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)



## 安装

iview
```shell
npm install @form-create/iview
```

elementUI
```shell
npm install @form-create/element-ui
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

elementUI
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
**NodeJs:**

iview
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



##  使用

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

## 对比 1.x

- 速度更快

- 体积更小

- 更强大的全局配置

- 自定义更容易扩展

- 更容易支持第三方 UI 库

- 更少的 bug

##  参考

- [Vue](https://github.com/vuejs/vue)

- [iViewUI](https://github.com/iview/iview)
- [ElementUI](https://github.com/ElemeFE/element)

- [async-validator](https://github.com/yiminghe/async-validator)

- [PHP版的表单生成器:form-builder](https://github.com/xaboy/form-builder)


## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss)  |  [HeyMrLin](https://github.com/HeyMrLin)  |  [djkloop](https://github.com/djkloop)


## 捐赠

![donation.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/donation.jpg)

## 联系

##### email : xaboy2005@qq.com



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
