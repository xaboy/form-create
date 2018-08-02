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
  <b>具有数据收集、校验和提交功能的表单生成器，支持双向数据绑定和事件扩展，组件包含有复选框、单选框、输入框、下拉选择框等表单元素以及省市区三级联动,时间选择,日期选择,颜色选择,滑块,评分,框架,文件/图片上传等功能组件。</b>
</p>
<br />

### [中文文档](https://xaboy.gitbooks.io/form-create/content/kuai-su-shang-shou.html)

### 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！
 
### 本项目还在不断开发完善中,如有建议或问题请[在这里提出](https://github.com/xaboy/form-create/issues/new)

## 1.3 版本重大更新

- 优化和精简内部结构
- 支持 双向数据绑定!!!
- 支持 全局方法快速创建表单
- 新增 `option.mounted`事件，当组件加载完成后触发
- 修复 一些BUG

## 更新说明

#### 1.3.0 (2018-6-24)
- 优化和精简内部结构
- 支持 双向数据绑定,可动态修改组件的值和配置参数。单独绑定`make.model(obj,field=''')`,批量绑定`$f.model(obj)`
- 支持 使用`window.formCreate`全局方法快速创建表单，也可以在Vue内部使用`this.$formCreate`
- 新增 `option.mounted`事件 ，当组件加载完成后触发
- 修复 一些BUG

#### 1.2.3 (2018-6-13)
- 新增 frame组件,可通过iframe扩展功能,例如:在已有素材库中选择图片,文件等,图标等定制功能扩展
- 修改 Upload组件type为file时默认不可预览

#### 1.2.2 (2018-5-28)
- 修复 Bug
- 修复 显示问题

#### 1.2.1 (2018-5-27)
- 内部结构优化
- 新增 规则生成器`$formCreate.maker`
- 新增 滑块、评分组件
- 优化 文件上传组件
- 修复 上传组件无法验证等问题
> 感谢 [wxxtqk](https://github.com/wxxtqk) | [williamBoss](https://github.com/williamBoss)


## 示例 [代码](https://github.com/xaboy/form-create/blob/master/demo/mock.js) 

![https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/dev/images/sample110.jpg)


## 安装

```c
npm install form-create
```
OR
```c
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
//三级联动数据,不使用三级联动不需要引入
import 'form-create/district/province_city_area.js'
//示例规则,实际使用中不需要引入
import 'form-create/mock.js'
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import formCreat from 'form-create'
Vue.use(iView);
Vue.use(formCreat)
```
**注意! iview版本为`2.14.3`,Vue版本为`2.5.*`**

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
        $f.model(this.formData);
        
    }
})
```


#### $formCreate 表单生成器参数

* **rules**  表单生成规则:Array  [inputRule,selectRule,...],可使用`$formCreate.maker` 快速生成规则
* **options** 初始化配置参数:Object ([详细见底部 createOptions](#全局配置-createoptions))

#### $formCreate.maker 组件规则生成器

>   **除hidden外,其他配置方式全部相同.详细参考[表单元素规则](#rules-表单元素规则)**
>
>   **props,event,slot传入参数为对象,例({key:value,...})**
>
>   **validate,options传入参数为数组,例([options,options,..])**
>
>   **model(obj,field = '') 将在组件绑定到obj.field ，field为空默认时为rule.field**
>
>   `$formCreate.maker`指的是 vue内部的 `this.$formCreate.maker` 或者 `window.formCreate.maker`



* **hidden** 生成隐藏字段

```javascript
$formCreate.maker.hidden(field,value)
```

* **input** 生成input输入框

```javascript
$formCreate.maker.input(title,field,value)
```

* **radio** 生成单选框

```javascript
$formCreate.maker.radio(title,field,value)
```

* **checkbox** 生成复选框

```javascript
$formCreate.maker.radio(title,field,value) //value为array类型
```

* **select** 生成select选择器

```javascript
$formCreate.maker.select(title,field,value) //多选是value为array类型
```

* **switch** 生成switch开关

```javascript
$formCreate.maker.switch(title,field,value)
```

* **datepicker** 生成日期选择器组件,别名`date`

```javascript
$formCreate.maker.date(title,field,value) //type为daterange或datetimerange时 value为array类型
```

* **timepicker** 生成时间选择器组件,别名`time`

```javascript
$formCreate.maker.time(title,field,value) //type为timerange时 value为array类型
```

* **inputnumber** 生成数字输入框,别名`number`

```javascript
$formCreate.maker.number(title,field,value)
```

* **colorpicker** 生成颜色选择器组件,别名`color`

```javascript
$formCreate.maker.color(title,field,value)
```

* **cascader** 生成多级联动组件`

