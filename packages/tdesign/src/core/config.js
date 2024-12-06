export default function getConfig() {
    return {
        form: {
            layout: 'vertical',
            labelAlign: 'right',
            labelWidth: '125px',
        },
        row: {
            show: true,
            gutter: 0,
        },
        submitBtn: {
            theme: 'primary',
            loading: false,
            disabled: false,
            innerText: '提交',
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            theme: 'default',
            loading: false,
            disabled: false,
            innerText: '重置',
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
