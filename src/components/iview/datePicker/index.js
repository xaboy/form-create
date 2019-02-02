import handler from "./handler";
import render from "./render";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "datePicker";


const maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});


export default {handler, render, name, maker};
