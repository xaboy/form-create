import {BaseParser} from '@form-create/core';
import {isUndef, $set} from '@form-create/utils';

export default class Parser extends BaseParser {

    init() {
        const props = this.rule.props;
        if (isUndef(props.nodeKey)) $set(props, 'nodeKey', 'id');
        if (isUndef(props.props)) $set(props, 'props', {
            label: 'title'
        });
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
