import Handler from "../../../factory/handler";

export default class handler extends Handler {
    toFormValue(value) {
        return this.rule.options.filter((opt) => opt.value === value).reduce((initial, opt) => opt.label, '')
    }

    toValue(parseValue) {
        return this.rule.options.filter((opt) => opt.label === parseValue).reduce((initial, opt) => opt.value, '')
    }

}

