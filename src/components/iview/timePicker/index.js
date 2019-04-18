import handler from "./handler";
import {creatorTypeFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";

const name = "timePicker";

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};

const render = defaultRenderFactory(name, true);

export {render}
export default {handler, render, name, maker};
