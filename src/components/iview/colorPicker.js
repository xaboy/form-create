import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {creatorFactory} from "../../factory/creator";

const name = "colorPicker";

class handler extends Handler {

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

class render extends Render {
    parse() {
        return [this.vNode.colorPicker(this.inputProps().key(this.handler.key).get())];
    }
}

const maker = {
    color: creatorFactory(name)
};

export default {handler, render, name, maker};
