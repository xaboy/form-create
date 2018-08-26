import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";

const handler = handlerFactory({
    init(){
        this.rule.props = {};

    }});

const render = renderFactory({
    parse(){
        return [];
    }
});


export default {handler,render};