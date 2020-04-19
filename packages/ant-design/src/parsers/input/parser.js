import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    render(children) {
        let type = this.rule.props.type;
        if (['textarea', 'search'].indexOf(type) === -1) type = 'input';
        return this.vNode[type](this.$render.inputVData(this), [children])

    }
}
