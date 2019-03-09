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
        this.parseValue = [];
        const props = this.rule.props;
        props.fileList = [];
        props.showFileList = false;
        if (isUndef(props.uploadType)) $set(props, 'uploadType', 'file');
        if (!props.modalTitle) $set(props, 'modalTitle', '预览');
        if (props.uploadType === 'file' && isUndef(props.handleIcon)) $set(props, 'handleIcon', false);
        $set(this.rule, 'value', parseValue(this.rule.value));
    }

    toFormValue(value) {
        let files = parseValue(value);
        this.parseValue.splice(0, this.parseValue.length);
        files.forEach((file) => this.push(file));
        $set(this.rule.props, 'fileList', this.parseValue);
        return this.parseValue;
    }

    mounted() {
        super.mounted();
        $set(this.rule.props, 'fileList', this.parseValue);
        this.changeParseValue(this.el.uploadFiles || []);
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
        return this.rule.props.limit === 1
            ? (files[0] || '')
            : files;
    }

    changeParseValue(parseValue) {
        this.parseValue = parseValue;
        this.vm._changeFormData(this.field, parseValue);
    }

    watchValue(n) {
        let b = true;
        this.rule.props.fileList.forEach((pic) => {
            b = b && (pic.percentage === undefined || pic.status === 'success');
        });
        if (b)
            super.watchValue(n);
    }


}
