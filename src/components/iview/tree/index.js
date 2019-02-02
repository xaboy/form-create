import handler from "./handler";
import render from "./render";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "tree";

const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

const maker = Object.keys(types).reduce((initial, key) => {
    initial[key] = creatorTypeFactory(name, types[key]);
    return initial;
}, {});

export default {handler, render, name, maker};
