import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {


    constructor(handle, rule, id) {
        super(handle, rule, id);
        this.modelEvent = 'check'
        const props = this.rule.props;
        if (!props.replaceFields)
            props.replaceFields = {
                key: 'id'
            };
        else if (!props.replaceFields.key) props.replaceFields.key = 'id';

    }

    render(children) {
        const data = this.$render.inputVData(this).props('checkedKeys', this.$handle.getFormData(this)).props('checkable', true).get();
        return this.vNode.tree(data, [children]);
    }
}