```javascript
$formCreate.maker.cascader(title,field,value) //value为array类型
```

* **upload** 生成上传组件`

```javascript
$formCreate.maker.upload(title,field,value)
```

* **rate** 生成评分组件`

```javascript
$formCreate.maker.rate(title,field,value)
```

* **slider** 生成滑块组件`

```javascript
$formCreate.maker.rate(title,field,value) //props range为true时 value为array类型
```

* **frame** 生成框架组件`

```javascript
$formCreate.maker.frame(title,field,value)
```


#### $f 实例方法

* **formData()** 获取表单的value
* **getValue(field)** 获取指定字段的value
* **model(obj)** 绑定表单组件到obj对象，支持双向数据绑定。结构`{field:{value,rule:{props,validate,options,slot,event}}}`
>当修改后没有生效时 请尝试用`vm.$set`方法修改

* **changeField(field,value)** 修改指定字段的value
* **resetFields()** 重置表单
* **destroy()** 销毁表单
* **removeField(field)** 删除指定字段
* **fields()** 获得表单所有字段名称
* **closeModal()** 关闭frame组件的弹出框
* **submit()** 表单验证通过后提交表单,触发onSubmit事件
* **validate(successFn,errorFn)** 表单验证,如果验证通过执行successFn,未通过则执行errorFn
* **validateField(field,callback)** 表单验证指定字段
```javascript
    $f.validateField(field,(errMsg)=>{
        if(errMsg){
            //TODO 验证未通过
        }else{
            //TODO 验证通过
        }
    });
```

* **prepend(rule,field = undefined)** 在field的字段之前输入指定表单元素,不传入field默认在第一个

```javascript
    $f.prepend({
       type:"input",
       title:"商品简介",
       field:"goods_info",
       value:"",
       props: {
           "type": "text",
           "placeholder": "请输入商品简介",
       },
       validate:[
           { required: true, message: '请输入商品简介', trigger: 'blur' },
       ],
   });
```

* **append(rule,field = undefined)** 在field的字段之前输入指定表单元素,不传入field默认在最后一个

```javascript
    $f.append($formCreate.maker.upload('产品主图','logo','http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg')
        .props({
              "action": "",
              "maxLength": 1,
              "multiple": false,
              "type": "select",
              "uploadType": "image",
              "name": "file",
              "onSuccess": function () {
                  return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
              }
        })
        .validate({required:true, type: 'array', min: 1, message: '请上传1张图片', trigger: 'change'})
    ,'goods_name');
```

* **submitStatus(props)** 修改表单提交按钮状态

```javascript
    $f.submitStatus({
        //按钮类型，可选值为primary、ghost、dashed、text、info、success、warning、error或者不设置
        type:"primary",
        //按钮大小，可选值为large、small、default或者不设置
        size:"large",
        //按钮形状，可选值为circle或者不设置
        shape:undefined,
        //开启后，按钮的长度为 100%
        long:true,
        //设置button原生的type，可选值为button、submit、reset
        htmlType:"button",
        //设置按钮为禁用状态
        disabled:false,
        //设置按钮的图标类型
        icon:"ios-upload",
        //按钮文字提示
        innerText:"提交",
        //设置按钮为加载中状态
        loading:false
    })
```

* **btn.loading()** 让表单提交按钮进入loading状态 
* **btn.finish()** 让表单提交按钮恢复正常状态 

## rules 表单元素规则

#### hidden 隐藏字段

maker快速生成:

```javascript
$formCreate.maker.hidden('id','14');
```

原始参数:
```javascript
hiddenRule:
{
  type:"hidden",//必填!
  //字段名称
  field:"id", //必填!
  //input值
  value:"14" //必填!
}
```


