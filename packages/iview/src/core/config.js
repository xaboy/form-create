import iview from 'iview';


export const ivuVersion = (iview.version && iview.version.split('.')[0] > 2 ? 3 : 2);

export const iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    infoIcon: 'ios-information-outline',
};

export const iview3 = {
    _v: 3,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    infoIcon: 'ios-information-circle-outline',
};

export const iviewConfig = (function () {
    if (typeof iview === 'undefined') return iview2;
    return (iview.version && iview.version.split('.')[0] > 2) ? iview3 : iview2;
}());

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
