import {maker} from '../src';
import Vue from 'vue'


//使用maker 生成器生成
export default function rule() {
    var mock;
    return mock = [

        //hidden 组件
        maker.hidden('id', '14'),

        //自定义组件
        maker.create('testSlot', 'testSlot', 'testSlotTitle').children([
            maker.input('', 'asd').slot('asd'),
            maker.input('', 'asd23').slot('asd'),
        ]),

        //cascader 多级联动组件
        maker.cascader({title: '所在区域', style: 'color:red'}, 'address', ['陕西省', '西安市', '新城区']).effect({address: 1}),


        //input 输入框组件
        maker.input('商品名称', 'goods_name', 'iphone').props({
            placeholder: '请输入商品名称',
            clearable: true,
            disabled: false,
        }).validate([
            {required: true, message: '请输入商品名称', trigger: 'blur'}
        ]).event({
            //    change: console.log
        }).emit([{name: 'change', inject: [1, 2, 3]}]).className('goods-name').children([
            maker.create('template').children(['append']).slot('append')
        ]).info({info: '请输入商品名称!!!!!', type: 'tooltip'}),


        //autoComplete 自动选择组件
        maker.auto('自动完成', 'auto', 'xaboy').props({dataSource: ['aa', 'bb']}).on({
            search: function (inject, value) {
                inject.self.props({dataSource: !value ? [] : [value, value + value, value + value + value]});
            }
        }).emitPrefix('xaboy').emit(['change']).inject(true),


        //textarea 组件
        maker.textarea('商品简介', 'goods_info', '').props({
            placeholder: '请输入商品名称'
        }),

        {
            type: 'object',
            title: '对象组件',
            field: 'object',
            value: {date: '2121-12-12', field: 10, field2: '123123123'},
            props: {
                rule: [
                    {
                        type: 'col',
                        wrap: {show: true},
                        children: [
                            maker.date('date', 'date', '').native(false).col({span: 12}),
                            {
                                type: 'inputNumber',
                                field: 'field',
                                title: 'field',
                                props: {
                                    disabled: false
                                },
                                validate: [
                                    {required: true, min: 10, type: 'number'}
                                ],
                                col: {
                                    span: 12
                                }
                            }
                        ]

                    },
                    {
                        type: 'input',
                        field: 'field2',
                        title: 'field2',
                        props: {
                            disabled: false
                        },
                        validate: [
                            {required: true}
                        ]
                    }
                ]
            }
        },

        {
            type: 'group',
            title: '批量添加',
            field: 'group',
            value: [{date: '2121-12-12', field: 10, field2: '123123123'}],
            props: {
                max: 5,
                min: 3,
                rules: [
                    {
                        type: 'col',
                        children: [
                            maker.date('', 'date', '').native(false).col({span: 12}),
                            {
                                type: 'inputNumber',
                                field: 'field',
                                props: {
                                    disabled: false
                                },
                                validate: [
                                    {required: true, min: 10, type: 'number'}
                                ],
                                col: {
                                    span: 12
                                }
                            }
                        ]

                    },
                    {
                        type: 'input',
                        field: 'field2',
                        props: {
                            disabled: false
                        },
                        validate: [
                            {required: true}
                        ]
                    }
                ]
            },
            validate: [
                {required: true, min: 3, type: 'array', message: '最少增加3项'},
            ]
        },


        //radio 单选框组件
        maker.radio('是否包邮', 'is_postage', 0).options([
            {value: 0, label: '不包邮', disabled: false},
            {value: 1, label: '包邮', disabled: false},
            {value: 2, label: '未知', disabled: true},
        ]).col({span: 8}).control([
            {
                value: 1,
                rule: [
                    maker.number('满额包邮', 'postage_money', 0)
                ]
            }
        ]).wrap({labelCol: {span: 12}, wrapperCol: {span: 12}}),


        //checkbox 复选框付选择
        maker.checkbox('标签', 'label', [1]).options([
            {value: 1, label: '好用', disabled: true},
            {value: 2, label: '方便', disabled: false},
            {value: 3, label: '实用', disabled: false},
            {value: 4, label: '有效', disabled: false},
        ]).col({span: 8}).wrap({labelCol: {span: 12}, wrapperCol: {span: 12}}),


        //switch 开关组件
        maker.switch('是否上架', 'is_show', true).props({
            'checkedChildren': '1',
            'unCheckedChildren': '0'
        }).col({span: 8, labelWidth: '100'}).wrap({labelCol: {span: 12}, wrapperCol: {span: 12}}),


        //自定义组件
        maker.createTmp('<a-button @click="onClick" style="width:100%;" :disabled="disabled">{{button}}字符串测试{{test}}-{{num}}</a-button>', function () {
            return new Vue({
                data: function () {
                    return {
                        test: 'createTmp渲染',
                        button: '<a-button />',
                        num: this.value,
                    }
                },
                props: {
                    disabled: Boolean,
                    value: Number,
                    formCreate: Object
                },
                watch: {
                    value(n) {
                        this.num = n;
                    }
                },
                methods: {
                    onClick: function () {
                        console.log('click');
                        this.num++;
                        this.$emit('input', this.num);
                    },
                    //表单禁用事件
                    onDisabled: function (disabled) {
                        this.disabled = disabled;
                    },
                    //表单重置事件
                    onResetField: function () {
                        this.num = 0;
                    },
                    //通过setValue,changeField,changeValue方法设置表单值时事件
                    onSetValue: function (val, $f) {
                        this.num = val;
                    }
                }
            })
        }, 'tmp', '自定义 title').value(100).props('disabled', false),


        //自定义组件
        maker.create('a-button', 'btn').props('disabled', false).col({span: 12, push: 2}).children([
            maker.create('span').domProps({
                innerHTML: '测试自定义按钮'
            })
        ]).emit(['click']).emitPrefix('btn'),


        //自定义组件
        maker.create('a-tooltip', 'tip', '自定义 title').props({
            title: '这里是提示文字',
        }).col({span: 11, push: 1}).children([
            maker.create('span').domProps({
                innerHTML: '当鼠标经过这段文字时，会显示一个气泡框'
            })
        ]).value(false),


        //select 下拉选择组件
        maker.select('产品分类', 'cate_id', '104').options([
            {'value': '104', 'label': '生态蔬菜', 'disabled': false},
            {'value': '105', 'label': '新鲜水果', 'disabled': false},
        ]).event({change: console.log}),


        {
            type: 'fragment',//内置组件
            children: [
                {
                    type: 'a-col',
                    props: {
                        span: 12
                    },
                    children: [

                        //datePicker 日期选择组件
                        maker.datetimeRange('活动日期', 'section_day', ['2018-02-20 12:12:12', '2018-03-20 12:12:12']).props({
                            showTime: true
                        }),

                        //timePicker 时间选择组件
                        maker.time('活动时间', 'section_time', ['11:11:11', '22:22:22']).props({
                            'placeholder': '请选择活动时间'
                        }),

                    ]
                },
                {
                    type: 'a-col',
                    props: {
                        span: 12
                    },
                    children: [
                        //inputNumber 数组输入框组件
                        maker.number('排序', 'sort', 0).props({
                            precision: 2
                        }).col({span: 24}).validate(
                            [{require: true, type: 'number', min: 10}]
                        ),
                    ]
                }
            ],
            native: true
        },


        //rate 评分组件
        maker.rate('推荐级别', 'rate', 2)
            .props({
                'count': 10,
            })
            .validate({required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'})
            .col({span: 12}).control([
            {
                handle: function (val) {
                    return val > 5;
                },
                rule: [
                    maker.input('好评原因', 'goods_reason', '').props({disabled: false})
                ]
            }, {
                handle: function (val) {
                    return val < 5;
                },
                rule: [
                    maker.input('差评原因', 'bad_reason', '').props({disabled: false})
                ]
            }
        ]),


        //slider 滑块组件
        maker.slider('滑块', 'slider', [30, 80]).props({
            'min': 0,
            'max': 100,
            'range': true,
        }).col({span: 12}),

        {
            type: 'wangEditor',
            field: 'txt',
            title: '富文本框',
            value: '<h1 style="color: #419bf7;">form-create</h1><a href="https://github.com/xaboy/form-create">GitHub</a>'
        },

        //upload 上传组件
        maker.upload('轮播图', 'pic', ['http://file.lotkk.com/form-create.jpeg'])
            .props({
                // "action": "http://127.0.0.1:8000/index/index/upload",
                action: 'https://api.uukit.com/req/mock/48959qh',
                'limit': 2,
                listType: 'picture-card',
                'name': 'file',
                'allowRemove': true,
                onSuccess: function (file) {
                    file.url = file.response.url;
                }
            }),

        //frame 框架组件
        maker.frame('素材', 'fodder', ['http://file.lotkk.com/form-create.jpeg']).props({
            src: '../iframe.html',
            maxLength: 0,
            type: 'image',
            width: '80%',
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
        maker.tree('权限', 'tree', [11, 12]).props({
            defaultExpandAll: true,
            treeData: [
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
