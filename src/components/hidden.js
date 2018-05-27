import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({});

const render = renderFactory({
    parse(){
        return [];
    }
});

const make = (function () {
    let makeRule = makeFactory('hidden',[]);
    return makeRule.bind(makeRule,'');
}());

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}