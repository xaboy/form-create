import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {

    render(children) {
        return this.vNode.checkbox(this.$render.inputVData(this).props({
            'options': this.rule.options,
        }), children);
    }

}
