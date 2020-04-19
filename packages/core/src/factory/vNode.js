import {isFunction, isString, toString} from '@form-create/utils';

function parseVData(data) {
    if (isString(data))
        data = {domProps: {innerHTML: data}};
    else if (data && isFunction(data.get))
        data = data.get();

    return data;
}

function getVNode(VNode) {
    return isFunction(VNode) ? VNode() : (VNode || []);
}

export default class VNode {

    constructor(vm) {
        if (vm)
            this.setVm(vm);
    }

    setVm(vm) {
        this.vm = vm;
        this.$h = vm.$createElement;
    }

    make(nodeName, data, VNodeFn) {
        let Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
        Node.context = this.vm;

        return Node;
    }

    static use(nodes) {
        Object.keys(nodes).forEach((k) => {
            VNode.prototype[toString(k).toLocaleLowerCase()] = VNode.prototype[k] = function (data, VNodeFn) {
                return this.make(nodes[k], data, VNodeFn);
            };
        });
    }
}

VNode.use({fragment: 'fcFragment'});
