import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {$set, isUndef} from "../../core/util";

const name = "switch";

class handler extends Handler {
    init() {
        if (this.rule.slot === undefined) $set(this.rule, 'slot', {});
    }
}

class render extends Render {
    parse() {
        let rule = this.handler.rule, slot = isUndef(rule.props.slot) ? rule.slot : rule.props.slot;

        return [this.vNode.switch(this.inputProps().scopedSlots({
            open: () => slot.open,
            close: () => slot.close
        }).style({'margin': '4.5px 0px'}).get())]
    }
}

export default {handler, render, name};
