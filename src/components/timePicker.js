import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import {timeStampToDate} from "../core/common";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    verify(){
        this.rule.props.type = !this.rule.props.type
            ? 'time'
            : this.rule.props.type;
    },
    handle() {
        let parseValue = this.rule.value;
        if ('timerange' === this.rule.props.type) {
            isArray(parseValue) || (parseValue = ['', '']);
            parseValue = parseValue.map((time) => !time ? '' : timeStampToDate(time));
        } else {
            isArray(parseValue) && (parseValue = parseValue[0]);
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        this.changeParseValue(parseValue);
    }, getValue() {
        return this.el.publicStringValue;
    }
});

const render = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.timePicker(this.propsData)];
    }
});

const make = makeFactory('timepicker',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}