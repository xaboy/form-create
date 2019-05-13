import handler from "./handler";
import Render from '../../factory/render';

const name = "rate";

const render = Render.factory(name);

export default {handler, render, name};
