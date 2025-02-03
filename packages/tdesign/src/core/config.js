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
            innerText: '',
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            theme: 'default',
            loading: false,
            disabled: false,
            innerText: '',
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
