const UNDEF = undefined;

export default function getConfig() {
    return {
        form: {
            layout: 'horizontal',
            labelAlign: 'right',
            labelCol: {
                flex: '125px',
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
            innerText: '',
            show: true,
            col: UNDEF,
            click: UNDEF,
        },
        resetBtn: {
            disabled: false,
            loading: false,
            type: 'default',
            innerText: '',
            show: false,
            col: UNDEF,
            click: UNDEF
        },
    };
}
