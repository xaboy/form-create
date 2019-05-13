import handler from "./handler";
import {creatorTypeFactory} from "@form-create/core";
import render from '../../factory/render';

const name = "datePicker";

const maker = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});

export default {handler, render, name, maker};
