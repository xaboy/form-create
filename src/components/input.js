import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({});

const render =  renderFactory({
    parse(){
        return [this.cvm.input(this.inputProps().get())];
    }
});

const make = makerFactory('input',['props','event','validate','slot']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}