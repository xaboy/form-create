//使用 json对象 规则生成表单.!!json 不支持函数和正则
function jsonMock() {


    //以下是组件的生成规则及参数默认值

    return [

        //hidden 组件
        {
            type: "hidden",
            field: "id",
            value: "1"
        },


        //cascader 多级联动组件
        {
            type: "cascader",
            title: "所在区域",
            field: "address",
            value: ['陕西省', '西安市', '新城区'],
            props: {

                "options": window.province_city || [], //属性配置
                "props": undefined, //配置选项
                "separator": "/", //选项分隔符
                "popperClass": undefined, //自定义浮层类名
                "placeholder": "请选择", //输入框占位文本
                "disabled": false, //是否禁用
                "clearable": false, //是否支持清空选项
                "expandTrigger": "click", //次级菜单的展开方式 click / hover
                "showAllLevels": true, //输入框中是否显示选中值的完整路径
                "filterable": undefined, //是否可搜索选项
                "debounce": 300, //搜索关键词输入的去抖延迟，毫秒
                "changeOnSelect": false, //是否允许选择任意一级的选项
                "size": undefined, //medium / small / mini
                "beforeFilter": function (value) {

                }, //筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选
            }
        },


        //input 输入框组件
        {
            type: "input",
            title: "商品名称",
            field: "goods_name",
            value: "iphone",
            props: {
                "type": "text", //输入框类型，text，textarea 和其他 原生 input 的 type 值
                "maxlength": undefined, //原生属性，最大输入长度
                "minlength": undefined, //原生属性，最小输入长度
                "placeholder": "请输入商品名称", //输入框占位文本
                "clearable": false, //是否可清空
                "disabled": false, //禁用
                "size": "default", //输入框尺寸，只在 type!="textarea" 时有效 medium / small / mini
                "prefixIcon": undefined, //输入框头部图标
                "suffixIcon": undefined, //输入框尾部图标
                "rows": 2, //输入框行数，只对 type="textarea" 有效
                "autosize": false, //自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
                "name": undefined, //原生属性
                "readonly": false, //原生属性，是否只读
                "max": undefined, //原生属性，设置最大值
                "min": undefined, //原生属性，设置最小值
                "step": false, //原生属性，设置输入字段的合法数字间隔
                "resize": undefined, //控制是否能被用户缩放	 none, both, horizontal, vertical
                "autofocus": false, //原生属性，自动获取焦点
                "tabindex": undefined, //输入框的tabindex
                "validateEvent": true, //输入时是否触发表单的校验
            },
            validate: [
                {required: true, message: '请输入商品名称', trigger: 'blur'}
            ]
        },

        //input 输入框组件
        {
            type: "input",
            title: "商品简介",
            field: "goods_info",
            value: "",
            props: {
                "type": "textarea", //输入框类型，text，textarea 和其他 原生 input 的 type 值
                "rows": 10, //输入框行数，只对 type="textarea" 有效
                "autosize": {minRows: 4, maxRows: 8}, //自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
                "resize": undefined, //控制是否能被用户缩放	 none, both, horizontal, vertical
            },
        },


        //autoComplete 自动选择组件
        {
            type: "autoComplete",
            title: "自动完成",
            field: "auto",
            value: "xaboy",
            props: {
                "fetchSuggestions": function (queryString, cb) {
                    cb([
                        {value: queryString}, {value: queryString + queryString}
                    ]);
                },
                "placeholder": "", //输入框占位文本
                "disabled": false, //禁用
                "valueKey": "value", //输入建议对象中用于显示的键名
                "debounce": 300, //获取输入建议的去抖延时
                "placement": "bottom-start", //菜单弹出位置 top / top-start / top-end / bottom / bottom-start / bottom-end
                "popperClass": undefined, //Autocomplete 下拉列表的类名
                "triggerOnFocus": true, //是否在输入框 focus 时显示建议列表
                "selectWhenUnmatched": false, //在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件
                "prefixIcon": undefined, //输入框头部图标
                "suffixIcon": undefined, //输入框尾部图标
                "hideLoading": false, //是否隐藏远程加载时的加载图标
                "popperAppendToBody": true, //是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false

            }
        },

        //
        //     //radio 单选框组件
        {
            type: "radio",
            title: "是否包邮",
            field: "is_postage",
            value: "0",
            options: [
                {value: "0", label: "不包邮", disabled: false},
                {value: "1", label: "包邮", disabled: false},
                {value: "2", label: "未知", disabled: true},
            ],
            props: {
                "disabled": false,
                "size": "default", //单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效
                "textColor": '#ffffff', //按钮形式的 Radio 激活时的文本颜色
                "fill": "#ff7271", //按钮形式的 Radio 激活时的填充色和边框色
            }
        },


        //checkbox 复选框付选择
        {
            type: "checkbox",
            title: "标签",
            field: "label",
            value: [
                "1", "2", "3"
            ],
            options: [
                {value: "1", label: "好用", disabled: true},
                {value: "2", label: "方便", disabled: false},
                {value: "3", label: "实用", disabled: false},
                {value: "4", label: "有效", disabled: false},
            ],
            props: {
                "size": "default", //多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效
                "disabled": false, //是否禁用
                "min": undefined, //可被勾选的 checkbox 的最小数量
                "max": undefined, //可被勾选的 checkbox 的最大数量
                "textColor": undefined, //按钮形式的 Radio 激活时的文本颜色
                "fill": undefined, //按钮形式的 Radio 激活时的填充色和边框色
                "type": "button", //选中显示形式,可选项 button
            }
        },


        //switch 开关组件
        {
            type: "switch",
            title: "是否上架",
            field: "is_show",
            value: "1",
            props: {
                "size": "default", //开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。
                "disabled": false,//是否禁用
                "width": 40, //switch 的宽度（像素）
                "activeIconClass": "el-icon-success", //switch 打开时所显示图标的类名，设置此项会忽略 active-text
                "inactiveIconClass": "el-icon-error", //switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
                "activeText": undefined, //switch 打开时的文字描述
                "inactiveText": undefined, //switch 关闭时的文字描述
                "activeValue": "1", //switch 打开时的值
                "inactiveValue": "0", //switch 关闭时的值
                "activeColor": undefined, //switch 打开时的背景色
                "inactiveColor": undefined, //switch 关闭时的背景色
                "name": undefined, //switch 对应的 name 属性
            }
        },


        //select 下拉选择组件
        {
            type: "select",
            field: "cate_id",
            title: "产品分类",
            value: ["104", "105"],
            props: {
                "multiple": true, //是否支持多选
                "disabled": false, //是否禁用
                "size": undefined, //输入框尺寸 medium/small/mini
                "clearable": false, //是否可以清空选项
                "collapseTags": false, //多选时是否将选中值按文字的形式展示
                "multipleLimit": 0, //多选时用户最多可以选择的项目数，为 0 则不限制
                "name": undefined, //select input 的 name 属性
                "autocomplete": "off", //select input 的 autocomplete 属性
                "placeholder": "请选择", //占位符
                "filterable": false, //	是否支持搜索
                "allowCreate": false, //是否允许用户创建新条目，需配合 filterable 使用
                "filterMethod": function () {
                }, //自定义搜索方法
                "remote": false, //是否使用远程搜索
                "remoteMethod": function () {
                }, //远程搜索的方法
                "loading": false, //当前是否正在远程搜索
                "loadingText": "加载中", //远程搜索中的文字提示

                "noMatchText": "无匹配数据", //搜索条件无匹配时显示的文字
                "noDataText": "无数据", //选项为空时显示的文字
                "popperClass": undefined, //Select 下拉框的类名
                "reserveKeyword": false, //多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
                "defaultFirstOption": false, //在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
                "popperAppendToBody": true, //是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false
                "automaticDropdown": false, //对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
            },
            options: [
                {"value": "104", "label": "生态蔬菜", "disabled": false},
                {"value": "105", "label": "新鲜水果", "disabled": false},
            ]
        },


        //datePicker 日期选择组件
        {
            type: "datePicker",
            field: "section_day",
            title: "活动日期",
            value: ['2018-02-20', new Date()],
            props: {
                "type": "dates", //显示类型 year/month/date/dates/ week/datetime/datetimerange/daterange
                "readonly": false, //完全只读
                "disabled": false, //禁用
                "editable": false, //文本框可输入
                "clearable": true, //是否显示清除按钮
                "size": undefined, //输入框尺寸 large, small, mini
                "placeholder": "请选择活动日期", //非范围选择时的占位内容
                "startPlaceholder": undefined, //范围选择时开始日期的占位内容
                "endPlaceholder": undefined, //范围选择时结束日期的占位内容
                "format": undefined, //	显示在输入框中的格式
                "align": undefined, // 对齐方式 left, center, right
                "popperClass": undefined, // DatePicker 下拉框的类名
                "pickerOptions": {}, // 当前时间日期选择器特有的选项参考下表
                "rangeSeparator": '-', // 选择范围时的分隔符
                "defaultValue": undefined, // 可选，选择器打开时默认显示的时间
                "defaultTime": undefined, // 范围选择时选中日期所使用的当日内具体时刻
                "valueFormat": undefined, // 可选，绑定值的格式。不指定则绑定值为 Date 对象
                "name": undefined, // 原生属性
                "unlinkPanels": false, // 在范围选择器里取消两个日期面板之间的联动
                "prefixIcon": undefined, // 自定义头部图标的类名
                "clearIcon": undefined, // 自定义清空图标的类名
                "validateEvent": true, // 输入时是否触发表单的校验
            }
        },


        //timePicker 时间选择组件
        {
            type: "timePicker",
            field: "section_time",
            title: "活动时间",
            value: ['01:01:01', new Date()],
            props: {
                "readonly": false, //完全只读
                "disabled": false, //禁用
                "editable": false, //文本框可输入
                "clearable": true, //是否显示清除按钮
                "size": undefined, //输入框尺寸 medium / small / mini
                "placeholder": "请选择活动时间", //非范围选择时的占位内容
                "startPlaceholder": undefined, //范围选择时开始日期的占位内容
                "endPlaceholder": undefined, //范围选择时开始日期的占位内容
                "isRange": true, //是否为时间范围选择
                "arrowControl": false, //是否使用箭头进行时间选择
                "align": undefined, //对齐方式 left / center / right
                "popperClass": undefined, //TimePicker 下拉框的类名
                "pickerOptions": {}, //当前时间日期选择器特有的选项参考下表
                "rangeSeparator": "-", //选择范围时的分隔符
                "valueFormat": undefined, //可选，仅TimePicker时可用，绑定值的格式。不指定则绑定值为 Date 对象
                "defaultValue": undefined, //可选，选择器打开时默认显示的时间
                "name": undefined, //原生属性
                "prefixIcon": undefined, //自定义头部图标的类名
                "clearIcon": undefined, //自定义清空图标的类名
            }
        },


        //inputNumber 数组输入框组件
        {
            type: "inputNumber",
            field: "sort",
            title: "排序",
            value: 0,
            props: {
                "max": undefined, //最大值
                "min": undefined, //最小值
                "step": 0.1, //计数器步长,
                "precision": 2, //数值精度
                "size": undefined, //计数器尺寸 large, small
                "disabled": false, //是否禁用计数器
                "controls": true, //是否使用控制按钮
                "controlsPosition": undefined, //控制按钮位置 left,right
                "name": undefined, //原生属性
                "placeholder": undefined, //输入框默认 placeholder
            }
        },


        //colorPicker 颜色选择组件
        {
            type: "colorPicker",
            field: "color",
            title: "颜色",
            value: '#ff7271',
            props: {
                "disabled": false, //是否禁用
                "size": undefined, //尺寸 medium / small / mini
                "showAlpha": false, //是否支持透明度选择
                "colorFormat": undefined, //value 的颜色的格式
                "popperClass": undefined, //ColorPicker 下拉框的类名
                "predefine": undefined, //预定义颜色
            },
        },


        //rate 评分组件
        {
            type: "rate",
            field: "rate",
            title: "推荐级别",
            value: 3.5,
            props: {
                "max": 10, //最大分值
                "disabled": false, //是否为只读
                "allowHalf": true, //是否允许半选
                "lowThreshold": 2, //低分和中等分数的界限值，值本身被划分在低分中
                "highThreshold": 4, //高分和中等分数的界限值，值本身被划分在高分中
                "colors": undefined, //icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
                "voidColor": undefined, //未选中 icon 的颜色
                "disabledVoidColor": undefined, //只读时未选中 icon 的颜色
                "iconClasses": undefined, //icon 的类名数组，共有 3 个元素，为 3 个分段所对应的类名
                "voidIconClass": undefined, //未选中 icon 的类名
                "disabledVoidIconClass": undefined, //只读时未选中 icon 的类名
                "showText": true, //是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容
                "showScore": false, //是否显示当前分数，show-score 和 show-text 不能同时为真
                "textColor": undefined, //辅助文字的颜色
                "texts": undefined, //辅助文字数组
                "scoreTemplate": undefined, //分数显示模板
            }
        },


        //slider 滑块组件
        {
            type: "slider",
            field: "slider",
            title: "滑块",
            value: [0, 50],
            props: {
                "min": 0, //最小值
                "max": 100, //最大值
                "disabled": false, //是否禁用滑块
                "step": 1, //步长，取值建议能被（max - min）整除
                "showInput": false, //是否显示输入框，仅在非范围选择时有效
                "showInputControls": true, //在显示输入框的情况下，是否显示输入框的控制按钮
                "inputSize": undefined, //输入框的尺寸 large / medium / small / mini
                "showStops": false, //是否显示间断点
                "showTooltip": true, //是否显示 tooltip
                "formatTooltip": undefined, //格式化 tooltip message
                "range": true, //是否为范围选择
                "vertical": false, //是否竖向模式
                "height": undefined, //Slider 高度，竖向模式时必填
                "label": undefined, //屏幕阅读器标签
                "debounce": 300, //输入时的去抖延迟，毫秒，仅在show-input等于true时有效
                "tooltipClass": undefined, //tooltip 的自定义类名
            }
        },


        //upload 上传组件
        {
            type: "upload",
            field: "pic",
            title: "轮播图",
            value: ['http://file.lotkk.com/form-create.jpeg'], //input值
            props: {
                "uploadType": "image",
                "action": "http://0.0.0.0:8000/index/index/upload.html", //必选参数，上传的地址
                "headers": {}, //设置上传的请求头部
                "multiple": true, //是否支持多选文件
                "data": {}, //上传时附带的额外参数
                "name": "", //上传的文件字段名
                "withCredentials": false, //支持发送 cookie 凭证信息
                "showFileList": false, //是否显示已上传文件列表
                "drag": false, //是否启用拖拽上传
                "accept": "", //接受上传的文件类型
                "onPreview": function (file) {
                }, //点击文件列表中已上传的文件时的钩子
                "onRemove": function (file, fileList) {
                }, //文件列表移除文件时的钩子
                "onSuccess": function () {
                    return 'http://file.lotkk.com/form-create.jpeg';
                }, //文件上传成功时的钩子，返回字段为 response, file, fileList
                "onError": function (err, file, fileList) {
                },// 文件上传失败时的钩子
                "onProgress": function (event, file, fileList) {
                },// 文件上传失败时的钩子
                "onChange": function (file, fileList) {
                },// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                "beforeUpload": function (file) {
                },// 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                "beforeRemove": function (file, fileList) {
                },// 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                "listType": "text", //文件列表的类型 text/picture/picture-card
                "autoUpload": true, //是否在选取文件后立即进行上传
                "fileList": [], //上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                "httpRequest": undefined, //覆盖默认的上传行为，可以自定义上传的实现
                "disabled": false, //是否禁用
                "limit": 2, //最大允许上传个数
                "onExceed": function (files, fileList) {
                }, //文件超出个数限制时的钩子
                //操作按钮的图标 ,设置为false将不显示
                // handleIcon: "el-icon-view",
                //点击操作按钮事件,会覆盖默认的预览操作
                // onHandle:function (src){},
                //是否可删除,设置为false是不显示删除按钮
                allowRemove: true,
            }
        },


        //frame 框架组件
        {
            type: "frame",
            title: "素材",
            field: "fodder",
            value: ["http://file.lotkk.com/form-create.jpeg"],
            props: {
                type: "image", //frame类型,有input,file,image
                src: "../iframe.html", //iframe地址
                maxLength: 2, //value的最大数量
                icon: undefined, //打开弹出框的按钮图标
                height: "220px", //弹出框高度
                width: "350px", //弹出框宽度
                spin: false, //是否显示加载动画
                title: "请选择", //弹出框标题
                handleIcon: true, //操作按钮的图标 ,设置为false将不显示,设置为true为默认的预览图标,类型为file时默认为false,image类型默认为true
                allowRemove: true, //是否可删除,设置为false是不显示删除按钮
                onHandle: undefined, //点击操作按钮事件,默认为图片预览
                modal:{
                    fullscreen:true,
                },
                onRemove: function () {
                    return false;
                } //点击删除按钮事件,返回false将不删除
            },
        },

        {
            type: 'tree',
            title: '权限',
            field: "tree",
            value: [12, 13, 14],
            props: {
                data: [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: false,
                        id: 1,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                id: 2,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disabled: true,
                                        id: 11
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        selected: true,
                                        id: 12
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                id: 3,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true,
                                        id: 13,
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        id: 14,
                                    }
                                ]
                            }
                        ]
                    }
                ],//展示数据
                "props": {
                    "label": "title"
                }, //配置选项
                "type": "indeterminate",
                "emptyText": undefined, //内容为空的时候展示的文本
                "nodeKey": 'id', //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
                "renderAfterExpand": true, //是否在第一次展开某个树节点后才渲染其子节点
                "load": undefined, //加载子树数据的方法，仅当 lazy 属性为true 时生效
                "renderContent": undefined, //树节点的内容区的渲染 Function
                "highlightCurrent": false, //是否高亮当前选中节点，默认值是 false。
                "defaultExpandAll": true, //是否默认展开所有节点
                "expandOnClickNode": false, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
                "checkOnClickNode": false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
                "autoExpandParent": true, //展开子节点的时候是否自动展开父节点
                "defaultExpandedKeys": undefined, //默认展开的节点的 key 的数组
                "showCheckbox": true, //节点是否可被选择 key 的数组
                "checkStrictly": false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                "defaultCheckedKeys": undefined, //默认勾选的节点的 key 的数组
                "currentNodeKey": undefined, //当前选中的节点
                "filterNodeMethod": undefined, //对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
                "accordion": false, //是否每次只打开一个同级树节点展开
                "indent": undefined, //相邻级节点间的水平缩进，单位为像素
                "iconClass": undefined, //自定义树节点的图标
                "lazy": undefined, //是否懒加载子节点，需与 load 方法结合使用
                "draggable": false, //是否开启拖拽节点功能
                "allowDrag": undefined, //判断节点能否被拖拽
                "allowDrop": undefined, //拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
            }
        }
    ]

}


/**
 * JS表单生成器
 *
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */
