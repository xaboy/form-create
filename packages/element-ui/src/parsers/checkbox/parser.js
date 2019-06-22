import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this, true).get();
        return this.vNode.checkbox({
            props: {
                ctx: data,
                type: data.props.type,
                options: this.rule.options,
                value: this.$handle.getFormData(this),
                children
            },
            on: {
                input: (n) => {
                    this.$render.onInput(this, n);
                }
            }
        });
    }
}

