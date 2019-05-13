import handler from './handler'
import {creatorFactory} from "@form-create/core";
import Render from '../../factory/render';

const name = 'autoComplete';

const maker = {
    auto: creatorFactory(name)
};

const render = Render.factory(name, true);


export default {handler, render, name, maker};
