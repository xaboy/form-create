import handler from "./handler";
import {creatorFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";


const name = "inputNumber";


const maker = {
    number: creatorFactory(name)
};

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
