import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this).props('field', this.field);

        return this.vNode.frame(data, children);
    }

    closeModel() {
        this.el.closeModel && this.el.closeModel();
    }

}
