import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    verify(){
        if(!this.rule.props.data) this.rule.props.data = [];
        if(!isArray(this.rule.value)) this.rule.value = [];
    },
    getValue(){
        return this.el.value;
    }
});

const render = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.cascader(this.propsData)];
    }
});

const make = makeFactory('cascader',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}