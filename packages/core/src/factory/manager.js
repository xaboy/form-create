import mergeProps from '@form-create/utils/lib/mergeprops';
import unique from '@form-create/utils/lib/unique';

export default class Manager {
    constructor(handle) {
        this.$handle = handle;
        this.vm = handle.vm;
        this.options = {};
        this.key = unique();
        this.ref = 'fcForm';
    }

    init() {
        this.$render = this.$handle.$render;
    }

    form() {
        return this.vm.$refs[this.ref];
    }

    updateOptions(options) {
        this.options = mergeProps([this.tidyOptions(options)], this.getDefaultOptions(), {
            normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
        })
    }

    tidyOptions(options) {
        return options;
    }

    tidyRule(rule) {
        return rule;
    }

    mergeRule(rule) {
        return rule;
    }

    getDefaultOptions() {
        return {};
    }

    render(children) {

    }
}
