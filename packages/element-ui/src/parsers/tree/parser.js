import {BaseParser} from '@form-create/core';

export function isMultiple(rule) {
    return (!rule.props.multiple) && rule.props.type === 'selected'
}


export default class Parser extends BaseParser {

    toValue(parseValue) {
        let value = parseValue;
        return !isMultiple(this.rule) ? value : (value[0] || '');
    }


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
