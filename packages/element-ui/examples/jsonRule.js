export default function jsonMock() {


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
                separator: '/',
            },
            effect: {
                address: 1
            }
        },


        //input 输入框组件
        {
            type: 'input',
            title: '商品名称',
            field: 'goods_name',
            value: 'iphone',
            props: {
                placeholder: '请输入商品名称', //输入框占位文本
                disabled: false, //禁用
            },
            validate: [
                {required: true, message: '请输入商品名称', trigger: 'blur'}
            ]
        },

        //input 输入框组件
        {
            type: 'input',
            title: '商品简介',
            field: 'goods_info',
            value: '',
            props: {
                type: 'textarea', //输入框类型，text，textarea 和其他 原生 input 的 type 值
                rows: 10, //输入框行数，只对 type="textarea" 有效
                autosize: {minRows: 4, maxRows: 8}, //自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
            },
            children: ['asd']
        },


        //autoComplete 自动选择组件
        {
            type: 'autoComplete',
            title: '自动完成',
            field: 'auto',
            value: 'xaboy',
            props: {
                fetchSuggestions: function (queryString, cb) {
                    cb([
                        {value: queryString}, {value: queryString + queryString}
                    ]);
                },
            }
        },

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
                            {
                                type: 'datePicker',
                                field: 'date',
                                title: 'date',
                                col: {
                                    span: 12
                                }
                            },
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
            suffix: 'suffixsuffix',
            props: {
                // field: 'field',
                rules: [
                    {
                        type: 'col',
                        wrap: {show: true},
                        children: [
                            {
                                type: 'DatePicker',
                                field: 'date',
                                title: 'date',
                                native: false,
                                col: {span: 12}
                            },
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
            },
            validate: [
                {required: true, min: 3, type: 'array', message: '最少增加3项', trigger: 'change'},
            ]
        },

        //
        //     //radio 单选框组件
        {
            type: 'radio',
            title: '是否包邮',
            field: 'is_postage',
            value: '0',
            options: [
                {value: '0', label: '不包邮', disabled: false},
                {value: '1', label: '包邮', disabled: false},
                {value: '2', label: '未知', disabled: true},
            ],
            props: {
                disabled: false,
            }
        },


        //checkbox 复选框付选择
        {
            type: 'checkbox',
            title: '标签',
            field: 'label',
            value: [
                '1', '2', '3'
            ],
            options: [
                {value: '1', label: '好用', disabled: true},
                {value: '2', label: '方便', disabled: false},
                {value: '3', label: '实用', disabled: false},
                {value: '4', label: '有效', disabled: false},
            ],
            props: {
                disabled: false, //是否禁用
            }
        },


        //switch 开关组件
        {
            type: 'switch',
            title: '是否上架',
            field: 'is_show',
            value: '1',
            props: {
                disabled: false,//是否禁用
            }
        },


        //select 下拉选择组件
        {
            type: 'select',
            field: 'cate_id',
            title: '产品分类',
            value: ['104', '105'],
            props: {
                multiple: true, //是否支持多选
                disabled: false, //是否禁用
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
            value: ['2018-02-20', '2021-02-20'],
            props: {
                type: 'daterange', //显示类型 year/month/date/dates/ week/datetime/datetimerange/daterange
                disabled: false, //禁用
            }
        },


        //timePicker 时间选择组件
        {
            type: 'timePicker',
            field: 'section_time',
            title: '活动时间',
            value: ['01:01:01', '12:12:12'],
            props: {
                disabled: false, //禁用
                isRange: true
            }
        },


        //inputNumber 数组输入框组件
        {
            type: 'inputNumber',
            field: 'sort',
            title: '排序',
            value: 0,
            props: {
                step: 0.1, //计数器步长,
                precision: 2, //数值精度
            }
        },


        //colorPicker 颜色选择组件
        {
            type: 'colorPicker',
            field: 'color',
            title: '颜色',
            value: '#ff7271',
            props: {
                disabled: false, //是否禁用
            },
        },


        //rate 评分组件
        {
            type: 'rate',
            field: 'rate',
            title: '推荐级别',
            value: 3.5,
            props: {
                max: 10, //最大分值
                disabled: false, //是否为只读
            }
        },


        //slider 滑块组件
        {
            type: 'slider',
            field: 'slider',
            title: '滑块',
            value: [0, 50],
            props: {
                min: 0, //最小值
                max: 100, //最大值
                disabled: false, //是否禁用滑块
                range: true, //是否为范围选择
            }
        },

        {
            type: 'wangEditor',
            field: 'txt',
            title: '富文本框',
            value: '<h1 style="color: #419bf7;">form-create</h1><a href="https://github.com/xaboy/form-create">GitHub</a>'
        },

        //upload 上传组件
        {
            type: 'upload',
            field: 'pic',
            title: '轮播图',
            value: ['http://file.lotkk.com/form-create.jpeg'], //input值
            props: {
                uploadType: 'image',
                action: 'http://0.0.0.0:8000/index/index/upload.html', //必选参数，上传的地址
                onSuccess: function (res, file) {
                    file.url = res.data.filePath;
                }, //文件上传成功时的钩子，返回字段为 response, file, fileList
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
                src: '/iframe.html', //iframe地址
                maxLength: 2, //value的最大数量
            },
        },

        {
            type: 'tree',
            title: '权限',
            field: 'tree',
            value: [12, 13, 14],
            props: {
                showCheckbox: true,
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
                props: {
                    label: 'title'
                }, //配置选项
                type: 'indeterminate',
            }
        }
    ]

}
