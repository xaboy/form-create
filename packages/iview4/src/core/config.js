export const iviewConfig = {
    _v: 4,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    submitBtnIcon: 'ios-share',
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
    imgUpIcon: 'md-images',
    infoIcon: 'ios-information-circle-outline',
};


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
            type: undefined,
            align: undefined,
            justify: undefined,
            className: undefined
        },
        info: {
            type: 'poptip',
            trigger: 'hover',
            placement: 'top-start',
            wordWrap: true,
            icon: iviewConfig.infoIcon
        },
        submitBtn: {
            type: 'primary',
            size: 'large',
            shape: undefined,
            long: true,
            htmlType: 'button',
            disabled: false,
            icon: iviewConfig.submitBtnIcon,
            innerText: '提交',
            loading: false,
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: iviewConfig.resetBtnType,
            size: 'large',
            shape: undefined,
            long: true,
            htmlType: 'button',
            disabled: false,
            icon: iviewConfig.resetBtnIcon,
            innerText: '重置',
            loading: false,
            show: false,
            col: undefined,
            click: undefined,
        },
    };
}
