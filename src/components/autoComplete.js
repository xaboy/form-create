import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorFactory} from "../factory/creator";

const name = 'autoComplete';

export class handler extends Handler {

    init() {
        let rule = this.rule;
        if (!Array.isArray(rule.data))
            rule.data = [];
    }
}

class render extends Render {
    parse() {
        return [this.vNode.AutoComplete(this.inputProps().key(this.handler.key).get())];
    }
}

const maker = {
    auto: creatorFactory(name)
};

export default {handler, render, name, maker};
