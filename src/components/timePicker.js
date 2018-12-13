import Handler from "../factory/handler";
import Render from "../factory/render";
import {dateFormat, isDate} from "../core/util";
import {timeStampToDate} from "../core/common";
import {creatorTypeFactory} from "../factory/creator";

const name = 'timePicker';

export function getTime(date) {
    return isDate(date)
        ? dateFormat('hh:mm:ss', date)
        : date;
}

class handler extends Handler {

    init() {
        let props = this.rule.props;
        if (!props.type) props.type = 'time';
        if (props.confirm === undefined) props.confirm = true;
    }

    toParseValue(value) {
        let parseValue, isArr = Array.isArray(value);
        if ('timerange' === this.rule.props.type) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : getTime(timeStampToDate(time)));
            } else {
                parseValue = ['', ''];
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? '' : getTime(timeStampToDate(value));
        }
        return parseValue;
    }

    mounted() {
        super.mounted();
        this.rule.value = this.el.publicStringValue;
        this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
    }
}

class render extends Render {
    parse() {
        return [this.vNode.timePicker(this.inputProps().key(this.handler.key).get())];
    }
}

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};

export default {handler, render, maker, name};
