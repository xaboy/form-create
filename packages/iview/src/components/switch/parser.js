import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {
    render(children) {
        let rule = this.rule, slot = rule.props.slot || {};

        //TODO 优化 slot
        return this.vNode.switch(this.r.inputVData(this).scopedSlots({
            open: () => slot.open,
            close: () => slot.close
        }).style({'margin': '4.5px 0px'}).get(), children);
    }
}
