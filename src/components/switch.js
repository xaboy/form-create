import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
        if (this.rule.slot === undefined) this.rule.slot = {};
    }
});

const render =  renderFactory({
    parse(){
        let {slot} = this.handler.rule;
        this.propsData = this.inputProps().scopedSlots({
            open:()=>slot.open,
            close:()=>slot.close
        }).get();
        return [this.cvm.switch(this.propsData)]
    }
});

const make = makerFactory('switch',['slot','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}