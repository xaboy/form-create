import handler from "./handler";
import {creatorFactory} from "@form-create/core";
import {defaultRenderFactory} from "@form-create/core";

const name = "colorPicker";

const maker = {
    color: creatorFactory(name)
};

const render = defaultRenderFactory(name, true);

export default {handler, render, name, maker};
