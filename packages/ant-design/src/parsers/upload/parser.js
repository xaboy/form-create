import {BaseParser} from '@form-create/core';
import {toArray} from '@form-create/utils';

export default class parser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this).get();
        return this.vNode.upload({
            props: {
                ctx: data,
                children,
                value: this.$handle.getFormData(this),
                onSuccess: data.props.onSuccess,
                limit: data.props.limit
            },
            on: {
                input: (v) => {
                    this.$render.onInput(this, v);
                }
            }
        });
    }

    toFormValue(value) {
        return toArray(value);
    }

    toValue(formValue) {
        return this.rule.props.limit === 1 ? (formValue[0] || '') : formValue;
    }
}

