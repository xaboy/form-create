import handler from "./handler";
import {creatorTypeFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";

const name = "slider";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
