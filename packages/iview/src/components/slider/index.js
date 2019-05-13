import handler from "./handler";
import {creatorTypeFactory, defaultRenderFactory} from "@form-create/core";

const name = "slider";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
