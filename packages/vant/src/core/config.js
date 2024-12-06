export default function getConfig() {
    return {
        form: {
            required: 'auto',
            labelAlign: 'right',
            inputAlign: 'right',
        },
        row: {
            show: true,
            gutter: 0,
        },
        submitBtn: {
            type: 'primary',
            loading: false,
            disabled: false,
            block: true,
            innerText: '提交',
            size: 'small',
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: 'default',
            loading: false,
            disabled: false,
            block: true,
            innerText: '重置',
            size: 'small',
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
