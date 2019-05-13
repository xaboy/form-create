import handler from "./handler";
import {creatorFactory, Render} from "@form-create/core";


const name = "inputNumber";


const maker = {
    number: creatorFactory(name)
};

const render = Render.factory(name);

export default {handler, render, name, maker};
