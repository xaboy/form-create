import {Render} from "@form-create/core";
import {toDefSlot} from "@form-create/utils";


export default class render extends Render {
    parse() {
        let {unique, rule} = this.handler;
        return [this.vNode.select(this.inputProps().get(), () => rule.options.map((option, index) => this.vNode.option({
            props: option,
            key: `sopt${index}${unique}`,
        }, toDefSlot(option.slot, this.vm.$createElement, rule))))];
    }
}