#### input 输入框

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/input.html)

maker快速生成:

```javascript
$formCreate.maker.input("商品名称","goods_name","iphone 7").props({
     clearable:true,
     placeholder: "请输入商品名称"
}).validate([
     { required: true, message: '请输入goods_name', trigger: 'blur' },
]);
```

原始参数:

```javascript
inputRule :
{
        type:"input",//必填! 
        //label名称
        title:"商品名称",//必填!
        //字段名称
        field:"goods_name",//必填!
        //input值
        value:"iphone 7",
        props: {
            
            //输入框类型，可选值为 text、password、textarea、url、email、date
            "type": "text", //必填!
            //是否显示清空按钮
            "clearable":false, 
            //设置输入框为禁用状态
            "disabled": false, 
            //设置输入框为只读
            "readonly": false,
            //文本域默认行数，仅在 textarea 类型下有效
            "rows": 4, 
            //自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }
            "autosize": false, 
            //将用户的输入转换为 Number 类型
            "number": false, 
            //自动获取焦点
            "autofocus": false, 
            //原生的自动完成功能，可选值为 off 和 on
            "autocomplete": "off", 
            //占位文本
            "placeholder": "请输入商品名称", 
            //输入框尺寸，可选值为large、small、default或者不设置
            "size": "default",
            //原生的 spellcheck 属性
            "spellcheck": false,
        },
        event:{
            //按下回车键时触发
            enter:(event)=>{},
            //设置 icon 属性后，点击图标时触发
            click:(event)=>{},
            //数据改变时触发
            change:(event)=>{},
            //输入框聚焦时触发
            focus:(event)=>{},
            //输入框失去焦点时触发
            blur:(event)=>{},
            //原生的 keyup 事件
            keyup:(event)=>{},
            //原生的 keydown 事件
            keydown:(event)=>{},
            //原生的 keypress 事件
            keypress:(event)=>{},
        },
        validate:[
            { required: true, message: '请输入goods_name', trigger: 'blur' },
        ],
    }
```



#### radio 单选框

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/radio.html)

maker快速生成:

```javascript
$formCreate.maker.radio("是否包邮","is_postage","0").options([
     {value:"0",label:"不包邮",disabled:false},
     {value:"1",label:"包邮",disabled:true},
]);
```

原始参数:

```javascript
radioRule :
{
        type:"radio",//必填!
        //label名称
        title:"是否包邮",//必填!
        //字段名称
        field:"is_postage",//必填!
        //input值
        value:"0",
        //可选参数
        options:[
            {value:"0",label:"不包邮",disabled:false},
            {value:"1",label:"包邮",disabled:true},
        ],//必填!
        props: {
        	//可选值为 button 或不填，为 button 时使用按钮样式
            "type":undefined, 
            //单选框的尺寸，可选值为 large、small、default 或者不设置
            "size":"default", 
            //是否垂直排列，按钮样式下无效
            "vertical":false, 
        },
        event:{
            //在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发
            change:(...arg)=>{},
        },
        validate:[],
    }
```



#### checkbox 复选框

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/checkbox.html)

maker快速生成:

```javascript
$formCreate.maker.checkbox("标签","label",["1","2","3"]).options([
     {value:"1",label:"好用",disabled:true},
     {value:"2",label:"方便",disabled:false},
     {value:"3",label:"实用",disabled:false},
     {value:"4",label:"有效",disabled:false},
]);
```

原始参数:

```javascript
checkboxRule :
{
        type:"checkbox",//必填!
        //label名称
        title:"标签",//必填!
        //字段名称
        field:"label",//必填!
        //input值
        value:[
            "1","2","3"
        ],
        //可选参数
        options:[
            {value:"1",label:"好用",disabled:true},
            {value:"2",label:"方便",disabled:false},
            {value:"3",label:"实用",disabled:false},
            {value:"4",label:"有效",disabled:false},
        ],//必填!
        props: {
        	//多选框组的尺寸，可选值为 large、small、default 或者不设置
            "size":"default", 
        },
        event:{
            //只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发
            change:(...arg)=>{},
        },
        validate:[],
    }
```



#### select 选择器

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/select.html)

