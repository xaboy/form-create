import Handler from "../factory/handler";
import Render from "../factory/render";

const name = "switch";

class handler extends Handler {
    init() {
        if (this.rule.slot === undefined) this.rule.slot = {};
    }
}

class render extends Render {
    parse() {
        let {slot} = this.handler.rule;
        this.propsData = this.inputProps().scopedSlots({
            open: () => slot.open,
            close: () => slot.close
        }).get();
        return [this.vNode.switch(this.propsData)]
    }
}

export default {handler, render, name};
