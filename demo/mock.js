var maker = formCreate.maker;

//使用maker 生成器生成
function mock() {
    let mock;
    return mock = [
        maker.hidden('id', '14'),
        maker.cascader('所在区域', 'address', ['陕西省', '西安市', '新城区']).props({
            data: window.province_city || [],
            hidden: false
        }),
        maker.input('商品名称', 'goods_name', 'iphone').props({
            placeholder: '请输入商品名称',
            disabled: false
        }).validate([
            {required: true, message: '请输入商品名称', trigger: 'blur'}
        ]).event({
            change: console.log
        }).emit(['change']),
        maker.auto('自动完成', 'auto', 'xaboy').props({
            data: [
                'xaboy',
                'xian',
                'github'
            ],
            filterMethod: (value, option) => {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
            }
        }),
        maker.input('商品简介', 'goods_info', '').props({
            type: 'textarea',
            autosize: {minRows: 5, maxRows: 9}
        }),
        maker.radio('是否包邮', 'is_postage', 0).options([
            {value: 0, label: "不包邮", disabled: false},
            {value: 1, label: "包邮", disabled: false},
            {value: 2, label: "未知", disabled: true},
        ]).props({required: true}).col({span: 8}),

        maker.checkbox('标签', 'label', [1]).options([
            {value: 1, label: "好用", disabled: true},
            {value: 2, label: "方便", disabled: false},
            {value: 3, label: "实用", disabled: false},
            {value: 4, label: "有效", disabled: false},
        ]).col({span: 8}),
        maker.switch('是否上架', 'is_show', '1').slot({
            open: "上架",
            close: "下架",
        }).props({
            "trueValue": "1",
            "falseValue": "0",
            required: true,
        }).col({span: 8, labelWidth: 100}),
        maker.createTmp('<i-button @click="onClick" long>{{button}}字符串测试{{test}}-{{num}}</i-button>', new Vue({
            data: {
                test: 'createTmp渲染',
                button: '<i-button />',
                num: 0
            },
            methods: {
                onClick: function () {
                    this.num++;
                    this.$emit('goods-name-change', this.num);
                }
            }
        }), 'tmp').col({labelWidth: 1}),
        maker.create('i-button', 'goods_name2').props({
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
                "click": () => {
                    console.log('click');
                },
            }).col({span: 12}).children([
            maker.create('span', 'goods_name2').domProps({
                innerHTML: '测试自定义按钮'
            })
        ]).emit(['click']),
        maker.create('Tooltip').props({
            content: "这里是提示文字",
        }).col({span: 11, push: 1}).children([
            maker.create('span').domProps({
                innerHTML: '当鼠标经过这段文字时，会显示一个气泡框'
            })
        ]),

        maker.select("产品分类", "cate_id", ["104", "105"]).options([
            {"value": "104", "label": "生态蔬菜", "disabled": false},
            {"value": "105", "label": "新鲜水果", "disabled": false},
        ]).props({
            multiple: true
        }),
        maker.date('活动日期', 'section_day', ['2018-02-20', new Date()]).props({
            "type": "datetimerange",
            "startDate": new Date(),
            "showWeekNumbers": true
        }).col({span: 12}),

        maker.time('活动时间', 'section_time', ['01:01:01', new Date()]).props({
            "type": "timerange",
            "placeholder": "请选择活动时间"
        }).col({span: 12}),
        maker.number('排序', 'sort', 0).props({
            precision: 2
        }).col({span: 12}),

        maker.color('颜色', 'color', '#ff7271').props({
            "format": "hex"
        }).props({
            "hue": true
        }).col({span: 12}),

        maker.rate('推荐级别', 'rate', 2)
            .props({
                "count": 10,
                "allowHalf": false,
                "disabled": false
            })
            .validate({required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'})
            .col({span: 12}),

        maker.slider('滑块', 'slider', [30, 80]).props({
            "min": 0,
            "max": 100,
            "range": true,
            "showTip": "hover"
        }).col({span: 12}),

        maker.upload('轮播图', 'pic', ['http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'])
            .props({
                "action": "",
                "maxLength": 4,
                "multiple": true,
                "type": "select",
                "uploadType": "image",
                "name": "file",
                "onSuccess": function () {
                    console.log('upload success');
                    return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
                },
                "onRemove": () => console.log('removed'),
                "allowRemove": true
            }).validate({required: true, type: 'array', min: 3, message: '请上传3张图片', trigger: 'change'}),

        maker.checkbox('', 'checked', '0').options([
            {value: "1", label: "同意****用户协议", disabled: false},
        ]),

        maker.frame('素材', 'fodder', ["http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg"]).props({
            src: "iframe.html",
            maxLength: 0,
            type: "file"
        }).validate([
            {required: true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change'}
        ]).event({
            remove: () => {
                alert('不能删除');
                return false;
            },
            open: console.log,
            change() {
                console.log('change');
            }
        }),

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
        })
    ];
}

$r = maker.upload('产品主图', 'logo', 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg').props({
    "action": "",
    "maxLength": 1,
    "multiple": false,
    "max": 0,
    "type": "select",
    "uploadType": "image",
    "name": "file",
    "onSuccess": function () {
        return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
    }
}).validate({required: true, type: 'array', min: 1, message: '请上传1张图片', trigger: 'change'});

