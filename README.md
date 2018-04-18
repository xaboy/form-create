# form-create

**使用iview动态创建form表单**

具有数据收集、校验和提交功能的表单生成器，包含复选框、单选框、输入框、下拉选择框等元素以及,省市区三级联动,时间选择,日期选择,颜色选择,文件/图片上传功能。

## 1.1版本重大更新

- 内部重构
- 新增 省市区三级联动组件
- 新增 组件事件扩展
- 优化 文件上传,时间选择等组件

## 待完善

- [ ] 动态显示隐藏表单
- [ ] 动态增加表单
- [ ] 树形控件生成

## 示例

![https://raw.githubusercontent.com/xaboy/form-create/master/images/sample110.jpg](https://raw.githubusercontent.com/xaboy/form-create/master/images/sample110.jpg)


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

```html
<!-- import Vue -->
<script src="node_modules/vue/dist/vue.min.js"></script>

<!-- import iview -->
<link rel="stylesheet" href="node_modules/iview/dist/styles/iview.css">
<script src="node_modules/iview/dist/iview.min.js"></script>

<!--省市区三级联动json数据-->
<script src="/district/province_city_area.js"></script>

<!--模拟数据-->
<script src="mock.js"></script>

<!-- import formCreate -->
<script src="dist/form-create.min.js"></script>
```

## 使用

```js
let rules = window.mock;
new Vue({
  mounted:function(){
    var $f = this.$formCreate(rules,{
                onSubmit:function (formData) {
                    console.log(formData);
                    $f.submitStatus({loading:true});
                }
            });
  }
})
```



#### $formCreate 参数

`rules`  表单规则  [inputRule,selectRule,...]

`options`  组件配置 (详细见底部 createOptions)


#### $f 实例方法

获得表单数据

`$f.formData()`

获得指定字段数据

`$f.getValue(field)`

修改表单数据

`$f.changeField(field,value)`

表单验证

`$f.validate(successFn,errorFn)`

表单验证指定字段

`$f.validateField(field,errorFn)`

重置表单

`$f.resetFields()`

删除整个表单

`$f.remove()`

删除指定字段

`$f.removeField(field)`

获得表单所有字段

`$f.fields()`

提交表单

`$f.submit()`

修改提交按钮状态

`$f.submitStatus(props) //详细见底部createOptions.submitBtn`

## rules 规则

#### hidden 隐藏字段

```js
hiddenRule:
{
  type:"hidden",
  field:"id", //字段名称
  value:"14" //input值
}
```

#### input 输入框

```js
inputRule :
{
        type:"input",
        title:"商品名称",//label名称
        field:"goods_name",//字段名称
        value:"iphone 7",//input值,
        props: {
            "type": "text", //输入框类型，可选值为 text、password、textarea、url、email、date
            "clearable":false, //是否显示清空按钮
            "disabled": false, //设置输入框为禁用状态
            "readonly": false, //设置输入框为只读
            "rows": 4, //文本域默认行数，仅在 textarea 类型下有效
            "autosize": false, //自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }
            "number": false, //将用户的输入转换为 Number 类型
            "autofocus": false, //自动获取焦点
            "autocomplete": "off", //原生的自动完成功能，可选值为 off 和 on
            "placeholder": "请输入商品名称", //占位文本
            "size": "default", //输入框尺寸，可选值为large、small、default或者不设置,
            "spellcheck": false, //原生的 spellcheck 属性
            "required":true,
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

validate 表单验证规则，具体配置查看 : [https://github.com/yiminghe/async-validator](https://github.com/yiminghe/async-validator)

#### radio 单选框

```js
radioRule :
{
        type:"radio",
        title:"是否包邮",//label名称
        field:"is_postage",//字段名称
        value:"0",//input值,
        options:[
            {value:"0",label:"不包邮",disabled:false},
            {value:"1",label:"包邮",disabled:true},
        ],
        props: {
            "type":undefined, //可选值为 button 或不填，为 button 时使用按钮样式
            "size":"default", //单选框的尺寸，可选值为 large、small、default 或者不设置
            "vertical":false, //是否垂直排列，按钮样式下无效
        },
        event:{
            //在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发
            change:(...arg)=>{},
        },
        validate:[],
    }
```

#### checkbox 复选框

```js
checkboxRule :
{
        type:"checkbox",
        title:"标签",//label名称
        field:"label",//字段名称
        value:[
            "1","2","3"
        ],//input值,
        options:[
            {value:"1",label:"好用",disabled:true},
            {value:"2",label:"方便",disabled:false},
            {value:"3",label:"实用",disabled:false},
            {value:"4",label:"有效",disabled:false},
        ],
        props: {
            "size":"default", //多选框组的尺寸，可选值为 large、small、default 或者不设置
        },
        event:{
            //只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发
            change:(...arg)=>{},
        },
        validate:[],
    }
```

#### switch 开关

```js
switchRule :
{
        type:"switch",
        title:"是否上架",//label名称
        field:"is_show",//字段名称
        value:"1",//input值,
        props: {
            "size":"default", //开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。
            "disabled":false,//禁用开关
            "trueValue":"1", //选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
            "falseValue":"0", //没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
        },
        slot: {
            open:"上架", //自定义显示打开时的内容
            close:"下架", //自定义显示关闭时的内容
        }, //slot可以不用配置
        event:{
            //开关变化时触发，返回当前的状态 0 | 1
            change:(bool)=>{},
        },
        validate:[],
    }
```

#### select 选择器

```js
selectRule :
{
        type: "select",
        field: "cate_id",
        title: "产品分类",
        props: {
            "multiple": true, //是否支持多选
            "clearable": false, //是否可以清空选项，只在单选时有效
            "filterable": true, //	是否支持搜索
            
            // 暂不支持远程搜索
            // "remote": false, //是否使用远程搜索
            // "remote-method":Function, //远程搜索的方法
            // "loading": false, //当前是否正在远程搜索
            // "loading-text": "加载中", //远程搜索中的文字提示
            
            "size":"default", //选择框大小，可选值为large、small、default或者不填
            "placeholder": "请选择", //选择框默认文字
            "not-found-text": "无匹配数据", //当下拉列表为空时显示的内容
            "placement": "bottom", //弹窗的展开方向，可选值为 bottom 和 top
            "disabled": false, //是否禁用
        },
        value: ["104","105"],
        options: [
            {"value": "104", "label": "生态蔬菜", "disabled": false},
            {"value": "105", "label": "新鲜水果", "disabled": false},
        ],
        event:{
            //选中的Option变化时触发，返回 value
            change:(checked)=>{},
            //搜索词改变时触发
            'query-change':(keyword)=>{},
        },
        validate:[],
    }
```

#### DatePicker 日期选择器

```js
DatePickerRule :
{
        type: "DatePicker",
        field: "section_day",
        title: "活动日期",
        value: [1519110955000, new Date()], //input值, type为daterange,datetimerange value为数组 [start_value,end_value]
        props: {
            "type": "datetimerange", //显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
            "format": "yyyy-MM-dd HH:mm:ss", //展示的日期格式
            "placement": "bottom-start", //	日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
            "placeholder":"请选择获得时间", //占位文本
            "confirm":false, //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
            "size":"default", //尺寸，可选值为large、small、default或者不设置
            "disabled":false, //是否禁用选择器
            "clearable":true, //是否显示清除按钮
            "readonly":false, //完全只读，开启后不会弹出选择器
            "editable":false, //文本框是否可以输入
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

```js
TimePickerRule :
{
        type: "TimePicker",
        field: "section_time",
        title: "活动时间",
        value: [], //input值, type为timerange value为数组 [start_value,end_value]
        props: {
            "type": "timerange", //显示类型，可选值为 time、timerange
            "format": "HH:mm:ss", //展示的时间格式
            "steps": [], //下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。
            "placement": "bottom-start", //	时间选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
            "placeholder":"请选择获得时间", //占位文本
            "confirm":false, //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
            "size":"default", //尺寸，可选值为large、small、default或者不设置
            "disabled":false, //是否禁用选择器
            "clearable":true, //是否显示清除按钮
            "readonly":false, //完全只读，开启后不会弹出选择器
            "editable":false, //文本框是否可以输入
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

```js
InputNumberRule :
{
        type: "InputNumber",
        field: "sort",
        title: "排序",
        value: 0, //input值
        props: {
            "max": undefined, //最大值
            "min": undefined, //最小值
            "step": 1, //每次改变的步伐，可以是小数
            "size":"default", //输入框尺寸，可选值为large、small、default或者不填
            "disabled":false, //设置禁用状态
            "readonly":false, //是否设置为只读
            "editable":true, //是否可编辑
            "precision":0, //数值精度
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

```js
ColorPickerRule :
{
        type: "ColorPicker",
        field: "color",
        title: "颜色",
        value: '#ff7271', //input值
        props: {
            "alpha": false, //是否支持透明度选择
            "hue": true, //是否支持色彩选择
            "recommend": false, //是否显示推荐的颜色预设
            "size":"default", //尺寸，可选值为large、small、default或者不设置
            "colors":[], //自定义颜色预设
            "format":"hex", //颜色的格式，可选值为 hsl、hsv、hex、rgb,开启 alpha 时为 rgb，其它为 hex
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
#### 多级联动

```js
cascaderRule:
{
        type:"cascader",
        title:"所在区域",
        field:"address",
        value:['陕西省','西安市','新城区'],
        props:{
            //可选项的数据源，格式参照示例说明
            data:window.province || [],
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

```js
UploadRule :
{
        type: "Upload",
        field: "pic",
        title: "轮播图",
        value: ['http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg','http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'], //input值
        props: {
            "type":"select", //上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
            "uploadType":"image", //上传文件类型，可选值为 image（图片上传），file（文件上传）
            "action": "", //上传的地址，必填
            "headers": {}, //设置上传的请求头部
            "multiple": true, //是否支持多选文件
            "data":{}, //上传时附带的额外参数
            "name":"", //上传的文件字段名
            "withCredentials":false, //支持发送 cookie 凭证信息

            //不支持
            // "showUploadList":false, //是否显示已上传文件列表
            // "defaultFileList":[], // 默认已上传的文件列表

            "accept":"", //接受上传的文件类型
            "format":[], //支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
            "maxSize":undefined, //文件大小限制，单位 kb
            "maxLength":1,
            "beforeUpload":()=>{}, //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            "onProgress":()=>{}, //文件上传时的钩子，返回字段为 event, file, fileList
            "onSuccess":function () {
                return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
            }, //文件上传成功时的钩子，返回字段为 response, file, fileList, 使用$f.uploadPush(field,filePath) 将上传后的路径添加到value中
            "onError":(error, file, fileList)=>{}, //文件上传失败时的钩子，返回字段为 error, file, fileList
            "onPreview":()=>{}, //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
            "onRemove":()=>{}, //文件列表移除文件时的钩子，返回字段为 file, fileList
            "onFormatError":()=>{}, //文件格式验证失败时的钩子，返回字段为 file, fileList
            "onExceededSize":()=>{}, //文件超出指定大小限制时的钩子，返回字段为 file, fileList
        },
    }
```

accept 文件类型： [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

### 全局配置 createOptions

```js
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
    upload:{
        //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
        beforeUpload:()=>{},
        //文件上传时的钩子，返回字段为 event, file, fileList
        onProgress:(event, file, fileList)=>{},
        //文件上传成功时的钩子，返回字段为 response, file, fileList,若需有把文件添加到文件列表中,在函数值返回即可
        onSuccess:(response, file, fileList)=>{
            // return filePath;
        },
        //文件上传失败时的钩子，返回字段为 error, file, fileList
        onError:(error, file, fileList)=>{},
        //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
        onPreview:(file)=>{},
        //文件列表移除文件时的钩子，返回字段为 file, fileList
        onRemove:(file, removeFn)=>{removeFn();},
        //文件格式验证失败时的钩子，返回字段为 file, fileList
        onFormatError:(file, fileList)=>{},
        //文件超出指定大小限制时的钩子，返回字段为 file, fileList
        onExceededSize:(file, fileList)=>{},
        //操作按钮的图标 ,设置为false将不显示
        handleIcon:'ios-eye-outline',
        //点击操作按钮事件
        onHandle:(src)=>{},
        //是否可删除,设置为false是不显示删除按钮
        allowRemove:true
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
        loading:false
    }
}
```

### 时间格式

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



### 联系&打赏

##### 联系邮箱 : xaboy2005@qq.com

-----

##### 打赏扫这里，请留下尊姓大名

![https://raw.githubusercontent.com/xaboy/form-create/master/images/exceptional.jpg](https://raw.githubusercontent.com/xaboy/form-create/master/images/exceptional.jpg)









