import handler from './handler'
import {Render} from "@form-create/core";

const name = 'cascader';

const render = Render.factory(name);

export default {handler, render, name};
