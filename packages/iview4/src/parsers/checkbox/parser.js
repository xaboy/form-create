import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {

    render(children) {
        return this.vNode.checkbox({
            props: {
                ctx: this.$render.inputVData(this, true).get(),
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