maker快速生成:

```javascript
$formCreate.maker.select("产品分类","cate_id",["104","105"]).options([
     {"value": "104", "label": "生态蔬菜", "disabled": false},
     {"value": "105", "label": "新鲜水果", "disabled": false},
]);
```

原始参数:

```javascript
selectRule :
{
        type: "select",//必填!
        field: "cate_id",//必填!
        title: "产品分类",//必填!
        //input值
        value: ["104","105"],
        //可选参数
        options: [
            {"value": "104", "label": "生态蔬菜", "disabled": false},
            {"value": "105", "label": "新鲜水果", "disabled": false},
        ],//必填!
        props: {
       	 	//是否支持多选
            "multiple": true, 
            //是否可以清空选项，只在单选时有效
            "clearable": false,
            //是否支持搜索
            "filterable": true, 
            
            // 暂不支持远程搜索
            // "remote": false, //是否使用远程搜索
            // "remote-method":Function, //远程搜索的方法
            // "loading": false, //当前是否正在远程搜索
            // "loading-text": "加载中", //远程搜索中的文字提示
            //选择框大小，可选值为large、small、default或者不填
            "size":"default", 
            //选择框默认文字
            "placeholder": "请选择", 
             //当下拉列表为空时显示的内容
            "not-found-text": "无匹配数据",
            //弹窗的展开方向，可选值为 bottom 和 top
            "placement": "bottom", 
            //是否禁用
            "disabled": false, 
        },
        event:{
            //选中的Option变化时触发，返回 value
            change:(checked)=>{},
            //搜索词改变时触发
            'query-change':(keyword)=>{},
        },
        validate:[],
    }
```



#### switch 开关

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/switch.html)

maker快速生成:

```javascript
$formCreate.maker.switch("是否上架","is_show","1").options([
     {"value": "104", "label": "生态蔬菜", "disabled": false},
     {"value": "105", "label": "新鲜水果", "disabled": false},
]).slot({open:"上架",close:"下架"}).props({"trueValue":"1","falseValue":"0"});
```

原始参数:

```javascript
switchRule :
{
        type:"switch",//必填!
        //label名称
        title:"是否上架",//必填!
        //字段名称
        field:"is_show",//必填!
        //input值
        value:"1",
        props: {
        	//开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。
            "size":"default", 
            //禁用开关
            "disabled":false,
            //选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
            "trueValue":"1", 
            //没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
            "falseValue":"0", 
        },
        slot: {
        	//自定义显示打开时的内容
            open:"上架", 
            //自定义显示关闭时的内容
            close:"下架", 
        },
        event:{
            //开关变化时触发，返回当前的状态 0 | 1
            change:(bool)=>{},
        },
        validate:[],
    }
```



#### DatePicker 日期选择器

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/datepicker.html)

maker快速生成:

```javascript
$formCreate.maker.date("活动日期","section_day",['2018-02-20', new Date()])
  .props({
    "type": "datetimerange",
  	"placeholder":"请选择活动日期", 
});
```

原始参数:

```javascript
DatePickerRule :
{
        type: "DatePicker",//必填!
        field: "section_day",//必填!
        title: "活动日期",//必填!
        //input值, type为daterange,datetimerange value为数组 [start_value,end_value]
        value: ['2018-02-20', new Date()], 
        props: {
            
            //显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
            "type": "datetimerange",//必填!
            //展示的日期格式
            "format": "yyyy-MM-dd HH:mm:ss", 
            //日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
            "placement": "bottom-start", 
            //占位文本
            "placeholder":"请选择获得时间", 
            //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
            "confirm":false, 
            //尺寸，可选值为large、small、default或者不设置
            "size":"default", 
            //是否禁用选择器
            "disabled":false, 
            //是否显示清除按钮
            "clearable":true, 
            //完全只读，开启后不会弹出选择器
            "readonly":false, 
            //文本框是否可以输入
            "editable":false, 
        },
        event:{
            //日期发生变化时触发,已经格式化后的日期，比如 2016-01-01
            change:(value)=>{},
            //弹出日历和关闭日历时触发 true | false
            'open-change':(bool)=>{},
            //在 confirm 模式或 clearable = true 时有效，在清空日期时触发
            clear:(...arg)=>{},
        },
        validate:[],
    }
```



