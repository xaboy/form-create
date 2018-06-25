import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {dateFormat, isArray, isDate} from "../core/util";
import {timeStampToDate} from "../core/common";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
    	let props = this.rule.props;
        if(!props.type) props.type = 'time';
        if(props.confirm === undefined) props.confirm = true;
    },
    toParseValue(value){
        let parseValue,isArr = isArray(value);
	    if ('timerange' === this.rule.props.type) {
	        if(isArr){
		        parseValue = value.map((time) => !time ? '' : this.getTime(timeStampToDate(time)));
            }else{
		        parseValue = ['', ''];
            }
	    } else {
		    isArr && (value = value[0]);
		    parseValue = !value ? '' : this.getTime(timeStampToDate(value));
	    }
	    return parseValue;
    },
    toTrueValue() {
        return this.el.publicStringValue;
    },
    getTime(date){
        return isDate(date)
            ? dateFormat('hh:mm:ss',date)
            : date;
    }
});

const render = renderFactory({
    parse(){
        return [this.cvm.timePicker(this.inputProps().get())];
    }
});

const make = makerFactory('timepicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}