//使用 json对象 规则生成表单.
function jsonMock() {


    //以下是组件的生成规则及参数默认值

    return [

        //hidden 组件
        {
            type: 'hidden',
            field: 'id',
            value: '1'
        },


        //cascader 多级联动组件
        {
            type: 'cascader',
            title: '所在区域',
            field: 'address',
            value: ['陕西省', '西安市', '新城区'],
            props: {
                //可选项的数据源，格式参照示例说明
                data: window.province_city || [],
                //选择后展示的函数，用于自定义显示格式
                renderFormat: function (label) {
                    return label.join(' / ')
                },
                //是否禁用选择器
                disabled: false,
                //是否支持清除
                clearable: true,
                //输入框占位符
                placeholder: '请选择',
                //次级菜单展开方式，可选值为 click 或 hover
                trigger: 'click',
                //当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的示例
                changeOnSelect: false,
                //输入框大小，可选值为large和small或者不填
                size: undefined,
                //动态获取数据，数据源需标识 loading
                loadData: function () {

                },
                //是否支持搜索
                filterable: false,
                //当搜索列表为空时显示的内容
                notFoundText: '无匹配数据',
                //是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
                transfer: false,
            },
            validate: [
                {required: true, message: '请选择地址', type: 'array', trigger: 'change'}
            ]
        },


        //input 输入框组件
        {
            type: 'input',
            title: '商品名称',//label名称
            field: 'goods_name',//字段名称
            value: '',//input值,
            props: {
                'type': 'text', //输入框类型，可选值为 text、password、textarea、url、email、date
                'clearable': false, //是否显示清空按钮
                'disabled': false, //设置输入框为禁用状态
                'readonly': false, //设置输入框为只读
                'rows': 4, //文本域默认行数，仅在 textarea 类型下有效
                'autosize': false, //自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }
                'number': false, //将用户的输入转换为 Number 类型
                'autofocus': false, //自动获取焦点
                'autocomplete': 'off', //原生的自动完成功能，可选值为 off 和 on
                'placeholder': '请输入商品名称', //占位文本
                'size': 'default', //输入框尺寸，可选值为large、small、default或者不设置,
                'spellcheck': false, //原生的 spellcheck 属性
                'required': false,
            },
            validate: [
                {required: true, trigger: 'change', type: 'string'}
            ]
        },


        //autoComplete 自动选择组件
        {
            type: 'autoComplete',
            title: '自动完成',
            field: 'auto',
            value: 'xaboy',
            props: {
                data: [
                    'xaboy',
                    'xian',
                    'github'
                ],
                filterMethod: function (value, option) {
                    value = value || '';
                    option = option || '';
                    return String(option).toUpperCase().indexOf(String(value).toUpperCase()) !== -1
                },
                disabled: false,
            }
        },


        //radio 单选框组件
        {
            type: 'radio',
            title: '是否包邮',//label名称
            field: 'is_postage',//字段名称
            value: '0',//input值,
            options: [
                {value: '0', label: '不包邮', disabled: false},
                {value: '1', label: '包邮', disabled: false},
                {value: '2', label: '未知', disabled: true},
            ],
            props: {
                'type': undefined, //可选值为 button 或不填，为 button 时使用按钮样式
                'size': 'default', //单选框的尺寸，可选值为 large、small、default 或者不设置
                'vertical': false, //是否垂直排列，按钮样式下无效
            },
            validate: [
                {required: true, message: '请选择是否包邮', trigger: 'change'}
            ]
        },


        //checkbox 复选框付选择
        {
            type: 'checkbox',
            title: '标签',//label名称
            field: 'label',//字段名称
            value: [
                '1', '2', '3'
            ],//input值,
            options: [
                {value: '1', label: '好用', disabled: true},
                {value: '2', label: '方便', disabled: false},
                {value: '3', label: '实用', disabled: false},
                {value: '4', label: '有效', disabled: false},
            ],
            props: {
                'size': 'default', //多选框组的尺寸，可选值为 large、small、default 或者不设置
            },
            validate: [
                {required: true, type: 'array', message: '请选择标签', trigger: 'change'}
            ]
        },


        //switch 开关组件
        {
            type: 'switch',
            title: '是否上架',//label名称
            field: 'is_show',//字段名称
            value: '1',//input值,
            props: {
                'size': 'default', //开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。
                'disabled': false,//禁用开关
                'trueValue': '1', //选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                'falseValue': '0', //没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                'slot': {
                    open: '上架', //自定义显示打开时的内容
                    close: '下架', //自定义显示关闭时的内容
                },
            },
        },


        //select 下拉选择组件
        {
            type: 'select',
            field: 'cate_id',
            title: '产品分类',
            value: ['104', '105'],
            props: {
                'multiple': false, //是否支持多选
                'clearable': false, //是否可以清空选项，只在单选时有效
                // 'filterable': true, //	是否支持搜索
                //
                // 'remote': false, //是否使用远程搜索
                // 'remote-method': function () {
                // }, //远程搜索的方法
                // 'loading': false, //当前是否正在远程搜索
                // 'loading-text': '加载中', //远程搜索中的文字提示
                //
                // 'size': 'default', //选择框大小，可选值为large、small、default或者不填
                'placeholder': '请选择', //选择框默认文字
                // 'not-found-text': '无匹配数据', //当下拉列表为空时显示的内容
                'placement': 'bottom', //弹窗的展开方向，可选值为 bottom 和 top
                'disabled': false, //是否禁用
            },
            options: [
                {'value': '104', 'label': '生态蔬菜', 'disabled': false},
                {'value': '105', 'label': '新鲜水果', 'disabled': false},
            ]
        },


        //datePicker 日期选择组件
        {
            type: 'datePicker',
            field: 'section_day',
            title: '活动日期',
            value: ['2018-02-20 11:11:11', '2018-02-20 22:22:22'], //input值, type为daterange,datetimerange value为数组 [start_value,end_value]
            props: {
                'type': 'datetimerange', //显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
                'format': 'yyyy-MM-dd HH:mm:ss', //展示的日期格式
                'placement': 'bottom-start', //	日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
                'placeholder': '请选择活动日期', //占位文本
                'confirm': false, //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
                'size': 'default', //尺寸，可选值为large、small、default或者不设置
                'disabled': false, //是否禁用选择器
                'clearable': true, //是否显示清除按钮
                'readonly': false, //完全只读，开启后不会弹出选择器
                'editable': false, //文本框是否可以输入
            }
        },


        //timePicker 时间选择组件
        {
            type: 'timePicker',
            field: 'section_time',
            title: '活动时间',
            value: ['11:11:11', '22:22:22'], //input值, type为timerange value为数组 [start_value,end_value]
            props: {
                'type': 'timerange', //显示类型，可选值为 time、timerange
                'format': 'HH:mm:ss', //展示的时间格式
                'steps': [], //下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。
                'placement': 'bottom-start', //	时间选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
                'placeholder': '请选择活动时间', //占位文本
                'confirm': false, //是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
                'size': 'default', //尺寸，可选值为large、small、default或者不设置
                'disabled': false, //是否禁用选择器
                'clearable': true, //是否显示清除按钮
                'readonly': false, //完全只读，开启后不会弹出选择器
                'editable': false, //文本框是否可以输入
            }
        },


        //inputNumber 数组输入框组件
        {
            type: 'inputNumber',
            field: 'sort',
            title: '排序',
            value: 0.00, //input值
            props: {
                'max': undefined, //最大值
                'min': undefined, //最小值
                'step': 1, //每次改变的步伐，可以是小数
                'size': 'default', //输入框尺寸，可选值为large、small、default或者不填
                'disabled': false, //设置禁用状态
                'readonly': false, //是否设置为只读
                'editable': true, //是否可编辑
                'precision': 2, //数值精度
            }
        },


        //colorPicker 颜色选择组件
        {
            type: 'colorPicker',
            field: 'color',
            title: '颜色',
            value: '#ff7271', //input值
            props: {
                'alpha': false, //是否支持透明度选择
                'hue': true, //是否支持色彩选择
                'recommend': false, //是否显示推荐的颜色预设
                'size': 'default', //尺寸，可选值为large、small、default或者不设置
                'colors': [], //自定义颜色预设
                'format': 'hex', //颜色的格式，可选值为 hsl、hsv、hex、rgb,开启 alpha 时为 rgb，其它为 hex
            },
        },


        //rate 评分组件
        {
            type: 'rate',
            field: 'rate',
            title: '推荐级别',
            value: 3.5,
            props: {
                'count': 10, //star 总数
                'allowHalf': true, //是否允许半选
                'disabled': false, //是否只读，无法进行交互
                'showText': true, //是否显示提示文字
                'clearable': true, //是否可以取消选择
            },
            validate: [
                {required: true, type: 'number', min: 3, message: '不能小于三颗星', trigger: 'change'}
            ]
        },


        //slider 滑块组件
        {
            type: 'slider',
            field: 'slider',
            title: '滑块',
            value: [0, 50], //滑块选定的值。普通模式下，数据格式为数字，在双滑块模式下，数据格式为长度是2的数组，且每项都为数字
            props: {
                'min': 0, //最小值
                'max': 100, //最大值
                'step': 1, //步长，取值建议能被（max - min）整除
                'disabled': false, //是否禁用滑块
                'range': true, //是否开启双滑块模式
                'showInput': false, //是否显示数字输入框，仅在单滑块模式下有效
                'showStops': true, //是否显示间断点，建议在 step 不密集时使用
                'showTip': 'hover', //提示的显示控制，可选值为 hover（悬停，默认）、always（总是可见）、never（不可见）
                'tipFormat': undefined, //Slider 会把当前值传给 tip-format，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip
                'inputSize': 'small', //数字输入框的尺寸，可选值为large、small、default或者不填，仅在开启 show-input 时有效
            }
        },


        //upload 上传组件
        {
            type: 'upload',
            field: 'pic',
            title: '轮播图',
            value: ['http://file.lotkk.com/form-create.jpeg'], //input值
            props: {
                'type': 'select', //上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
                'uploadType': 'image', //上传文件类型，可选值为 image（图片上传），file（文件上传）
                'action': 'http://127.0.0.1:8000/index/index/upload', //上传的地址，必填
                'headers': {}, //设置上传的请求头部
                'multiple': true, //是否支持多选文件
                'data': {}, //上传时附带的额外参数
                'name': '', //上传的文件字段名
                'showUploadList': false,
                'withCredentials': false, //支持发送 cookie 凭证信息
                'accept': '', //接受上传的文件类型
                'format': [], //支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
                'maxSize': undefined, //文件大小限制，单位 kb
                'maxLength': 4, //上传文件最大数
                'beforeUpload': function () {
                }, //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
                'onProgress': function () {
                }, //文件上传时的钩子，返回字段为 event, file, fileList
                'onSuccess': function (event, file, fileList) {
                    console.log(event, file, fileList);
                    file.url = 'http://file.lotkk.com/form-create.jpeg';
                }, //文件上传成功时的钩子，返回字段为 response, file, fileList, 使用$f.uploadPush(field,filePath) 将上传后的路径添加到value中
                'onError': function (error, file, fileList) {
                }, //文件上传失败时的钩子，返回字段为 error, file, fileList
                'onPreview': function () {
                }, //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
                'onRemove': function () {
                }, //文件列表移除文件时的钩子，返回字段为 file, fileList
                'onFormatError': function () {
                }, //文件格式验证失败时的钩子，返回字段为 file, fileList
                'onExceededSize': function () {
                }, //文件超出指定大小限制时的钩子，返回字段为 file, fileList
                //操作按钮的图标 ,设置为false将不显示
                handleIcon: 'ios-eye-outline',
                //点击操作按钮事件,会覆盖默认的预览操作
                // onHandle:function (src){},
                //是否可删除,设置为false是不显示删除按钮
                allowRemove: true,
                // onHandle:function(){
                //     console.log('onHandle');
                // }
            }
        },

        //frame 框架组件
        {
            type: 'frame',
            title: '素材',
            field: 'fodder',
            value: ['http://file.lotkk.com/form-create.jpeg'],
            props: {
                type: 'image', //frame类型,有input,file,image
                src: '../iframe.html', //iframe地址
                maxLength: 2, //value的最大数量
                icon: undefined, //打开弹出框的按钮图标
                height: '220px', //弹出框高度
                width: '350px', //弹出框宽度
                spin: false, //是否显示加载动画
                title: '请选择', //弹出框标题
                handleIcon: true, //操作按钮的图标 ,设置为false将不显示,设置为true为默认的预览图标,类型为file时默认为false,image类型默认为true
                allowRemove: true, //是否可删除,设置为false是不显示删除按钮
                onHandle: undefined, //点击操作按钮事件,默认为图片预览
                modal:{
                    draggable:true
                },
                onBeforeRemove: function () {
                    return false;
                } //点击删除按钮事件,返回false将不删除
            },
        },

        {
            type: 'tree',
            title: '权限',
            field: 'rule',
            value: [],
            props: {
                data: [
                    {
                        title: 'parent 1',
                        expand: true,
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
                ],
                type: 'selected',
                multiple: false,
                showCheckbox: true,
                emptyText: '暂无数据'
            },
            validate: [
                {required: true, type: 'array', trigger: 'change'}
            ]
        }
    ]

}


/**
 * JS表单生成器
 *
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */
