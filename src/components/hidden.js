import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
        this.rule.props = {};

    }});

const render = renderFactory({
    parse(){
        return [];
    }
});

const make = (function () {
    let makeRule = makerFactory('hidden',[]);
    return makeRule.bind(makeRule,'');
}());

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}