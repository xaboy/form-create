import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {$set, dateFormat, isDate, isUndef} from "../../core/util";
import {timeStampToDate, toDefSlot} from "../../core/util";
import {creatorTypeFactory} from "../../factory/creator";

const name = 'timePicker';

export function getTime(date) {
    return isDate(date)
        ? dateFormat('hh:mm:ss', date)
        : date;
}

export function toDate(time) {
    return new Date('2018-02-14 ' + time);
}

class handler extends Handler {

    init() {
        let props = this.rule.props;
        if (!props.type) $set(props, 'type', 'time');
        if (isUndef(props.confirm)) $set(props, 'confirm', true);
    }

    toFormValue(value) {
        let parseValue, isArr = Array.isArray(value);
        if (this.rule.props.isRange === true) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : getTime(timeStampToDate(time)));
            } else {
                parseValue = ['', ''];
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? '' : getTime(timeStampToDate(value));
        }

        return Array.isArray(parseValue) ? parseValue.map(time => !time ? '' : toDate(time)) : !parseValue ? '' : toDate(parseValue);
    }

    toValue(n) {
        return this.el.formatToString(n);
    }

    mounted() {
        super.mounted();
        this.rule.value = this.el.displayValue;
        this.vm._changeFormData(this.field, this.toFormValue(this.el.displayValue));
    }
}

class render extends Render {
    parse() {

        let {key, rule, vm} = this.handler;
        return [this.vNode.timePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
    }
}

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, (m) => {
        m.props('isRange', true)
    })
};

export default {handler, render, maker, name};
