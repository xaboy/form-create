import handler from "./handler";
import {creatorTypeFactory, Render} from "@form-create/core";

const name = "datePicker";


const maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});


const render = Render.factory(name, true);

export {render}
export default {handler, render, name, maker};
