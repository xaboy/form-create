import {BaseParser} from '@form-create/core';
import {toString} from '@form-create/utils';

const parseFile = function (file, uid) {
        return {
            url: file,
            name: getFileName(file),
            status: 'done',
            uid
        };
    }, getFileName = function (file) {
        return toString(file).split('/').pop()
    };

export default class parser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this).get();
        return this.vNode.upload({
            props: {
                ctx: data,
                children,
                value: this.$handle.getFormData(this),
                onSuccess: data.props.onSuccess
            }
        });
    }

    toValue(formValue) {
        return formValue.map(v => v.url);
    }

    toFormValue(value) {
        if (Array.isArray(value))
            return value.map((v, i) => parseFile(v, i));
        else
            return [parseFile(value, 1)]
    }
}

