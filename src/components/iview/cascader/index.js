import handler from './handler'
import {defaultRenderFactory} from "../../../factory/render";

const name = 'cascader';

const render = defaultRenderFactory(name);

export default {handler, render, name};
