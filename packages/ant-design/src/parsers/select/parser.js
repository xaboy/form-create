import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    constructor(handle, rule, id) {
        super(handle, rule, id);
        this.modelEvent = 'change';
    }

    render(children) {
        return this.vNode.select(this.$render.inputVData(this).props('options', this.rule.options), children);
    }
}

