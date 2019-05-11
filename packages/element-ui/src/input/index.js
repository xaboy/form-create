import handler from "./handler";
import {creatorTypeFactory} from "@form-create/core";
import {defaultRenderFactory} from "@form-create/core";

const name = "input";

const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial;
}, {});

maker.idate = creatorTypeFactory(name, 'date');

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
