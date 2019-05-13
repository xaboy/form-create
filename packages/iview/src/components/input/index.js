import handler from "./handler";
import {creatorTypeFactory, Render} from "@form-create/core";

const name = "input";

const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial;
}, {});

maker.idate = creatorTypeFactory(name, 'date');

const render = Render.factory(name);

export default {handler, render, name, maker};
