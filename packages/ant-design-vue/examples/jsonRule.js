//使用 json对象 规则生成表单.!!json 不支持函数和正则
export default function jsonMock() {


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
            value: ['陕西省', '西安市'],
            props:{
                options: []
            },
            effect: {
                address: 1
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
            },
            on: {
                change(val) {
                    console.log(val);
                }
            },
            validate: [
                {required: true, message: '请输入商品名称', trigger: 'blur'}
            ],
            children: [],
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
                "resize": undefined, //控制是否能被用户缩放	 none, both, horizontal, vertical
            },
        },


        //autoComplete 自动选择组件
        {
            type: "autoComplete",
            title: "自动完成",
            field: "auto",
            value: "xaboy",
            inject: true,
            props: {
                dataSource: [],
                placeholder: '请输入'
            },
            on: {
                search: function (inject, value) {
                    inject.self.props.dataSource = !value ? [] : [value, value + value, value + value + value];
                }
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
            props: {}
        },


        //switch 开关组件
        {
            type: "switch",
            title: "是否上架",
            field: "is_show",
            value: false,
            props: {}
        },


        //select 下拉选择组件
        {
            type: "select",
            field: "cate_id",
            title: "产品分类",
            value: ["104", "105"],
            props: {
                mode: 'multiple'
            },
            options: [
                {"value": "104", "label": "生态蔬菜", "disabled": false},
                {"value": "105", "label": "新鲜水果105", "disabled": false},
                {"value": "106", "label": "新鲜水果106", "disabled": false},
                {"value": "107", "label": "新鲜水果107", "disabled": false},
                {"value": "108", "label": "新鲜水果108", "disabled": false},
            ]
        },


        //datePicker 日期选择组件
        {
            type: "datePicker",
            field: "section_day",
            title: "活动日期",
            value: '2020-04-04',
            props: {
                type: 'date',
                showTime: true,
                format: 'YYYY/MM/DD'
            }
        },


        //timePicker 时间选择组件
        {
            type: "timePicker",
            field: "section_time",
            title: "活动时间",
            value: '12:08:23',
            props: {
                format: 'HH/mm/ss'
            }
        },


        //inputNumber 数组输入框组件
        {
            type: "inputNumber",
            field: "sort",
            title: "排序",
            value: 0,
            props: {
                "step": 0.1, //计数器步长,
                "precision": 2, //数值精度
            }
        },


        //rate 评分组件
        {
            type: "rate",
            field: "rate",
            title: "推荐级别",
            value: 3.5,
            props: {
                count: 10, //最大分值
                allowHalf: true
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
                "range": true, //是否为范围选择
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
            type: "upload",
            field: "pic",
            title: "轮播图",
            value: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'], //input值
            props: {
                listType: "picture-card",
                action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
                showUploadList: true,
                onSuccess: function (file) {
                    file.url = file.response.url;
                }
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
                modal: {
                    fullscreen: true,
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
                replaceFields: {
                    key: 'id'
                },
                defaultExpandAll: true,
                treeData: [
                    {
                        title: 'parent 1',
                        id: 1,
                        children: [
                            {
                                title: 'parent 1-1',
                                id: 2,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
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
                ],//展示数据
            }
        }
    ]

}
