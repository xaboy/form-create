import VData from './vData';
import {toString, uniqueId} from '@form-create/utils';
import VNode from './vNode';

export default class BaseParser {

    constructor(rule, id, noValue) {
        this.rule = rule;
        this.vdata = new VData;
        this.vnode = new VNode({});
        this.id = id;

        this.noValue = noValue;
        this.type = toString(rule.type).toLowerCase();
        this.isDef = true;
        this.el = undefined;

        if (!rule.field && noValue) {
            this.field = '_def_' + uniqueId();
            this.isDef = false;
        } else {
            this.field = rule.field;
        }

        this.init();
        this.unique = 'fc_' + id;
        this.key = 'key_' + id;
        this.refName = '__' + this.field + this.id;
        this.formItemRefName = 'fi' + this.refName;

        this.init();
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