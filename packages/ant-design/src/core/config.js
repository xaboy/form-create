const UNDEF = undefined;

export default function getConfig() {
    return {
        form: {
            hideRequiredMark: false,
            layout: 'horizontal',
            labelAlign: 'right',
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
            colon: UNDEF,
            validateOnRuleChange: true
        },
        row: {
            gutter: 0,
            type: UNDEF,
            align: UNDEF,
            justify: UNDEF
        },
        info: {
            type: 'tooltip',
            placement: 'topLeft',
            icon: 'question-circle-o'
        },
        submitBtn: {
            disabled: false,
            ghost: false,
            icon: 'upload',
            loading: false,
            shape: UNDEF,
            size: UNDEF,
            type: 'primary',
            block: true,
            innerText: '提交',
            htmlType: UNDEF,
            show: true,
            col: UNDEF,
            click: UNDEF,
        },
        resetBtn: {
            disabled: false,
            ghost: false,
            icon: 'sync',
            loading: false,
            shape: UNDEF,
            size: UNDEF,
            type: 'default',
            block: true,
            innerText: '重置',
            htmlType: UNDEF,
            show: false,
            col: UNDEF,
            click: UNDEF
        },
    };
}
