import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {creatorFactory} from "../../factory/creator";

const name = "hidden";

class handler extends Handler {

}

class render extends Render {
    parse() {
        return [];
    }
}

const maker = {
    [name]: (field, value) => creatorFactory(name)('', field, value)
};

export default {handler, render, name, maker};
