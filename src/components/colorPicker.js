import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({});

const render = renderFactory({
    parse(){
        return [this.cvm.colorPicker(this.inputProps().get())];
    }
});

const make = makerFactory('colorpicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}