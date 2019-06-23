import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {
    render(children) {
        return this.vNode.switch(this.$render.inputVData(this).get(), children);
    }
}
