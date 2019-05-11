import handler from "./handler";
import {creatorTypeFactory, defaultRenderFactory} from "@form-create/core";

const name = "timePicker";

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};

const render = defaultRenderFactory(name, true);

export {render}
export default {handler, render, name, maker};
