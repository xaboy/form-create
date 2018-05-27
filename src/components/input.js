import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.input(this.propsData)];
    }
});

const make = makeFactory('input',['props','event','validate','slot']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}