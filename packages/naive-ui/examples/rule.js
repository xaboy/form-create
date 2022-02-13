import {maker} from '../src';

window.mock = rule;
//使用maker 生成器生成
export default function rule() {
    var mock;
    return mock = [

        //hidden 组件
        maker.hidden('id', '14'),

        //自定义组件
        maker.create('testSlot', 'testSlot', 'testSlotTitle').children([
            maker.input('', 'asd').props({type:'search'}).slot('asd'),
            maker.input('', 'asd23').slot('asd'),
        ]),

        // maker.tag('标签','tag',['tag1','tag2']),

        maker.dynamicTags('动态录入','dynamic',['aaa','bbb']),

        //cascader 多级联动组件
        maker.cascader({title: '所在区域', style: 'color:red'}, 'address', ['陕西省', '西安市', '新城区']).effect({address: 1}),


        //input 输入框组件
        maker.input('商品名称', 'goods_name', 'iphone').props({
            placeholder: '请输入商品名称',
            clearable: true,
            disabled: false,
        }).validate([
            {required: true, message: '请输入商品名称', trigger: 'blur'}
        ]).emit(['change']).className('goods-name').children([
           maker.create('template').children(['append']).slot('suffix')
        ]).info({info: '请输入商品名称!!!!!', type: 'tooltip'}),


        //autoComplete 自动选择组件
        maker.auto('自动完成', 'auto', 'xaboy').props({options: [{value: 'aaa', label: 'aaa'}, {value: 'bbb', label: 'bbb'}]}).update(function (value, rule) {
            rule.props({
                options: ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
                    const prefix = value.split('@')[0]
                    return {
                        label: prefix + suffix,
                        value: prefix + suffix
                    }
                })
            });
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
                rule: [
                    maker.date('', 'date', null).native(false).col({span: 12}),
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
        ]).props({optionType: 'button'})
            .control([
            {
                value: 1,
                rule: [
                    maker.number('满额包邮', 'postage_money', 0)
                ]
            }
        ]),


        //checkbox 复选框付选择
        maker.checkbox('标签', 'label', [1]).options([
            {value: 1, label: '好用', disabled: true},
            {value: 2, label: '方便', disabled: false},
            {value: 3, label: '实用', disabled: false},
            {value: 4, label: '有效', disabled: false},
        ]),


        // switch 开关组件
        maker.switch('是否上架', 'is_show', true),

        //自定义组件
        maker.create('n-button').props('disabled', false).col({span: 12, push: 2}).children([
            maker.create('span').children(['测试自定义按钮'])
        ]).emit(['click']).emitPrefix('btn'),



        //select 下拉选择组件
        maker.select('产品分类', 'cate_id', '104').options([
            {'value': '104', 'label': '生态蔬菜', 'disabled': false},
            {'value': '105', 'label': '新鲜水果', 'disabled': false},
        ]),


        {
            type: 'row',//内置组件
            native: true,
            props:{
                span:24,
            },
            children: [
                {
                    type: 'row',
                    children: [
                        // datePicker 日期选择组件
                        maker.datePicker('活动日期', 'section_day').props({
                            showTime: true,
                        }),
                        // timePicker 时间选择组件
                        maker.timePicker('活动时间', 'section_time', '11:11:11').props({
                            'placeholder': '请选择活动时间',
                        }),
                    ]
                },
                {
                    type: 'row',
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
        },


        //rate 评分组件
        maker.rate('推荐级别', 'rate', 2)
            .props({
                'count': 10,
            })
            .validate({required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'})
            .control([
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
        maker.slider('滑块', 'slider', 80).props({
            'min': 0,
            'max': 100,
        }),

        {
            type: 'wangEditor',
            field: 'txt2',
            title: '富文本框',
            value: '<h1 style="color: #419bf7;">form-create</h1><a href="https://github.com/xaboy/form-create">GitHub</a>'
        },

        //upload 上传组件
        maker.upload('轮播图', 'pic', ['http://file.lotkk.com/form-create.jpeg'])
            .props({
                // "action": "http://127.0.0.1:8000/index/index/upload",
                action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                'limit': 2,
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
                alert('删除了');
            },
            open: console.log,
            change() {
                console.log('change');
            }
        }),


        //tree 树形组件
        maker.tree('权限', 'tree', []).props({
            defaultExpandAll: true,
            cascade: true,
            blockLine: true,
            data: [
                {
                    key: '0',
                    label: '0',
                    children: [
                        {
                            key: '0-0',
                            label: '0-0'
                        },
                        {
                            key: '0-1',
                            label: '0-1',
                            children: [
                                {
                                    label: '0-1-0',
                                    key: '0-1-0'
                                },
                                {
                                    label: '0-1-1',
                                    key: '0-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '1',
                    label: '1',
                    children: [
                        {
                            key: '1-0',
                            label: '1-0'
                        },
                        {
                            key: '1-1',
                            label: '1-1',
                            children: [
                                {
                                    label: '1-1-0',
                                    key: '1-1-0'
                                },
                                {
                                    label: '1-1-1',
                                    key: '1-1-1'
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
