import mergeProps from '@form-create/utils/lib/mergeprops';
import unique from '@form-create/utils/lib/unique';
import extend from '@form-create/utils/lib/extend';

export function createManager(proto) {
    class CustomManager extends Manager {
    }

    Object.assign(CustomManager.prototype, proto);
    return CustomManager;
}

export default function Manager(handler) {
    extend(this, {
        $handle: handler,
        vm: handler.vm,
        options: {},
        key: unique(),
        ref: 'fcForm',
        mergeOptionsRule: {
            normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
        }
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
    mergeOptions(args, opt) {
        return mergeProps(args.map(v => this.tidyOptions(v)), opt, this.mergeOptionsRule);
    },
    updateOptions(options) {
        this.options = this.mergeOptions([options], this.getDefaultOptions());
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
