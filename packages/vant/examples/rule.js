export default function mock() {

    return [
        {
            type: 'input',
            title: '商品名称',
            field: 'goods_name2',
            info: {
                align: 'left',
                info:'这个是商品名称',
            },
            value: 'iphone',
            props: {
                placeholder: '请输入商品名称', //输入框占位文本
                disabled: false, //禁用
            },
            validate: [
                {required: true, message: '请输入商品名称', trigger: 'onBlur'}
            ]
        },
        {
            type: 'field',
            title: '商品名称2',
            field: 'goods_name3',
            value: 'iphone',
            $required: true,
            props: {
                placeholder: '请输入商品名称', //输入框占位文本
                type: 'textarea', //禁用
                autosize: true,
            },
        },
        {
            type: 'subform',
            title:'子表单',
            field: 'subform',
            props: {
                rule: [
                    {
                        type: 'input',
                        title: '商品名称',
                        field: 'goods_name2',
                        info: {
                            align: 'left',
                            info:'这个是商品名称',
                        },
                        value: 'iphone',
                        props: {
                            placeholder: '请输入商品名称', //输入框占位文本
                            disabled: false, //禁用
                        },
                    },
                    {
                        type: 'calendar',
                        title: '日期选择',
                        field: 'Calendar1',
                        value: '2024-06-11',
                        props: {
                            placeholder: '请选择',
                        },
                        on: {
                            open(){
                                console.log('open');
                            },
                            confirm(){
                                console.log('confirm');
                            },
                        },
                    },
                    {
                        type: 'calendar',
                        title: '日期区间',
                        field: 'Calendar2',
                        value: ['2024-06-11', '2024-07-11'],
                        props: {
                            type: 'range',
                            placeholder: '请选择',
                        },

                    },
                ]
            }
        },
        {
            type: 'group',
            title:'组合',
            field: 'group',
            props: {
                disabled: false,
                expand: 3,
                rule: [
                    {
                        type: 'input',
                        title: '商品名称',
                        field: 'goods_name2',
                        info: {
                            align: 'left',
                            info:'这个是商品名称',
                        },
                        value: 'iphone',
                        props: {
                            placeholder: '请输入商品名称', //输入框占位文本
                            disabled: true, //禁用
                        },
                    },
                    {
                        type: 'calendar',
                        title: '日期选择',
                        field: 'Calendar1',
                        value: '2024-06-11',
                        props: {
                            placeholder: '请选择',
                        },
                    },
                    {
                        type: 'calendar',
                        title: '日期区间',
                        field: 'Calendar2',
                        value: ['2024-06-11', '2024-07-11'],
                        props: {
                            type: 'range',
                            placeholder: '请选择',
                        },
                    },
                ]
            }
        },
        {
            type: 'calendar',
            title: '日期多选',
            field: 'Calendar3',
            value: ['2024-06-11', '2024-07-11', '2024-07-12'],
            props: {
                type: 'multiple',
                placeholder: '请选择',
                clearable: true,
                minDate: '2024-06-10'
            },
        },
        {
            type: 'cascader',
            title: '多级选择',
            field: 'Cascader1',
            value: '330100',
            props: {
                clearable: true,
                options: [
                    {
                        text: '浙江省',
                        value: '330000',
                        children: [{text: '杭州市', value: '330100'}],
                    },
                    {
                        text: '江苏省',
                        value: '320000',
                        children: [{text: '南京市', value: '320100'}],
                    },
                ],
                placeholder: '请选择',
            },
        },
        {
            type: 'checkbox',
            title: '多选框',
            field: 'checkbox',
            value: ['1'],
            props: {
                options: [
                    {
                        label: '复选框1',
                        value: '1',
                    },
                    {
                        label: '复选框2',
                        value: '2',
                    },
                ],
            },
        },
        {
            type: 'radio',
            title: '单选框',
            field: 'radio',
            value: '1',
            props: {
                options: [
                    {
                        label: '复选框1',
                        value: '1',
                    },
                    {
                        label: '复选框2',
                        value: '2',
                    },
                ],
            },
        },
        {
            type: 'select',
            title: '下拉选择',
            field: 'select',
            value: 'Wednesday',
            props: {
                title: '预约',
                options: [
                    { text: '周一', value: 'Monday' },
                    { text: '周二', value: 'Tuesday' },
                    { text: '周三', value: 'Wednesday' },
                    { text: '周四', value: 'Thursday' },
                    { text: '周五', value: 'Friday' },
                ],
                placeholder: '请选择',
            },
        },
        {
            type: 'rate',
            title: '评分',
            field: 'rate',
            value: 5,
            props: {
            },
        },
        {
            type: 'slider',
            title: '滑块',
            field: 'slider',
            value: 50,
            props: {
            },
        },
        {
            type: 'slider',
            title: '双滑块',
            field: 'slider2',
            value: [30, 70],
            props: {
                range: true,
            },
        },
        {
            type: 'stepper',
            title: '数字输入',
            field: 'stepper',
            value: 6,
            col: {
                span:16
            },
            props: {
                min:5,
                max:10
            },
        },
        {
            type: 'switch',
            title: '',
            field: 'switch',
            value: 1,
            col: {
                span:8
            },
            props: {
                activeValue:1,
                inactiveValue:0
            },
        },
        {
            type: 'uploader',
            title: '上传',
            field: 'uploader',
            value: [],
            props: {
                action: 'https://run.mocky.io/v3/88bff269-1d6d-4799-8b3b-5736402b3d4a',
                onSuccess(res, file) {
                    file.url = res.url;
                }
            },
        },
        {
            type: 'datePicker',
            title: '年月日选择',
            field: 'date',
            value: '2024-06-12',
            props: {
                clearable: true,
                title: '年月日选择',
                // minDate: '2024-06-11'
            },
        },
        {
            type: 'datePicker',
            title: '年月选择',
            field: 'date2',
            value: '2024-06',
            props: {
                title: '年月选择',
                columnsType: ['year', 'month']
            },
        },
        {
            type: 'datePicker',
            title: '年选择',
            field: 'date3',
            value: '2024',
            col: {
                span:12
            },
            props: {
                title: '年选择',
                columnsType: ['year'],
            },
        },
        {
            type: 'datePicker',
            title: '月日选择',
            field: 'date4',
            value: '06-12',
            col: {
                span:12
            },
            props: {
                title: '月日选择',
                columnsType: ['month', 'day'],
            },
        },
        {
            type: 'timePicker',
            title: '时间选择',
            field: 'time1',
            value: '12:47',
            props: {
                clearable: true,
                title: '时间选择',
            },
        },
        {
            type: 'timePicker',
            title: '时分秒选择',
            field: 'time2',
            value: '12:47:58',
            props: {
                title: '时分秒选择',
                columnsType: ['hour', 'minute', 'second']
            },
        },
        {
            type: 'timePicker',
            title: '小时选择',
            field: 'time3',
            value: '12',
            props: {
                title: '小时选择',
                columnsType: ['hour']
            },
        },
        {
            type: 'timePicker',
            title: '分钟选择',
            field: 'time4',
            value: '58',
            props: {
                title: '分钟选择',
                columnsType: ['minute']
            },
        },
    ];
}
