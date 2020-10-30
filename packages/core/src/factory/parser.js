import VData from './vData';
import {toString, uniqueId} from '@form-create/utils';
import VNode from './vNode';

export default class BaseParser {

    constructor(handle, rule, id) {
        this.rule = rule;
        this.vData = new VData;
        this.vNode = new VNode();
        this.id = id;
        this.watch = [];
        this.originType = rule.type;
        this.type = toString(rule.type).toLocaleLowerCase();
        this.isDef = true;
        this.el = undefined;

        if (!rule.field) {
            this.field = '_def_' + uniqueId();
            this.isDef = false;
        } else {
            this.field = rule.field;
        }
        this.name = rule.name;
        this.refName = '__' + this.field + this.id;
        this.formItemRefName = 'fi' + this.refName;
        this.updateKey(id);
        this.root = [];
        this.ctrlRule = null;
        this.modelEvent = 'input';
        this.parent = null;

        this.update(handle);
        this.init();
    }

    updateKey(id, parent) {
        this.key = 'key_' + id;
        parent && this.parent && this.parent.updateKey(uniqueId(), parent);
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
