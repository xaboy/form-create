import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";

const handler = handlerFactory({
    init(){
        let {props} =this.rule;
        if(props.autosize && props.autosize.minRows)
            props.rows = props.autosize.minRows||2
    }
});

const render =  renderFactory({
    parse(){
        return [this.cvm.input(this.inputProps().get())];
    }
});

export default {handler,render};
