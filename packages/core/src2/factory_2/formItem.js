import VNode from './vNode';
import VData from './vData';

class FormItem {

    constructor(vm, rule, id) {
        this.rule = rule;
        this.vm = vm;
        this.vnode = new VNode(vm);
        this.vdata = new VData;
        this.id = id;

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

    render(form) {
    }
}