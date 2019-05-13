import handler from './handler'
import Render from '../../factory/render';

const name = 'cascader';

const render = Render.factory(name);

export default {handler, render, name};