#### TimePicker 时间选择器

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/timepicker.html)

maker快速生成:

```javascript
$formCreate.maker.time("活动时间","section_time",[])
  .props({
    "type": "timerange",
  	"placeholder":"请选择活动时间", 
});
```

原始参数:

```javascript
TimePickerRule :
{
        type: "TimePicker",//必填!
        field: "section_time",//必填!
        title: "活动时间",//必填!
        //input值, type为timerange value为数组 [start_value,end_value]
        value: [], 
        props: {
            //显示类型，可选值为 time、timerange
            "type": "timerange", //必填!
            //展示的时间格式
            "format": "HH:mm:ss", 
            //下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。
            "steps": [], 
            //时间选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
            "placement": "bottom-start", 
            //占位文本
            "placeholder":"请选择活动时间", 
            //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
            "confirm":false, 
            //尺寸，可选值为large、small、default或者不设置
            "size":"default",
            //是否禁用选择器
            "disabled":false, 
            //是否显示清除按钮
            "clearable":true, 
            //完全只读，开启后不会弹出选择器
            "readonly":false, 
            //文本框是否可以输入
            "editable":false, 
        },
        event:{
            //时间发生变化时触发 已经格式化后的时间，比如 09:41:00
            change:(checked)=>{},
            //弹出浮层和关闭浮层时触发 true | false
            'open-change':(bool)=>{},
            //在清空日期时触发
            clear:(...arg)=>{},
        },
        validate:[],
    }
```



####  InputNumber 数字输入框

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/inputnumber.html)

maker快速生成:

```javascript
$formCreate.maker.number("排序","sort",1)
  .props({
    "type": "timerange",
  	"precision":0, 
});
```

原始参数:

```javascript
InputNumberRule :
{
        type: "InputNumber",//必填!
        field: "sort",//必填!
        title: "排序",//必填!
        //input值
        value: 1,
        props: {
        	//最大值
            "max": undefined, 
            //最小值
            "min": undefined, 
            //每次改变的步伐，可以是小数
            "step": 1, 
            //输入框尺寸，可选值为large、small、default或者不填
            "size":"default", 
            //设置禁用状态
            "disabled":false, 
            //是否设置为只读
            "readonly":false, 
            //是否可编辑
            "editable":true, 
            //数值精度
            "precision":0, 
        },
        event:{
            //数值改变时的回调，返回当前值
            change:(value)=>{},
            //聚焦时触发
            focus:(event)=>{},
            //失焦时触发
            blur:(event)=>{},
        },
        validate:[],
    }
```



#### ColorPicker 颜色选择器

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/colorpicker.html)

maker快速生成:

```javascript
$formCreate.maker.color("颜色","color",'#ff7271')
  .props({
    "format":"hex"
});
```

原始参数:

```javascript
ColorPickerRule :
{
        type: "ColorPicker",//必填!
        field: "color",//必填!
        title: "颜色",//必填!
        //input值
        value: '#ff7271', 
        props: {
        	//是否支持透明度选择
            "alpha": false, 
            //是否支持色彩选择
            "hue": true, 
            //是否显示推荐的颜色预设
            "recommend": false, 
            //尺寸，可选值为large、small、default或者不设置
            "size":"default", 
            //自定义颜色预设
            "colors":[], 
            //颜色的格式，可选值为 hsl、hsv、hex、rgb,开启 alpha 时为 rgb，其它为 hex
            "format":"hex", 
        },
        event:{
            //当绑定值变化时触发，返回当前值
            change:(color)=>{},
            //聚焦时触发 面板中当前显示的颜色发生改变时触发
            'active-change':(color)=>{},
        },
        validate:[],
    }
```


#### Cascader 多级联动

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/cascader.html)

maker快速生成:

```javascript
$formCreate.maker.cascader("所在区域","address",['陕西省','西安市','新城区'])
  .props({
    data:window.province,
  	placeholder:'请选择所在区域',
});
```

原始参数:

