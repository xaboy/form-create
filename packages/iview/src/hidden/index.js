import {Handler as handler, creatorFactory, Render} from "@form-create/core";

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
