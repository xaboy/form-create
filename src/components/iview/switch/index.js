import handler from "../../../factory/handler";
import render from "./render";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "switch";

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

export default {handler, render, name, maker};
