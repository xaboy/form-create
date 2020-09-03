import {BaseParser} from '@form-create/core';


export default class FrameParser extends BaseParser {

    render(children) {
        const data = this.$render.inputVData(this).props('field', this.field);

        return this.vNode.frame(data, children);
    }

    closeModel() {
        this.el.closeModel && this.el.closeModel();
    }

}
