import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {

    render(children) {
        const data = this.$render.parserToData(this).get();
        return this.vNode.tree({
            props: {
                ctx: data,
                children,
                value: this.$handle.getFormData(this),
                type: data.props.type
            },
            ref: this.refName,
            key: this.key,
            on: {
                input: (value) => {
                    this.$render.onInput(this, value);
                }
            }
        });
    }
}
