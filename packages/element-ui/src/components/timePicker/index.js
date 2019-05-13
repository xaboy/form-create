import handler from "./handler";
import {creatorTypeFactory} from "@form-create/core";
import Render from '../../factory/render';

const name = "timePicker";

const render = Render.factory(name, true);

const maker = {
    time: creatorTypeFactory(name, (m) => m.props.isRange = false),
    timeRange: creatorTypeFactory(name, (m) => m.props.isRange = true)
};

export default {handler, render, name, maker};
