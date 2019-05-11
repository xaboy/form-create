import handler from "./handler";
import {creatorFactory} from "@form-create/core";
import {defaultRenderFactory} from "@form-create/core";


const name = "inputNumber";


const maker = {
    number: creatorFactory(name)
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
