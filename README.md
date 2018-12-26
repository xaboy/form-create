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
[![JS gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/gh/xaboy/form-create/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square)](https://www.npmjs.com/package/form-create)


**具有动态渲染、数据收集、校验和提交功能的表单生成器，支持json、双向数据绑定、事件扩展以及自定义组件，可快速生成包含有省市区三级联动、时间选择、日期选择等17种功能组件。[文档](http://www.form-create.com)**


>  已支持 iview3
>
>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！
>
>  本项目还在不断开发完善中,如有`任何`建议或问题请[在这里提出](https://github.com/xaboy/form-create/issues/new)
>
>  本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

> [更新日志](http://www.form-create.com/guide/update.html)




### 计划 (2018-11-30)
- [x] 内部结构重构 `1.5.0版本`

- [x] 性能优化`1.5.0版本`

- [ ] 支持 ElementUi



![http://file.lotkk.com/demo-live.gif](http://file.lotkk.com/demo-live.gif)



## 文档

**[document](http://www.form-create.com)**



## 案例

- [CRMEB客户管理+电商管理系统](https://gitee.com/ZhongBangKeJi/CRMEB) ([演示站](http://demo25.crmeb.net) 账号：demo 密码：crmeb.com)

- [深入使用 自定义组件 案例](https://github.com/HeyMrLin/fc-demo) ([演示站](http://jeekweb.pro/form-create-demo))




## 在线示例

[使用生成器生成](https://jsrun.net/NQhKp/edit) | [使用 json 生成](https://jsrun.net/NQhKp/edit) | [各种示例](https://jsrun.net/user/xaboy)




## 图例 [在线预览](https://jsrun.net/NQhKp/edit)

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)



## 安装

```shell
npm install form-create
```



## 引入

浏览器:
```html
<!-- import Vue 2.5-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js"></script>

<!-- import iview 2.14.3-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/iview@2.14.3/dist/styles/iview.css">
<script src="https://cdn.jsdelivr.net/npm/iview@2.14.3/dist/iview.min.js"></script>

<!-- 省市区三级联动json数据,不使用三级联动不需要引入 -->
<script src="https://cdn.jsdelivr.net/npm/form-create/district/province_city_area.js"></script>

<!-- import formCreate -->
<script src="https://cdn.jsdelivr.net/npm/form-create/dist/form-create.min.js"></script>

```
NodeJs:
```js
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import formCreat from 'form-create'
//获取生成器
import { maker } from 'form-create'

//三级联动数据,不用可以不引入
import 'form-create/district/province_city_area.js'

Vue.use(iView);
Vue.use(formCreat)
```


## 使用

使用  `<form-create></form-create>` 标签创建表单

```html
<form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
```

```javascript
    new Vue({
        el:'#app1',
        data:{
            fApi:{},
            rule:[
                formCreate.maker.input('商品名称','goods_name'),
                formCreate.maker.date('创建时间','created_at')
            ],
            option:{
                //显示表单重置按钮
                resetBtn:true,
                //表单提交事件
                onSubmit:function (formData) {
                    //按钮进入提交状态
                    $f.btn.loading();
                    //重置按钮禁用
                    $f.resetBtn.disabled();
                    alert(JSON.stringify(formData));
                }
            },
            mounted:function($f){
                //表单渲染成功
            }
        },
        mounted:function () {
            //fApi === $f
            console.log(this.fApi.formData());
        }
    });
```



## 查看示例

```shell
npm run dev
```
或双击打开 `demo/index.html`



## 参考

vue框架: [Vue](https://github.com/vuejs/vue)

iviewUI框架: [iview](https://github.com/iview/iview)

validate 表单验证规则，具体配置查看: [async-validator](https://github.com/yiminghe/async-validator)

accept 文件类型:  [attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

icon图标: [图标](https://www.iviewui.com/components/icon#示例)

form-builder: [使用PHP快速生成现代化表单](https://github.com/xaboy/form-builder)



## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss) | [HeyMrLin](https://github.com/HeyMrLin) | 讨论群里的大佬们



## 联系

##### 联系邮箱 : xaboy2005@qq.com



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present xaboy
