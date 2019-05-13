import handler from "./handler";
import {Render} from "@form-create/core";

const name = "rate";

const render = Render.factory(name);

export default {handler, render, name};
