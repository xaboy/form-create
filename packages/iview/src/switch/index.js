import {Handler, creatorTypeFactory} from "@form-create/core";
import render from "./render";

const name = "switch";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

export default {handler, render, name, maker};
