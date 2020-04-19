import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this).get();
        return this.vNode.upload({
            props: {
                ctx: data,
                children,
                value: this.$handle.getFormData(this),
                onSuccess: data.props.onSuccess
            },
            on: {
                input: (v) => {
                    this.$render.onInput(this, v);
                }
            }
        });
    }

    toFormValue(value) {
        return this.rule.limit === 1 ? (value[0] || '') : value;
    }
}