```javascript
CascaderRule:
{
        type:"cascader",//必填!
        title:"所在区域",//必填!
        field:"address",//必填!
        //input值
        value:['陕西省','西安市','新城区'],
        props:{
            //可选项的数据源，格式参照示例说明
            data:window.province || [],//必填!
            //选择后展示的函数，用于自定义显示格式
            renderFormat:label => label.join(' / '),
            //是否禁用选择器
            disabled:false,
            //是否支持清除
            clearable:true,
            //输入框占位符
            placeholder:'请选择',
            //次级菜单展开方式，可选值为 click 或 hover
            trigger:'click',
            //当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的示例
            changeOnSelect:false,
            //输入框大小，可选值为large和small或者不填
            size:undefined,
            //动态获取数据，数据源需标识 loading
            loadData:()=>{},
            //是否支持搜索
            filterable:false,
            //当搜索列表为空时显示的内容
            notFoundText:'无匹配数据',
            //是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
            transfer:false,
        },
        event:{
            //选择完成后的回调，返回值 value 即已选值 value，selectedData 为已选项的具体数据
            change:(value, selectedData)=>{},
            //展开和关闭弹窗时触发
            'visible-change':bool=>{}
        },
        validate:[],

    }
```



#### Upload 上传

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/upload.html)

maker快速生成:

```javascript
$formCreate.maker.upload("轮播图","pic",['http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg','http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'])
  .props({
    "action": "",
    "maxLength": 1,
    "multiple": false,
    "type": "select",
    "uploadType": "image",
    "name": "file",
    "onSuccess": function () {
        return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
    }
}).validate({required:true, type: 'array', min: 1, message: '请上传1张图片', trigger: 'change'});
```

原始参数:

```javascript
UploadRule :
{
        type: "Upload",//必填!
        field: "pic",//必填!
        title: "轮播图",//必填!
        //input值,当maxLength等与1时值为字符串,大于1时值为数组
        value: ['http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg','http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'], //input值
        props: {
            //上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
            "type":"select", //必填!
            //上传文件类型，可选值为 image（图片上传），file（文件上传）
            "uploadType":"image", //必填!
            //上传的地址
            "action": "", //必填! 
            //上传的文件字段名
            "name":"", 
            //上传时附带的额外参数
            "data":{}, 
            //设置上传的请求头部
            "headers": {}, 
            //是否支持多选文件
            "multiple": true,
            //支持发送 cookie 凭证信息
            "withCredentials":false, 

            //不支持
            // "showUploadList":false, //是否显示已上传文件列表
            // "defaultFileList":[], // 默认已上传的文件列表
			
            //接受上传的文件类型
            "accept":"",
            //支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
            "format":[], 
            //文件大小限制，单位 kb
            "maxSize":undefined, 
            //可上传文件数量
            "maxLength":1,
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            "beforeUpload":()=>{}, 
            //文件上传时的钩子，返回字段为 event, file, fileList
            "onProgress":()=>{}, 
            //文件上传成功时的钩子，返回字段为 response, file, fileList,若需有把文件添加到文件列表中,在函数值返回即可
            "onSuccess":function () {
                return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
            }, //必填!
            //文件上传失败时的钩子，返回字段为 error, file, fileList
            "onError":(error, file, fileList)=>{}, 
            //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
            "onPreview":()=>{}, 
            //文件列表移除文件时的钩子，返回字段为 file, fileList
            "onRemove":()=>{}, 
            //文件格式验证失败时的钩子，返回字段为 file, fileList
            "onFormatError":()=>{}, 
            //文件超出指定大小限制时的钩子，返回字段为 file, fileList
            "onExceededSize":()=>{}, 
            //辅助操作按钮的图标 ,设置为false将不显示
            handleIcon:'ionic',
            //点击辅助操作按钮事件
            onHandle:(src)=>{},
            //是否可删除,设置为false是不显示删除按钮
            allowRemove:true,
        },
    }
```



#### Slider 滑块

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/slider.html)

maker快速生成:

```javascript
$formCreate.maker.slider('滑块','slider',[0,52]).props({
        "min": 0,
        "max": 100,
        "showTip":"always",
  		"range": true
    });
```

原始参数:

