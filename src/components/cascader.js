import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";

const handler = handlerFactory({
    init(){
        let rule = this.rule;
        if(!rule.props.data) rule.props.data = [];
        if(!isArray(this.value)) this.value = [];
    },
    toTrueValue(){
	    return this.el.value === undefined ? this.vm.getFormData(this.field) : this.el.value;
    },
    toParseValue(value){
	    return isArray(value) ? Array.from(value) : [];
    },
	mounted() {
		this.vm.changeTrueData(this.field,this.el.value);
	}
});

const render = renderFactory({
    parse(){
        return [this.cvm.cascader(this.inputProps().get())];
    }
});

export default {handler,render};
