import handler from "./handler";
import {render} from "../../iview/datePicker";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "datePicker";

const maker = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});

export default {handler, render, name, maker};
