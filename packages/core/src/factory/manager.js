import mergeProps from '@form-create/utils/lib/mergeprops';
import unique from '@form-create/utils/lib/unique';
import extend from '@form-create/utils/lib/extend';

export default class Manager {
    constructor(handle) {
        extend(this, {
            $handle: handle,
            vm: handle.vm,
            options: {},
            key: unique(),
            ref: 'fcForm'
        });
        this.init();
    }

    __init() {
        this.$render = this.$handle.$render;
    }
}

//TODO interface
extend(Manager.prototype, {
    init() {
    },
    form() {
        return this.vm.$refs[this.ref];
    },
    updateOptions(options) {
        this.options = mergeProps([this.tidyOptions(options)], this.getDefaultOptions(), {
            normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
        })
    },
    tidyOptions(options) {
        return options;
    },
    tidyRule(rule) {
        return rule;
    },
    mergeRule(rule) {
        return rule;
    },
    getDefaultOptions() {
        return {};
    },
    render(children) {
    }
})
