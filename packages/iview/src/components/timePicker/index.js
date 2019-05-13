import handler from "./handler";
import {creatorTypeFactory, Render} from "@form-create/core";

const name = "timePicker";

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};

const render = Render.factory(name, true);

export {render}
export default {handler, render, name, maker};
