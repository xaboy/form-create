import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    render(children) {
        return this.vNode.select(this.$render.inputVData(this).props('options', this.rule.options), children);
    }
}

