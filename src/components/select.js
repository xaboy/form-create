import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorTypeFactory} from "../factory/creator";
import {toDefSlot} from "../core/common";

const name = "select";

class handler extends Handler {
    toFormValue(value) {
        let isArr = Array.isArray(value);
        if (this.rule.props.multiple === true)
            return isArr === true ? value : [value];
        else
            return isArr === true ? (value[0] || '') : value;
    }

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

class render extends Render {
    parse() {
        let {unique, rule} = this.handler;
        return [this.vNode.select(this.inputProps().get(), () => rule.options.map((option, index) => this.vNode.option({
            props: option,
            key: `sopt${index}${unique}`,
        }, toDefSlot(option.slot, this.vm.$createElement, rule))))];
    }
}

const maker = {
    selectMultiple: creatorTypeFactory(name, true, 'multiple'),
    selectOne: creatorTypeFactory(name, false, 'multiple'),
};

export default {handler, render, name, maker};
