var maker = formCreate.maker;


//使用maker 生成器生成
function mock() {
    var mock;
    return mock = [

        //hidden 组件
        maker.hidden('id', '14'),


        //cascader 多级联动组件
        maker.cascader('所在区域', 'address', ['陕西省', '西安市', '新城区']).props({
            data: window.province_city || [],
            hidden: false
        }),


        //input 输入框组件
        maker.input('商品名称', 'goods_name', 'iphone').props({
            placeholder: '请输入商品名称',
            disabled: false
        }).validate([
            {required: true, message: '请输入商品名称', trigger: 'blur'}
        ]).children([maker.create('template').children(['append']).slot('append')]).event({
            //    change: console.log
        }).emit(['change']).className('goods-name'),


        //autoComplete 自动选择组件
        maker.auto('自动完成', 'auto', 'xaboy').props({
            data: [
                'xaboy',
                'xian',
                'github'
            ],
            filterMethod: function (value, option) {
                value = value || '';
                option = option || '';

                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
            }
        }).emitPrefix('xaboy').emit(['change']),


        //textarea 组件
        maker.textarea('商品简介', 'goods_info', '').props({
            autosize: {minRows: 5, maxRows: 9},
            placeholder: '请输入商品简介'
        }),


        //radio 单选框组件
        maker.radio('是否包邮', 'is_postage', 0).options([
            {value: 0, label: "不包邮", disabled: false},
            {value: 1, label: "包邮", disabled: false},
            {value: 2, label: "未知", disabled: true},
        ]).props({required: true}).col({span: 8}),


        //checkbox 复选框付选择
        maker.checkbox('标签', 'label', [1]).options([
            {value: 1, label: "好用", disabled: true},
            {value: 2, label: "方便", disabled: false},
            {value: 3, label: "实用", disabled: false},
            {value: 4, label: "有效", disabled: false},
        ]).col({span: 8}),


        //switch 开关组件
        maker.switch('是否上架', 'is_show', '1').props({
            "trueValue": "1",
            "falseValue": "0",
            open: "上架",
            close: "下架",
            required: true,
        }).col({span: 8, labelWidth: 100}),


        //自定义组件
        maker.createTmp('<i-button @click="onClick" long :disabled="disabled">{{button}}字符串测试{{test}}-{{num}}</i-button>', new Vue({
            data: {
                test: 'createTmp渲染',
                button: '<i-button />',
                num: 0,
                disabled: false
            },
            methods: {
                onClick: function () {
                    this.num++;
                },
                //表单禁用事件
                onDisabled: function (disabled) {
                    this.disabled = disabled;
                },
                //表单重置事件
                onResetField: function () {
                    this.num = 0;
                },
                //表单提交事件
                onInput: function (cb, $f) {
                    cb(this.num);
                },
                //通过setValue,changeField,changeValue方法设置表单值时事件
                onSetValue: function (val, $f) {
                    this.num = val;
                }
            },
            created: function () {
                this.$on('fc:disabled', this.onDisabled);
                this.$on('fc:reset-field', this.onResetField);
                this.$on('fc:input', this.onInput);
                this.$on('fc:set-value', this.onSetValue);
            }
        }), 'tmp', '自定义 title'),


        //自定义组件
        maker.create('i-button', 'btn').props({
            type: "primary",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: "ios-upload",
            loading: false,
            show: true
        })
            .on({
                "fc:disabled": function (disabled, $f) {
                    $f.component().btn.props.disabled = disabled;
                },
                "fc:input": function (cb, $f) {
                    cb($f.component().btn.props.disabled);
                },
                "fc:set-value": function (val, $f) {
                    $f.component().btn.props.disabled = val;
                }
            }).col({span: 12}).children([
            maker.create('span').domProps({
                innerHTML: '测试自定义按钮'
            })
        ]).emit(['click']),


        //自定义组件
        maker.create('Tooltip', 'tip', '自定义 title').props({
            content: "这里是提示文字",
        }).col({span: 11, push: 1}).children([
            maker.create('span').domProps({
                innerHTML: '当鼠标经过这段文字时，会显示一个气泡框'
            })
        ]),


        //select 下拉选择组件
        maker.select("产品分类", "cate_id", ["104", "105"]).options([
            {"value": "104", "label": "生态蔬菜", "disabled": false, "slot": "<div style:'color:#ff7271;'>自定义显示内容</div>"},
            {
                "value": "105", "label": "新鲜水果", "disabled": false, "slot": function ($h) {
                    return $h("div", {
                        style: "color:#ff7271;"
                    }, [$h('icon', {
                        props: {
                            //iview2 与 iview3 图标名称不同
                            type: 'social-apple'
                        }
                    }), "新鲜水果"]);
                }
            },
        ]).props({
            multiple: false
        }).event({change: console.log}),


        {
            type: 'row',
            children: [
                {
                    type: 'i-col',
                    props: {
                        span: 12
                    },
                    children: [

                        //datePicker 日期选择组件
                        maker.date('活动日期', 'section_day', ['2018-02-20', new Date()]).props({
                            "type": "datetimerange",
                            "startDate": new Date(),
                            "showWeekNumbers": true,
                        }),

                        //timePicker 时间选择组件
                        maker.time('活动时间', 'section_time', ['01:01:01', new Date()]).props({
                            "type": "timerange",
                            "placeholder": "请选择活动时间"
                        }),

                    ]
                },
                {
                    type: 'i-col',
                    props: {
                        span: 12
                    },
                    children: [
                        //inputNumber 数组输入框组件
                        maker.number('排序', 'sort', 0).props({
                            precision: 2
                        }).col({span: 12}).validate(
                            [{require: true, type: 'number', min: 10}]
                        ),

                        //colorPicker 颜色选择组件
                        maker.color('颜色', 'color', '#ff7271').props({
                            "format": "hex"
                        }).props({
                            "hue": true
                        }).col({span: 12}),

                    ]
                }
            ]
        },


        // datePicker 日期选择组件
        // maker.date('活动日期', 'section_day2', ['2018-02-20', '2019-01-01']).props({
        //     "type": "datetimerange",
        //     "startDate": new Date(),
        //     "showWeekNumbers": true,
        //     "open": false, //自定义内容时一定要预定义 open
        // }).col({span: 12}).children(['select data']).event({
        //     ok: function () {
        //         mock[14].props.open = false;
        //     }
        // }),

        //timePicker 时间选择组件
        // maker.time('活动时间', 'section_time2', ['01:01:01', '12:12:12']).props({
        //     "type": "timerange",
        //     "placeholder": "请选择活动时间",
        //     "open": false, //自定义内容时一定要预定义 open
        // }).col({span: 12}).children(['select Time']).event({
        //     ok: function () {
        //         mock[15].props.open = false;
        //     }
        // }),


        //rate 评分组件
        maker.rate('推荐级别', 'rate', 2)
            .props({
                "count": 10,
                "allowHalf": false,
                "disabled": false
            })
            .validate({required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'})
            .col({span: 12}),


        //slider 滑块组件
        maker.slider('滑块', 'slider', [30, 80]).props({
            "min": 0,
            "max": 100,
            "range": true,
            "showTip": "hover"
        }).col({span: 12}),


        //upload 上传组件
        maker.upload('轮播图', 'pic', ['http://file.lotkk.com/form-create.jpeg'])
            .props({
                "action": "http://127.0.0.1:8000/index/index/upload",
                "maxLength": 4,
                "multiple": true,
                "showUploadList": true,
                "type": "select",
                "uploadType": "file",
                "name": "file",
                "onSuccess": function (res) {
                    console.log('upload success');
                    return 'http://file.lotkk.com/form-create.jpeg';
                },
                "onRemove": function (file, fileList) {
                    console.log(file, fileList);
                },
                "allowRemove": true
            }).validate({required: true, type: 'array', min: 3, message: '请上传3张图片', trigger: 'change'}),


        maker.checkbox('', 'checked', '0').options([
            {value: "1", label: "同意****用户协议", disabled: false},
        ]),


        //frame 框架组件
        maker.frame('素材', 'fodder', ["http://file.lotkk.com/form-create.jpeg"]).props({
            src: "../iframe.html",
            maxLength: 0,
            type: "image",
            modalTitle: '预览~~~',
            okBtnText: 'ok',
            closeBtnText: 'close',
            title: 'select'
        }).validate([
            {required: true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change'}
        ]).event({
            remove: function () {
                alert('不能删除');
                return false;
            },
            open: console.log,
            change() {
                console.log('change');
            }
        }),


        //tree 树形组件
        maker.tree('权限', 'tree', []).props({
            type: 'checked',
            multiple: true,
            showCheckbox: true,
            emptyText: '暂无数据',
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
            ],
        }).validate([
            {required: true, type: 'array', min: 2, message: '至少选择2个', trigger: 'change'}
        ])
    ];
}


//upload 上传组件
$r = maker.upload('产品主图', 'logo', 'http://file.lotkk.com/form-create.jpeg').props({
    "action": "http://127.0.0.1:8000/index/index/upload",
    "maxLength": 1,
    "multiple": false,
    "showUploadList": false,
    "max": 0,
    "type": "select",
    "uploadType": "image",
    "name": "file",
    "modalTitle": '预览~~~',
    "onSuccess": function () {
        return 'http://file.lotkk.com/form-create.jpeg';
    }
}).validate({required: true, type: 'array', min: 1, message: '请上传1张图片', trigger: 'change'});


/**
 * JS表单生成器
 *
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */
