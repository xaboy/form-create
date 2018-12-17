<p align="center">
    <a href="https://github.com/xaboy/form-create">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>
# form-create

<p>
  <a href="https://github.com/xaboy/form-create/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://github.com/xaboy">
    <img src="https://img.shields.io/badge/Author-xaboy-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/form-create">
    <img src="https://badge.fury.io/js/form-create.svg" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/form-create">
    <img src="https://img.shields.io/npm/dt/form-create.svg" alt="npm" />
  </a>
  <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/gh/xaboy/form-create/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square" alt="JS gzip size">
</p>

**具有动态渲染、数据收集、校验和提交功能的表单生成器，支持双向数据绑定、事件扩展以及自定义组件，内置组件包含有省市区三级联动、时间选择、日期选择等17种功能组件。**

<br />

>  \>=1.4.5 版本已支持 iview3
>
>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！
>
>  本项目还在不断开发完善中,如有`任何`建议或问题请[在这里提出](https://github.com/xaboy/form-create/issues/new)
>
>  本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)




### 计划 (2018-11-30)
- [x] 内部结构重构 `1.5.0版本`

- [x] 性能优化`1.5.0版本`

- [ ] 支持 ElementUi

:rocket::rocket::rocket:

## 文档

#### [开始使用|Go](http://fc.gd8.top)


## form-create 的用户

- [CRMEB客户管理+电商管理系统](http://demo25.crmeb.net)账号：demo 密码：crmeb.com


## 1.5 版本重大更新

- 优化 **内部重构**
- 优化 内置组件缓存功能,**按需重新渲染**
- 优化 **性能优化**,优化内部结构,优化内部事件机制,**性能秒杀之前所有版本**
- 增强 **maker 生成器功能**,可直接根据具体type 生成,例如`datePicker`组件的`.date`、`.dateRange`等


## 更新说明

> 建议保持在最新版本

#### 1.5.0 (2018-12-15)

* 优化 **内部重构**
* 优化 内置组件缓存功能,**按需重新渲染**
* 优化 **性能优化**,优化内部结构,优化内部事件机制,**性能秒杀之前所有版本**
* 增强 **maker 生成器功能**,可直接根据具体type 生成,例如`datePicker`组件的`.date`、`.dateRange`等
* 新增 `options`、`onSuccess` 方法,重新修改 options 配置
* 新增 `sync(field)`**手动刷新**指定组件、和`reflash`方法**手动全局刷新**
* 新增 `autoComplete`  **自动生成组件**
* 增强 自定义组件
* 新增 `createTmp `的别名`template`
* 修复 自定义组件获取 `$el`
* 修复 `upload` 组件上传失败后会显示新图片
* 新增 `options.mounted`增加参数`$f`
* 修复 `checkbox`  和`radio`组件首屏加载时选中 bug
* 新增  配置参数`options.switchMaker=ture`是否将规则中的 maker 生成器自动转换为对象
* 新增 配置参数`options.iframeHelper=false`是否开启 `iframe`组件 **子页面助手函数**`${field}_change` ,**快速修改该组件的 value**.**跨域无效**


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
<!-- import Vue 2.5.16-->
<script src="https://cdn.bootcss.com/vue/2.5.13/vue.min.js"></script>

<!-- import iview 2.14.3-->
<link rel="stylesheet" href="https://cdn.bootcss.com/iview/2.13.0/styles/iview.css">
<script src="https://cdn.bootcss.com/iview/2.13.0/iview.min.js"></script>

<!-- 省市区三级联动json数据,不使用三级联动不需要引入 -->
<script src="district/province_city_area.js"></script>

<!-- 模拟数据,实际使用中不需要引入 -->
<script src="demo/mock.js"></script>

<!-- import formCreate -->
<script src="dist/form-create.min.js"></script>
```
NodeJs:
```js

import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import formCreat from 'form-create'
//三级联动数据,不使用三级联动不需要引入
import 'form-create/district/province_city_area.js'
//示例规则,实际使用中不需要引入
import 'form-create/mock.js'
Vue.use(iview)
Vue.use(formCreat)
```



## 查看示例

```shell
npm run dev
```
OR

`双击打开 demo/index.html`





## 生成

```javascript
//示例规则
let rules = window.mock;
new Vue({
    data:{
        formData:{}
    },
    mounted:function(){
        let root = document.getElementById('app'),that = this;
        $f = this.$formCreate(mock,{
            el:root,
            onSubmit:function (formData) {
                console.log(formData);
                //提交状态
                $f.btn.loading();
                //点击状态
                //$f.btn.finish();
                //创建第二个表单
                $f2 = that.$formCreate(mock,root);
            }
            });
        //动态添加表单元素
        $f.append($r,'goods_name');
        //绑定表单数据到formData
        this.formData = $f.model();

    }
})
```



## 组件模式

```html
<form-create ref="fc" :rule="rule" :option="option"></form-create>
```

```javascript
    new Vue({
        el:'#app1',
        data:{
            formData:{},
            rule:mock,
            option:{
                //显示表单重置按钮
                resetBtn:true,
                //表单提交事件
                onSubmit:function (formData) {
                    alert(JSON.stringify(formData));
                    //按钮进入提交状态
                    $f.btn.loading();
                    //重置按钮禁用
                    $f.resetBtn.disabled();
                    //按钮进入可点击状态
//                    $f.btn.finish();
                    //创建第二个表单
                    $f = that.$formCreate(mock,root);
                }
            }
        },
        watch:{
            'formData.address':{
                handler:function (n) {
                    console.log(n);
                },
                deep:true
            }
        },
        mounted:function () {
            $f = this.$refs.fc.$f;
        }
    });
```




## 参考

vue框架: [Vue](https://github.com/vuejs/vue)

iviewUI框架: [iview](https://github.com/iview/iview)

validate 表单验证规则，具体配置查看: [async-validator](https://github.com/yiminghe/async-validator)

accept 文件类型:  [attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

icon图标: [图标](https://www.iviewui.com/components/icon#示例)

form-builder: [使用PHP快速生成现代化表单](https://github.com/xaboy/form-builder)


## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss) | 讨论群里的大佬们



## 联系

##### 联系邮箱 : xaboy2005@qq.com









