import handler from "./handler";
import render from "./render";
import {creatorTypeFactory} from "@form-create/core";

const name = "select";

const maker = {
    selectMultiple: creatorTypeFactory(name, true, 'multiple'),
    selectOne: creatorTypeFactory(name, false, 'multiple'),
};

export default {handler, render, name, maker};
