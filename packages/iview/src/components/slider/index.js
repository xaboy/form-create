import handler from "./handler";
import {creatorTypeFactory, Render} from "@form-create/core";

const name = "slider";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

const render = Render.factory(name);

export default {handler, render, name, maker};
