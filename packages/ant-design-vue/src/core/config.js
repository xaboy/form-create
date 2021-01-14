const UNDEF = undefined;

export default function getConfig() {
    return {
        form: {
            hideRequiredMark: false,
            layout: 'horizontal',
            labelAlign: 'right',
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 21
            },
            validateOnRuleChange: true
        },
        row: {
            gutter: 0,
        },
        submitBtn: {
            disabled: false,
            loading: false,
            type: 'primary',
            innerText: '提交',
            show: true,
            col: UNDEF,
            click: UNDEF,
        },
        resetBtn: {
            disabled: false,
            icon: 'sync',
            loading: false,
            type: 'default',
            innerText: '重置',
            show: false,
            col: UNDEF,
            click: UNDEF
        },
    };
}
