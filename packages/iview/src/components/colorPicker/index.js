import handler from "./handler";
import {creatorFactory, Render} from "@form-create/core";

const name = "colorPicker";

const maker = {
    color: creatorFactory(name)
};

const render = Render.factory(name, true);

export default {handler, render, name, maker};
