import {Render} from "@form-create/core";
import {isPlainObject, isUndef} from "@form-create/utils";


export default class render extends Render {
    parse() {
        let rule = this.handler.rule, slot = isUndef(rule.props.slot) ? rule.slot : rule.props.slot;

        if (!isPlainObject(slot)) slot = {};

        return [this.vNode.switch(this.inputProps().scopedSlots({
            open: () => slot.open,
            close: () => slot.close
        }).style({'margin': '4.5px 0px'}).get())]
    }
}
