export default function getConfig() {
    return {
        form: {
            inline: false,
            labelPosition: 'right',
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
            innerText: '提交',
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: 'default',
            loading: false,
            disabled: false,
            icon: 'el-icon-refresh',
            innerText: '重置',
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
