import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";
import {timeStampToDate} from "../core/common";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
        let props = this.rule.props;
        props.type = !props.type
            ? 'date'
            : props.type;
        if(props.startDate === undefined)
	        props.startDate = timeStampToDate(props.startDate);
    },
    toParseValue(value){
        let isArr = isArray(value),props = this.rule.props,parseValue;
	    if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
	        if(isArr){
		        parseValue = value.map((time) => !time ? '' : timeStampToDate(time));
            }else{
		        parseValue = ['', '']
            }
	    } else if('date' === props.type && props.multiple === true){
		    parseValue = value.toString();
	    }else{
		    parseValue = isArr ? (parseValue = value[0]|| '') : value;
		    parseValue = !parseValue ? '' : timeStampToDate(parseValue);
	    }
	    return parseValue;
    },
    toTrueValue() {
        return this.el.publicStringValue;
    }
});

const render = renderFactory({
    parse(){
        return [this.cvm.datePicker(this.inputProps().get())];
    }
});

const make = makerFactory('datepicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}