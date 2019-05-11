import handler from './handler'
import {creatorFactory, defaultRenderFactory} from "@form-create/core";

const name = 'autoComplete';

const maker = {
    auto: creatorFactory(name)
};

const render = defaultRenderFactory(name, true);


export default {handler, render, name, maker};
