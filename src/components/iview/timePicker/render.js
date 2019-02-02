import Render from "../../../factory/render";
import {toDefSlot} from "../../../core/util";


export default class render extends Render {
    parse() {
        let {key, rule, vm} = this.handler;
        return [this.vNode.timePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
    }
}

