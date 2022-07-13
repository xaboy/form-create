import { maker } from '../src'

window.mock = mock;
const opts = [
    {
        label: '选项一',
        value: '1',
        children: [
            { label: '子选项一', value: '1.1' },
            { label: '子选项二', value: '1.2' },
        ],
    },
    {
        label: '选项二',
        value: '2',
        children: [
            { label: '子选项三', value: '2.1' },
            { label: '子选项四', value: '2.2' },
        ],
    },
]
export default function mock() {
    return [

        // hidden 组件
        maker.hidden('id', '14'),


        // cascader 多级联动组件
        maker.cascader({ title: '所在区域', style: 'color:red' }, 'address', ['陕西省', '西安市'])
            .props({
                options: opts
            }),

        // input 输入框组件
        maker.input('商品名称', 'goods_name', 'iphone').props({
            placeholder: '请输入商品名称',
            clearable: true,
            disabled: false,
            maxlength: 10,
        }).setProp('prefix', 'prefix').setProp('suffix', 'suffix').validate([
            { required: true, message: '请输入商品名称', trigger: 'change' }
        ]).control([
            {
                value: 'append',
                child: true,
                rule: [maker.create('template').children(['append']).slot('append').setProp('suffix', {
                    type: 'span',
                    children: ['asdf']
                })]
            },
            {
                value: 'prepend',
                child: true,
                rule: [maker.create('template').children(['prepend']).slot('prepend')]
            },
        ]).on({
            input(v) {
                console.log(v);
            }
        }).emit(['change']).className('goods-name').children([
            maker.create('template').children(['append']).slot('append')
        ]).style('color:red').wrap({ style: 'color:red', class: 'asdfasdf' })
            .info('请输入商品名称!!!!!'),

        // todo autoComplete 自动选择组件
        // maker.auto('自动完成', 'auto', 'xaboy').props({
        //     fetchSuggestions: function (queryString, cb) {
        //         cb([
        //             { value: queryString }, { value: queryString + queryString }
        //         ]);
        //     }
        // }).emitPrefix('xaboy').emit(['change']).validate([{ required: true }]),


        //textarea 组件
        maker.textarea('商品简介', 'goods_info', '').props({
            autosize: { minRows: 4, maxRows: 8 },
            placeholder: '请输入商品名称'
        }).update((val, rule, api) => {
            console.log('change');
            return 'val' === api.getValue('auto');
        }).link(['auto']).wrap({
            show: true
        }).validate([{ required: true }]),

        {
            type: 'object',
            title: '对象组件',
            field: 'object',
            value: { date: '2121-12-12', field: 10, field2: '123123123' },
            props: {
                rule: [
                    {
                        type: 'col',
                        wrap: { show: true },
                        children: [
                            maker.date('date', 'date', '').native(false).col({ span: 12 }),
                            {
                                type: 'inputNumber',
                                field: 'field',
                                title: 'field',
                                props: {
                                    disabled: false
                                },
                                validate: [
                                    { required: true, min: 10, type: 'number' }
                                ],
                                col: {
                                    span: 12
                                },
                            }
                        ]

                    },
                    {
                        type: 'input',
                        field: 'field2',
                        title: 'field2',
                        emit: ['change'],
                        props: {
                            disabled: false
                        },
                        validate: [
                            { required: true }
                        ]
                    }
                ]
            }
        },

        {
            type: 'group',
            title: '批量添加',
            field: 'group',
            value: [{ date: '2121-12-12', field: 10, field2: '123123123' }],
            suffix: 'suffixsuffix',
            props: {
                rule: [
                    {
                        type: 'col',
                        wrap: { show: true },
                        children: [
                            {
                                type: 'DatePicker',
                                field: 'date',
                                title: 'date',
                                native: false,
                                col: { span: 12 }
                            },
                            {
                                type: 'inputNumber',
                                field: 'field',
                                title: 'field',
                                props: {
                                    disabled: false
                                },
                                validate: [
                                    { required: true, min: 10, type: 'number' }
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
                            { required: true }
                        ]
                    }
                ]
            },
            validate: [
                { required: true, min: 3, type: 'array', message: '最少增加3项', trigger: 'change' },
            ]
        },


        //radio 单选框组件
        maker.radio('是否包邮', 'is_postage', 0).options([
            { value: 0, label: '不包邮', disabled: false },
            { value: 1, label: '包邮', disabled: false },
            { value: 2, label: '未知', disabled: true },
        ]).props({ optionType: 'button' })
            .control([
                {
                    value: 1,
                    rule: [
                        maker.number('满额包邮', 'postage_money', 0)
                    ]
                }
            ]),
        //checkbox 复选框付选择
        maker.checkboxGroup('标签', 'label', [1])
            .props({
                options: [
                    { value: 1, label: '好用', disabled: true },
                    { value: 2, label: '方便', disabled: false },
                    { value: 3, label: '实用', disabled: false },
                    { value: 4, label: '有效', disabled: false },
                ]
        }),

        //switch 开关组件
        maker.switch('是否上架', 'is_show', '1').props({
            'activeValue': '1',
            'inactiveValue': '0',
            'slot': {
                open: '上架',
                close: '下架',
            }
        }).col({ span: 12 }),

        //自定义组件
        maker.create('t-button', 'btn').props('disabled', false).col({ span: 12 }).children([
            '测试自定义按钮'
        ]).emit(['click']).emitPrefix('btn'),

        //select 下拉选择组件
        maker.select('产品分类', 'cate_id', '105').options([
            { 'value': '104', 'label': '生态蔬菜', 'disabled': false },
            { 'value': '106', 'label': '植物植物', 'disabled': false },
            { 'value': '105', 'label': '新鲜水果', 'disabled': false },
        ]).props({ multiple: true }),
        {
            type: 'div',
            name: 'div',
            children: [
                'asdfasf',
                {
                    type: 't-col',
                    props: {
                        span: 12
                    },
                    name: 'cal',
                    children: [
                        maker.create('testSlot', 'testSlot', 'testSlotTitle123').children([
                            maker.date('', 'asd').slot('test').display(true),
                            maker.date('', 'asd23').slot('test'),
                        ]),
                        maker.rangePicker('TDateRangePicker', 'TDateRangePicker'),
                        {
                            type: 'TDateRangePicker',
                            field: 'tr',
                            title: '活动日期111111'
                        },

                        //datePicker 日期选择组件
                        maker.date('活动日期', 'section_day')
                            .props({}),

                        //timePicker 时间选择组件
                        maker.time('活动时间', 'section_time',).props({
                            'placeholder': '请选择活动时间'
                        }),
                        maker.time('时分', 'section_time',).props({
                            format: "HH:mm",
                            'placeholder': '请选择活动时间'
                        }),
                        maker.time('12小时', 'section_time',).props({
                            format: "A hh:mm:ss",
                            'placeholder': '请选择活动时间'
                        }),

                    ]
                },
                {
                    type: 't-col',
                    props: {
                        span: 12
                    },
                    children: [
                        //inputNumber 数组输入框组件
                        maker.number('排序', 'sort', 0).props({
                            precision: 2
                        }).col({ span: 12 }).validate(
                            [{ require: true, type: 'number', min: 10 }]
                        ),

                        //colorPicker 颜色选择组件
                        maker.color('颜色', 'color', '#ff7271').props({
                            'color-format': 'hex'
                        }).col({ span: 12 }),

                    ]
                }
            ],
            native: true
        },

        //rate 评分组件
        // maker.rate('推荐级别', 'rate', 2)
        //     .props({
        //         'max': 10,
        //     })
        //     .validate({required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'})
        //     .col({span: 12}).control([
        //     {
        //         handle: function (val) {
        //             return val > 5;
        //         },
        //         rule: [
        //             maker.input('好评原因', 'goods_reason', '').props({disabled: false})
        //         ]
        //     }, {
        //         handle: function (val) {
        //             return val < 5;
        //         },
        //         rule: [
        //             maker.input('差评原因', 'bad_reason', '').props({disabled: false})
        //         ]
        //     }
        // ]),


        //slider 滑块组件
        maker.slider('滑块', 'slider', [30, 80]).props({
            'min': 0,
            'max': 100,
            'range': true,
        }).col({ span: 12 }),

        {
            type: 'wangEditor',
            field: 'txt',
            title: '富文本框',
            value: '<h1 style="color: #419bf7;">form-create</h1><a href="https://github.com/xaboy/form-create">GitHub</a>'
        },

        //upload 上传组件
        maker.upload('轮播图', 'pic', ['http://file.lotkk.com/form-create.jpeg'])
            .props({
                onSuccess(res){
                    console.log('外面success',res)
                },
                'action': 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
                'limit': 2,
                multiple:true,
                'theme': 'image',
                'onRemove': function (file, fileList) {
                    console.log('remove',file, fileList);
                },
        }).validate([
            { required: true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change' }
        ]),

        //frame 框架组件
        maker.frame('素材', 'fodder', ['http://file.lotkk.com/form-create.jpeg']).props({
            src: '/iframe.html',
            maxLength: 0,
            type: 'image',
            width: '80%',
            modalTitle: '预览~~~',
            okBtnText: 'ok',
            closeBtnText: 'close',
            title: 'select'
        }).validate([
            { required: true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change' }
        ]).event({
            remove: function () {
                alert('删除了');
            },
            open: console.log,
            change() {
                console.log('change');
            }
        }),

        {
            type: 'TTreeSelect',
            title: 'tree',
            field: 'tree',
            props: {
                data: treeData
            }
        },
        //tree 树形组件
        maker.tree('权限', 'tree').props({
            data: treeData
        }).validate([
            { required: true, type: 'array', min: 2, message: '至少选择2个', trigger: 'change' }
        ])
    ];
}

var treeData = [
    {
        label: '广东省',
        value: 'guangdong',
        children: [
            {
                label: '广州市',
                value: 'guangzhou',
            },
            {
                label: '深圳市',
                value: 'shenzhen',
            },
        ],
    },
    {
        label: '江苏省',
        value: 'jiangsu',
        children: [
            {
                label: '南京市',
                value: 'nanjing',
            },
            {
                label: '苏州市',
                value: 'suzhou',
            },
        ],
    },
]