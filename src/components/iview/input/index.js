import handler from "./handler";
import {creatorTypeFactory} from "../../../factory/creator";
import {defaultRenderFactory} from "../../../factory/render";

const name = "input";

const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial;
}, {});

maker.idate = creatorTypeFactory(name, 'date');

const render = defaultRenderFactory(name);

export default {handler, render, name, maker};
