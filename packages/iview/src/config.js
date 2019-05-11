import iview from "iview";


export const iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    submitBtnIcon: 'ios-upload',
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
    imgUpIcon: 'image',
};

export const iview3 = {
    _v: 3,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    submitBtnIcon: 'ios-share',
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
    imgUpIcon: 'md-images',
};

export const iviewConfig = (function () {
    if (typeof iview === 'undefined') return iview2;
    return (iview.version && iview.version.split('.')[0] == 3) ? iview3 : iview2;
}());


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
        upload: {
            beforeUpload: () => {
            },
            onProgress: (event, file, fileList) => {
            },
            onSuccess: (response, file, fileList) => {
            },
            onError: (error, file, fileList) => {
            },
            onPreview: (file) => {
            },
            onRemove: (file, fileList) => {
            },
            onFormatError: (file, fileList) => {
            },
            onExceededSize: (file, fileList) => {
            },
            handleIcon: 'ios-eye-outline',
            allowRemove: true
        },
        submitBtn: {
            type: "primary",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.submitBtnIcon,
            innerText: "提交",
            loading: false,
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: iviewConfig.resetBtnType,
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.resetBtnIcon,
            innerText: "重置",
            loading: false,
            show: false,
            col: undefined,
            click: undefined,
        },
        iframeHelper: false,
    };
}
