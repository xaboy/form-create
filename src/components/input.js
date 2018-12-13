import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorTypeFactory} from "../factory/creator";
import {toString} from "../core/util";

const name = "input";

export class handler extends Handler {
    init() {
        let {props} = this.rule;
        if (props.autosize && props.autosize.minRows)
            props.rows = props.autosize.minRows || 2
    }

    toParseValue(v){
        return toString(v)
    }
}

export class render extends Render {
    parse() {
        return [this.vNode.input(this.inputProps().get())];
    }


}

const maker = ['password', 'url', 'email', 'text'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial;
}, {});

maker.idate = creatorTypeFactory(name, 'date');

export default {render, handler, name, maker}
