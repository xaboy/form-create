import {maker} from '../src';

window.mock = rule;
//使用maker 生成器生成
export default function rule() {

    return [

        {
            type: 'input',
            title: '商品名称',
            field: 'goods_name',
            info: '这个是商品名称',
            value: 'iphone',
            props: {
                placeholder: '请输入商品名称', //输入框占位文本
                disabled: false, //禁用
            },
            validate: [
                {required: true, message: '请输入商品名称', trigger: 'blur'}
            ]
        },
        {
            type: 'colorPicker',
            title: '颜色',
            field: 'color',
            value: '#ff7271'
        },
        {
            type: 'mentions',
            title: '提及',
            field: 'mentions',
            props: {
                options: [
                    {
                        value: 'afc163',
                        label: 'afc163',
                    },
                    {
                        value: 'zombieJ',
                        label: 'zombieJ',
                    },
                    {
                        value: 'yesmeck',
                        label: 'yesmeck',
                    },
                ]
            }
        },
        {
            type: 'input',
            title: '密码',
            field: 'password',
            info: '这个是密码',
            value: 'iphone',
            props: {
                type: 'password',
            }
        },
        {
            type: 'input',
            title: '搜索',
            field: 'search',
            value: 'iphone',
            props: {
                type: 'search',
            }
        },
        {
            type: 'textarea',
            title: '多行输入框',
            field: 'textarea',
            value: 'iphone',
        },
        {
            type: 'autoComplete',
            title: '自动完成',
            field: 'auto',
            value: 'xaboy',
            inject: true,
            props: {
                options: [{value: 'xaboy'}],
                placeholder: '请输入'
            },
            on: {
                search: function (inject, value) {
                    inject.self.props.options = !value ? [] : [{value}, {value: value + value}, {value: value + value + value}];
                }
            }
        },
        {
            type: "transfer",
            title: "权限分配",
            field: "transfer_keys",
            value: ["1", "4"],
            props: {
                titles: ["待选", "已选"],
                showSearch: true,
                dataSource: [
                    { key: "1", title: "用户管理" },
                    { key: "2", title: "角色管理" },
                    { key: "3", title: "菜单配置", disabled: true },
                    { key: "4", title: "操作日志" },
                    { key: "5", title: "系统设置" },
                ],
            },
        },
        {
            type: 'object',
            title: '对象组件',
            field: 'object',
            value: {date: '2121-12-12', field: 10, field2: '123123123'},
            props: {
                rule: [
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
                rule: [
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
        {
            type: "radio",
            title: "是否包邮",
            field: "is_postage",
            value: "0",
            options: [
                {value: "0", label: "不包邮", disabled: false},
                {value: "1", label: "包邮", disabled: false},
                {value: "2", label: "未知", disabled: true},
            ]
        },
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
        {
            type: "switch",
            title: "是否上架",
            field: "is_show",
            value: false,
            props: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
            }
        },
        {
            type: "select",
            field: "cate_id",
            title: "下拉单选",
            value: '104',
            options: [
                {"value": "104", "label": "生态蔬菜", "disabled": false},
                {"value": "105", "label": "新鲜水果105", "disabled": false},
                {"value": "106", "label": "新鲜水果106", "disabled": false},
                {"value": "107", "label": "新鲜水果107", "disabled": false},
                {"value": "108", "label": "新鲜水果108", "disabled": false},
            ]
        },
        {
            type: "select",
            field: "cate_id2",
            title: "下单拉选",
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
        {
            type: "select",
            field: "cate_id3",
            title: "下拉多选+自定义",
            value: ["104", "105"],
            props: {
                mode: 'tags'
            },
            options: [
                {"value": "104", "label": "生态蔬菜", "disabled": false},
                {"value": "105", "label": "新鲜水果105", "disabled": false},
                {"value": "106", "label": "新鲜水果106", "disabled": false},
                {"value": "107", "label": "新鲜水果107", "disabled": false},
                {"value": "108", "label": "新鲜水果108", "disabled": false},
            ]
        },
        {
            type: "datePicker",
            field: "section_day",
            title: "活动日期",
            value: '2020-04-04',
            col: {
                span: 6,
            }
        },
        {
            type: "datePicker",
            field: "section_day2",
            title: "周",
            value: '2026-20th',
            props: {
                picker: 'week'
            },
            col: {
                span: 6,
            }
        },
        {
            type: "datePicker",
            field: "section_day3",
            title: "月",
            value: '2020-04',
            props: {
                picker: 'month'
            },
            col: {
                span: 6,
            }
        },
        {
            type: "datePicker",
            field: "section_day4",
            title: "季度",
            value: '2020-q4',
            props: {
                picker: 'quarter'
            },
            col: {
                span: 6,
            }
        },
        {
            type: "datePicker",
            field: "section_day5",
            title: "年",
            value: '2020',
            props: {
                picker: 'year'
            },
            col: {
                span: 6,
            }
        },
        {
            type: "datePicker",
            field: "section_day6",
            title: "日期区间",
            value: ['2018-02-02', '2026-02-02'],
            props: {
                picker: 'date',
                range: true
            },
            col: {
                span: 8,
            }
        },
        {
            type: "datePicker",
            field: "section_day7",
            title: "日期时间区间",
            value: ['2018-02-02 12:12:12', '2026-02-02 23:23:23'],
            props: {
                showTime: true,
                range: true
            },
            col: {
                span: 8,
            }
        },
        {
            type: "datePicker",
            field: "section_day8",
            title: "日期多选",
            value: ['2018-02-02', '2026-02-02'],
            props: {
                multiple: true,
            },
            col: {
                span: 8,
            }
        },
        {
            type: "timePicker",
            field: "section_time",
            title: "活动时间",
            value: '12:08:23',
            props: {
            }
        },
        {
            type: "timePicker",
            field: "section_time2",
            title: "时间区间",
            value: ['12:08:23', '23:23:23'],
            props: {
                range: true,
            }
        },
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
        {
            type: "slider",
            field: "slider",
            title: "滑块",
            value: 40,
            props: {
                "min": 0, //最小值
                "max": 100, //最大值
            }
        },
        {
            type: "slider",
            field: "slider2",
            title: "滑块区间",
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
        {
            type: "upload",
            field: "pic",
            title: "轮播图",
            value: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'], //input值
            props: {
                listType: "picture-card",
                action: "https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo",
                onSuccess: function (file) {
                    file.url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
                }
            }
        },
        {
            type: "upload",
            field: "pic2",
            title: "轮播图-列表",
            value: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'], //input值
            props: {
                listType: "text",
                action: "https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo",
                onSuccess: function (file) {
                    file.url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
                }
            }
        },
        {
            type: "frame",
            title: "素材",
            field: "fodder",
            value: ["http://form-create.com/logo.png"],
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
            type: 'treeSelect',
            title: '树形选择',
            field: "treeSelect",
            value: '',
            props: {
                allowClear: true,
                treeData: [
                    {
                        title: 'Node1',
                        value: '0-0',
                        children: [
                            {
                                title: 'Child Node1',
                                value: '0-0-0',
                            },
                        ],
                    },
                    {
                        title: 'Node2',
                        value: '0-1',

                        children: [
                            {
                                title: 'Child Node3',
                                value: '0-1-0',
                                disabled: true,
                            },
                            {
                                title: 'Child Node4',
                                value: '0-1-1',
                            },
                            {
                                title: 'Child Node5',
                                value: '0-1-2',
                            },
                        ],
                    },
                ]
            }
        },
        {
            type: 'tree',
            title: '权限',
            field: "tree",
            value: [12, 13, 14],
            props: {
                fieldNames: {
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
    ];
}
