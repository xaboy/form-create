import Handler from "../factory/handler";
import Render from "../factory/render";
import {timeStampToDate, toDefSlot} from "../core/common";
import {creatorTypeFactory} from "../factory/creator";
import {isUndef, toString} from "../core/util";

const name = "datePicker";

class handler extends Handler {
    init() {
        let props = this.rule.props;
        props.type = !props.type
            ? 'date'
            : toString(props.type).toLowerCase();
        if (isUndef(props.startDate))
            props.startDate = timeStampToDate(props.startDate);
    }

    toParseValue(value) {
        let isArr = Array.isArray(value), props = this.rule.props, parseValue;
        if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : timeStampToDate(time));
            } else {
                parseValue = ['', '']
            }
        } else if ('date' === props.type && props.multiple === true) {
            parseValue = toString(value);
        } else {
            parseValue = isArr ? (value[0] || '') : value;
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        return parseValue;
    }

    toTrueValue() {
        return this.el.publicStringValue;
    }

    mounted() {
        super.mounted();
        this.rule.value = this.el.publicStringValue;
        this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
    }
}

class render extends Render {
    parse() {
        let {key, rule, vm} = this.handler;
        return [this.vNode.datePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
    }
}

const maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});

export default {handler, render, name, maker};