```javascript
SliderRule :
{
     type:"slider",
     field:"slider",
     title:"滑块",
      value:[0,50], //滑块选定的值。普通模式下，数据格式为数字，在双滑块模式下，数据格式为长度是2的数组，且每项都为数字
     props:{
          "min": 0, //最小值
         "max": 100, //最大值
         "step": 1, //步长，取值建议能被（max - min）整除
         "disabled": false, //是否禁用滑块
         "range": true, //是否开启双滑块模式
         "showInput":false, //是否显示数字输入框，仅在单滑块模式下有效
         "showStops":true, //是否显示间断点，建议在 step 不密集时使用
          "showTip":"hover", //提示的显示控制，可选值为 hover（悬停，默认）、always（总是可见）、never（不可见）
         "tipFormat":undefined, //Slider 会把当前值传给 tip-format，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip
         "inputSize":"small", //数字输入框的尺寸，可选值为large、small、default或者不填，仅在开启 show-input 时有效
     },
      event:{
         //在松开滑动时触发，返回当前的选值，在滑动过程中不会触发
         change:(value)=>{},
         //滑动条数据变化时触发，返回当前的选值，在滑动过程中实时触发
         input:(value)=>{},
     },
     validate:[]
 }
```



#### Rate 评分

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/rate.html)

maker快速生成:

```javascript
$formCreate.maker.rate('推荐级别','rate',2)
        .props({
            "count": 10,
            "allowHalf": false
        }).validate({required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'});
```

原始参数:

```javascript
RateRule :
{
        type:"rate",
        field:"rate",
        title:"推荐级别",
        value:3.5,
        props:{
            "count": 10, //star 总数
            "allowHalf": true, //是否允许半选
            "disabled": false, //是否只读，无法进行交互
            "showText": true, //是否显示提示文字
            "clearable": true, //是否可以取消选择
        },
        event:{
            //评分改变时触发
            change:(value)=>{},
        },
        validate:[
            {required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'}
        ]
}
```


#### Frame 框架

