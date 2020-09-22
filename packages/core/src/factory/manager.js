import mergeProps from '@form-create/utils/lib/mergeprops';
import unique from '@form-create/utils/lib/unique';

export default class Manager {
    constructor(handle) {
        this.$handle = handle;
        this.$render = handle.$render;
        this.vm = handle.vm;
        this.options = {};
        this.key = unique();
        this.ref = 'fcForm';
    }

    form() {
        return this.vm.$refs[this.ref];
    }

    updateOptions(options) {
        this.options = mergeProps(this.tidyOptions(options), this.getDefaultOptions(), {
            normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
        })
    }

    tidyOptions(options) {
        return options;
    }

    tidyRule(rule) {
        return rule;
    }

    getDefaultOptions() {
        return {};
    }

    process() {
    }

    render(children) {

    }
}
