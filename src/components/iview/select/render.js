import Render from "../../../factory/render";
import {toDefSlot} from "../../../core/util";


export default class render extends Render {
    parse() {
        let {unique, rule} = this.handler;
        return [this.vNode.select(this.inputProps().get(), () => rule.options.map((option, index) => this.vNode.option({
            props: option,
            key: `sopt${index}${unique}`,
        }, toDefSlot(option.slot, this.vm.$createElement, rule))))];
    }
}

