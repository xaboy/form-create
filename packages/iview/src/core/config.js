export const iviewConfig = {
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    infoIcon: 'ios-information-circle-outline',
};

export function info() {
    return {
        type: 'poptip',
        trigger: 'hover',
        placement: 'top-start',
        wordWrap: true,
        icon: iviewConfig.infoIcon
    }
}

export default function getConfig() {
    return {
        form: {
            inline: false,
            labelPosition: 'right',
            labelWidth: 125,
            showMessage: true,
            autocomplete: 'off',
            size: undefined,
        },
        row: {
            gutter: 0,
        },
        submitBtn: {
            type: 'primary',
            disabled: false,
            innerText: '提交',
            loading: false,
            show: true,
            click: undefined,
        },
        resetBtn: {
            type: iviewConfig.resetBtnType,
            disabled: false,
            icon: iviewConfig.resetBtnIcon,
            innerText: '重置',
            loading: false,
            show: false,
            click: undefined,
        },
    };
}
