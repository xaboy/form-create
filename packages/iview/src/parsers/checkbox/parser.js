import {BaseParser} from '@form-create/core';

export default class parser extends BaseParser {

    // toFormValue(value) {
    //     if (!value)
    //         value = [];
    //     else if (!Array.isArray(value))
    //         value = [value];
    //     return this.rule.options.filter((opt) => value.indexOf(opt.value) !== -1)
    //         .map((option) => option.label);
    // }
    //
    // toValue(parseValue) {
    //     let value = this.rule.options.filter((opt) => parseValue.indexOf(opt.label) !== -1)
    //         .map((opt) => opt.value);
    //     return value;
    // }

    render(children) {
        //TODO 参考 date-picker 组件 children 未处理
        return this.vNode.checkbox({
            props: {
                ctx: this.$render.inputVData(this, true).get(),
                options: this.rule.options,
                value: this.$handle.formData[this.field],
            },
            on: {
                input: (n) => {
                    this.$render.onInput(this, n);
                }
            }
        }, children);

        // let {unique, rule} = this;
        // return this.vNode.checkboxGroup(this.r.inputVData(this), () => rule.options.map((option, index) => {
        //     let clone = {...option};
        //     delete clone.value;
        //     return this.vNode.checkbox({
        //         props: clone,
        //         key: `cbp_${index}${unique}`
        //     })
        // }).concat(children));
    }
}

