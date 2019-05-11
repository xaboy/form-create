import {Handler} from "@form-create/core";
import render from "./render";
import {creatorTypeFactory} from "@form-create/core";

const name = "switch";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

export default {handler, render, name, maker};
