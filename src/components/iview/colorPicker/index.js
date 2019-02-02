import handler from "./handler";
import {creatorFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";

const name = "colorPicker";

const maker = {
    color: creatorFactory(name)
};

const render = defaultRenderFactory(name, true);

export default {handler, render, name, maker};
