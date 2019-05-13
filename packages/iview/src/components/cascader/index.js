import handler from './handler'
import {defaultRenderFactory} from "@form-create/core";

const name = 'cascader';

const render = defaultRenderFactory(name);

export default {handler, render, name};
