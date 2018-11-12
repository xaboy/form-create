<p align="center">
    <a href="https://github.com/xaboy/form-create">
        <img width="200" src="http://file.lotkk.com/form-create.png">
    </a>
</p>
<h1 align="center">form-create</h1>

<p align="center">
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
  <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/gh/xaboy/form-create@1.3.0/dist/form-create.min.js?compression=gzip&amp;label=gzip%20size&amp;style=flat-square" alt="JS gzip size">
</p>

<p align="center">
  <b>具有数据收集、校验和提交功能的表单生成器，支持双向数据绑定和事件扩展，组件包含有复选框、单选框、输入框、下拉选择框等表单元素以及省市区三级联动,时间选择,日期选择,颜色选择,滑块,评分,框架,树型,文件/图片上传等功能组件。</b>
</p>
<br />

> 1.4.5 版本已支持 iview3



### [开始使用](http://fc.gd8.top/749554) | [原说明文档](https://github.com/xaboy/form-create/wiki/%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3)

### 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！

### 本项目还在不断开发完善中,如有`任何`建议或问题请[在这里提出](https://github.com/xaboy/form-create/issues/new)

### 本项目QQ讨论群[28963712](https://jq.qq.com/?_wv=1027&k=54aKUVw)

## 1.4 版本重大更新

- 新增 使用标签模式生成 `<form-create>`
- 优化 maker规则生成器
- 新增 **生成任意标签组件** `maker.create(componentName)
- 新增 标签模式下支持emit触发事件
- 新增 使用 **template 快速生成自定义组件** `maker.createTmp(template,vm)`
- 支持 `iview>=3.1.4`版本


## 更新说明

> 建议保持在最新版本

#### 1.4.5 (2018-11-12)

* 优化 上传组件图标显示
* 修复 上传组件图片无法删除
* 新增 `options.mounted` 表单创建成功后的回调函数
* 支持 `iview>=3.1.4`版本
* 修复 上传组件图片无法删除 bug

#### 1.4.4 (2018-11-4)

* 优化 内部功能优化,参数优化
* 新增 使用 **reload 更新生成规则** `$f.reload(newRules)`
* 新增 **标签模式下生成规则发生变化时表单自动刷新**
* 修复 `npm run dev`命令无法有时打开 Demo

## 示例 [在线预览](https://jsrun.net/NQhKp/edit)

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)

## Demo

使用 maker 生成器生成: [demo](https://jsrun.net/NQhKp/edit)

使用 json 生成: [demo](https://jsrun.net/NQhKp/edit)

各组件生成: [demo](https://jsrun.net/user/xaboy)

## 安装

```shell
npm install form-create
```
OR
```shell
git clone https://github.com/xaboy/form-create.git
cd form-create
npm install
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


# 查看示例

```shell
npm run dev
```
OR

`双击打开 demo/index.html`



## 使用

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

# 组件模式下使用

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

iview框架: [iview](https://github.com/iview/iview)

validate 表单验证规则，具体配置查看: [async-validator](https://github.com/yiminghe/async-validator)

accept 文件类型:  [attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

icon图标: [图标](https://www.iviewui.com/components/icon#示例)

form-builder: [使用PHP快速生成现代化表单](https://github.com/xaboy/form-builder)


## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss) | 讨论群里的大佬们


## 联系

##### 联系邮箱 : xaboy2005@qq.com









