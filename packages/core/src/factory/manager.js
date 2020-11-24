import mergeProps from '@form-create/utils/lib/mergeprops';
import unique from '@form-create/utils/lib/unique';
import extend from '@form-create/utils/lib/extend';

export default function Manager(handler) {
    extend(this, {
        $handle: handler,
        vm: handler.vm,
        options: {},
        key: unique(),
        ref: 'fcForm'
    });
    this.init();
}

extend(Manager.prototype, {
    __init() {
        this.$render = this.$handle.$render;
    },
    //TODO interface
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
    mergeProp(rule) {
        return rule;
    },
    getDefaultOptions() {
        return {};
    },
    render(children) {
    }
})
