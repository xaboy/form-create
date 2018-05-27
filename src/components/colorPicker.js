import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({});

const render = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.colorPicker(this.propsData)];
    }
});

const make = makeFactory('colorpicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}