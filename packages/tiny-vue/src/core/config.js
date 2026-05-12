export default function getConfig() {
    return {
        form: {
            inline: false,
            labelPosition: 'right',
            labelWidth: '125px',
            disabled: false,
            size: undefined,
            validateType: 'text',
        },
        row: {
            show: true,
            gutter: 0,
        },
        submitBtn: {
            type: 'primary',
            loading: false,
            disabled: false,
            innerText: '',
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: 'default',
            loading: false,
            disabled: false,
            innerText: '',
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
