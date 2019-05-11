import handler from "./handler";
import {defaultRenderFactory, creatorTypeFactory} from "@form-create/core";

const name = "timePicker";

const render = defaultRenderFactory(name, true);

const maker = {
    time: creatorTypeFactory(name, (m) => m.props.isRange = false),
    timeRange: creatorTypeFactory(name, (m) => m.props.isRange = true)
};

export default {handler, render, name, maker};
