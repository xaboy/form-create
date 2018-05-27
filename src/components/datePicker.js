import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import {timeStampToDate} from "../core/common";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    verify(){
        this.rule.props.type = !this.rule.props.type
            ? 'date'
            : this.rule.props.type;
    },
    handle() {
        let parseValue = this.rule.value;
        if (['daterange', 'datetimerange'].indexOf(this.rule.props.type) !== -1) {
            isArray(parseValue) || (parseValue = ['', '']);
            parseValue = parseValue.map((time) => !time ? '' : timeStampToDate(time));
        } else {
            isArray(parseValue) && (parseValue = parseValue[0]);
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        this.changeParseValue(parseValue);
    },
    getValue() {
        return this.el.publicStringValue;
    }
});

const render = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.datePicker(this.propsData)];
    }
});

const make = makeFactory('datepicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}