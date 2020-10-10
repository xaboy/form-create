import VNode from './vNode';
import deepExtend from '@form-create/utils/lib/deepextend';
import unique from '@form-create/utils/lib/unique';
import toCase from '@form-create/utils/lib/tocase';

export default class BaseParser {

    constructor(handle, rule, id) {
        this.vNode = new VNode();

        this.id = id;
        this.key = id;
        this.refName = id;
        this.formItemRefName = id + 'fi';
        this.modelEvent = 'input';

        this.rule = rule;
        this.name = rule.name;
        this.originType = rule.type;
        this.type = toCase(rule.type);

        this.watch = [];
        this.root = [];
        this.ctrlRule = null;
        this.parent = null;
        this.prop = {};
        this.input = !!rule.field;
        this.el = undefined;

        this.field = rule.field ? rule.field : ('_def_' + unique());

        this.update(handle);
        this.init();
    }

    initProp() {
        this.prop = deepExtend({}, this.rule);
    }

    update(handle) {
        this.$handle = handle;
        this.$render = handle.$render;
        this.vm = handle.vm;
        this.options = handle.options;
        this.vNode.setVm(this.vm);
        this.deleted = false;
    }

    init() {
    }

    toFormValue(value) {
        return value
    }

    toValue(formValue) {
        return formValue;
    }
}
