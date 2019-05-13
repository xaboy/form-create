import handler from "./handler";
import {creatorTypeFactory} from "@form-create/core";
import Render from '../../factory/render';

const name = "slider";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

const render = Render.factory(name);

export default {handler, render, name, maker};