[规则说明](https://xaboy.gitbooks.io/form-create/content/biao-dan-yuan-su/frame.html)

maker快速生成:

```javascript
maker.frame('素材','fodder',["http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg"]).props({
        src:"iframe.html",
        maxLength:2,
        type:"image"
    }).validate([
        {required:true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change'}
    ]).event({
              remove:()=>{return false;}
})
```

原始参数:

```javascript
FrameRule :
{
        type:"frame",
        title:"素材",
        field:"fodder",
        value:["http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg"],
        props:{
            type:"image", //frame类型,有input,file,image
            src:"iframe.html", //iframe地址
            maxLength:2, //value的最大数量
            icon:'folder', //打开弹出框的按钮图标
            height:"220px", //弹出框高度
            width:"350px", //弹出框宽度
            spin:false, //是否显示加载动画
            title:"请选择", //弹出框标题
            handleIcon: true, //操作按钮的图标 ,设置为false将不显示,设置为true为默认的预览图标,类型为file时默认为false,image类型默认为true
            allowRemove:true, //是否可删除,设置为false是不显示删除按钮
        },
        event:{
            change:()=>{console.log('change')}, //value改变时触发
            open:()=>{console.log('open')}, //打开弹出层回调
            ok:()=>{console.log('ok')}, //点击确定时的回调
            handle:undefined, //点击操作按钮事件,默认为图片预览
            remove:()=>{return false;} //点击删除按钮事件,返回false将不删除
        },
        validate:[
            {required:true, type: 'array', min: 5, message: '请选择5张图片', trigger: 'change'}
        ],
    }
```


## 全局配置 createOptions

```javascript
{
    //插入节点,默认document.body
    el:null,
    //form配置
    form:{
    
        //是否开启行内表单模式
        inline:false,
        //表单域标签的位置，可选值为 left、right、top
        labelPosition:'right',
        //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
        labelWidth:125,
        //是否显示校验错误信息
        showMessage:true,
        //原生的 autocomplete 属性，可选值为 off 或 on
        autocomplete:'off',
    },
    //文件上传全局配置
    upload:{
    
        //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
        beforeUpload:()=>{},
        //文件上传时的钩子，返回字段为 event, file, fileList
        onProgress:(event, file, fileList)=>{},
        //文件上传成功时的钩子，返回字段为 response, file, fileList,若需有把文件添加到文件列表中,在函数值返回即可
        onSuccess:(response, file, fileList)=>{
            // return 'filePath';
        },
        //文件上传失败时的钩子，返回字段为 error, file, fileList
        onError:(error, file, fileList)=>{},
        //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
        onPreview:(file)=>{},
        //文件列表移除文件时的钩子，返回字段为 file, fileList
        onRemove:(file, fileList)=>{},
        //文件格式验证失败时的钩子，返回字段为 file, fileList
        onFormatError:(file, fileList)=>{},
        //文件超出指定大小限制时的钩子，返回字段为 file, fileList
        onExceededSize:(file, fileList)=>{},
        //辅助操作按钮的图标 ,设置为false将不显示
        handleIcon:'ios-eye-outline',
        //点击辅助操作按钮事件
        onHandle:(src)=>{},
        //是否可删除,设置为false是不显示删除按钮
        allowRemove:true,
    },
    
    //表单提交事件
    onSubmit:(formData)=>{},
    
    //提交按钮配置,设置为false时不显示按钮
    submitBtn:{
    
        //按钮类型，可选值为primary、ghost、dashed、text、info、success、warning、error或者不设置
        type:"primary",
        //按钮大小，可选值为large、small、default或者不设置
        size:"large",
        //按钮形状，可选值为circle或者不设置
        shape:undefined,
        //开启后，按钮的长度为 100%
        long:true,
        //设置button原生的type，可选值为button、submit、reset
        htmlType:"button",
        //设置按钮为禁用状态
        disabled:false,
        //设置按钮的图标类型
        icon:"ios-upload",
        //按钮文字提示
        innerText:"提交",
        //设置按钮为加载中状态
        loading:false,
    }
}
```

## 时间格式

| 名称   | 说明          | 示例      |
| ---- | ----------- | ------- |
| yyyy | 年份（四位）      | 2016    |
| yy   | 年份（两位）      | 16      |
| MM   | 月份（两位）      | 01      |
| M    | 月份（一位）      | 1       |
| MMMM | 月份（英文）      | January |
| MMM  | 月份（英文简写）    | Jan     |
| dd   | 日期（两位）      | 01      |
| d    | 日期（一位）      | 1       |
| Do   | 日期（简写）      | 1st     |
| DD   | 星期（两位）      | 00      |
| D    | 星期（一位）      | 0       |
| dddd | 星期（英文）      | Monday  |
| ddd  | 星期（英文简写）    | Mon     |
| HH   | 小时（24小时制两位） | 01      |
| H    | 小时（24小时制一位） | 1       |
| hh   | 小时（12小时制两位） | 01      |
| h    | 小时（12小时制一位） | 1       |
| mm   | 分钟（两位）      | 01      |
| m    | 分钟（一位）      | 1       |
| ss   | 秒钟（两位）      | 01      |
| s    | 秒钟（一位）      | 1       |
| SSS  | 毫秒（三位）      | 019     |
| SS   | 毫秒（两位）      | 01      |
| S    | 毫秒（一位）      | 1       |
| A    | 上午与下午（大写）   | AM/PM   |
| a    | 上午与下午（小写）   | am/pm   |
| ZZ   | 时区          | +0800   |

以上是 iView 支持的日期格式，你可以自由组合出你需要的类型，例如：

- **yyyy年M月d日**：2016年1月1日
- **MM/dd/yy**：12/24/16
- **H点m分s秒**：9点41分0秒




## 参考

iview框架：[iview](https://github.com/iview/iview)

validate 表单验证规则，具体配置查看：[async-validator](https://github.com/yiminghe/async-validator)

accept 文件类型： [attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

iCon图标:[图标](https://www.iviewui.com/components/icon#示例)

form-builder [使用PHP快速生成现代化表单](https://github.com/xaboy/form-builder)


## 感谢

[时光弧线](https://github.com/shiguanghuxian)  |  [wxxtqk](https://github.com/wxxtqk)  |  [williamBoss](https://github.com/williamBoss)




## 联系

##### 联系邮箱 : xaboy2005@qq.com









