import handler from "./handler";
import {creatorFactory} from "@form-create/core";
import Render from '../../factory/render';


const name = "inputNumber";


const maker = {
    number: creatorFactory(name)
};

const render = Render.factory(name);

export default {handler, render, name, maker};
