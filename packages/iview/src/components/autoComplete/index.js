import handler from './handler'
import {creatorFactory, Render} from "@form-create/core";

const name = 'autoComplete';

const maker = {
    auto: creatorFactory(name)
};

const render = Render.factory(name, true);


export default {handler, render, name, maker};
