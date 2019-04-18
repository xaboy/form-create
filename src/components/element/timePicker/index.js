import handler from "./handler";
import {render} from "../../iview/timePicker";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "timePicker";

const maker = {
    time: creatorTypeFactory(name, (m) => m.props.isRange = false),
    timeRange: creatorTypeFactory(name, (m) => m.props.isRange = true)
};

export default {handler, render, name, maker};
