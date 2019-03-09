import Handler from "../../../factory/handler";
import {$set, isUndef, toString} from "../../../core/util";


export function getFileName(pic) {
    return toString(pic).split('/').pop()
}

export function parseValue(value) {
    return Array.isArray(value)
        ? value
        : ((!value ? [] : [value])
        );
}

export default class handler extends Handler {
    init() {
        let props = this.rule.props;
        $set(props, 'defaultFileList', []);
        if (isUndef(props.showUploadList)) $set(props, 'showUploadList', false);
        if (isUndef(props.uploadType)) $set(props, 'uploadType', 'file');

        if (props.maxLength === undefined) $set(props, 'maxLength', 0);
        if (props.action === undefined) $set(props, 'action', '');
        if (props.uploadType === 'file' && isUndef(props.handleIcon)) $set(props, 'handleIcon', false);

        if (!props.modalTitle) $set(props, 'modalTitle', '预览');

        $set(this.rule, 'value', parseValue(this.rule.value));

        this.parseValue = [];
    }

    toFormValue(value) {
        let files = parseValue(value);
        this.parseValue.splice(0, this.parseValue.length);
        files.forEach((file) => this.push(file));
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        return this.parseValue;
    }

    mounted() {
        super.mounted();
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        this.changeParseValue(this.el.fileList || []);
    }

    push(file) {
        this.parseValue.push({
            url: file,
            name: getFileName(file)
        });
    }

    toValue(parseValue) {
        if (isUndef(parseValue)) return [];
        let files = parseValue.map((file) => file.url).filter((file) => file !== undefined);
        return this.rule.props.maxLength === 1
            ? (files[0] || '')
            : files;
    }

    changeParseValue(parseValue) {
        this.parseValue = parseValue;
        this.vm._changeFormData(this.field, parseValue);
    }

    watchValue(n) {
        let b = true;
        this.rule.props.defaultFileList.forEach((pic) => {
            b = b && (pic.percentage === undefined || pic.status === 'finished');
        });
        if (b)
            super.watchValue(n);
    }


}

