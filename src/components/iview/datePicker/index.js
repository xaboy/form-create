import handler from "./handler";
import {creatorTypeFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";

const name = "datePicker";


const maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});


const render = defaultRenderFactory(name, true);

export {render}
export default {handler, render, name, maker};
