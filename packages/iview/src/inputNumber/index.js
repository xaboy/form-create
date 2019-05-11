import handler from "./handler";
import {creatorFactory, defaultRenderFactory} from "@form-create/core";


const name = "inputNumber";


const maker = {
    number: creatorFactory(name)
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
