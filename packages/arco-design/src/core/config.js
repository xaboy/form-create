const UNDEF = undefined;

export default function getConfig() {
    return {
        form: {
            layout: 'horizontal',
            labelAlign: 'right',
            labelColProps: {
                span: 3
            },
            wrapperColProps: {
                span: 21
            }
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
            type: 'secondary',
            innerText: '',
            show: false,
            col: UNDEF,
            click: UNDEF
        },
        info: {
            type: 'popover',
            render: 'html',
        },
    };
}
