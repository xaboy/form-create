import {Handler as handler, creatorFactory} from "@form-create/core";
import Render from '../../factory/render';

const name = "hidden";

class render extends Render {
    parse() {
        return [];
    }
}

const maker = {
    [name]: (field, value) => creatorFactory(name)('', field, value)
};

export default {handler, render, name, maker};
