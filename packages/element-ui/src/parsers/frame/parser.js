import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    mergeProp(){
        //todo 优化
        this.prop.props.field = this.field;
    }

    render(children) {
        const data = this.$render.mergeProp(this);

        return this.vNode.frame(data, children);
    }

    closeModel() {
        this.el.closeModel && this.el.closeModel();
    }

}
