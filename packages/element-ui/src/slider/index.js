import handler from "./handler";
import {creatorTypeFactory} from "@form-create/core";
import {defaultRenderFactory} from "@form-create/core";

const name = "slider";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
