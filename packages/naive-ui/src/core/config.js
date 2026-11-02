export default function getConfig() {
    return {
        form: {
            inline: false,
            labelPlacement: 'left',
            labelWidth: '125px',
            disabled: false,
            size: undefined,
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
        info: {
            type: 'popover',
            render: 'html',
        },
    };
}
