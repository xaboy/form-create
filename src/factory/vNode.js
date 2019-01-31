import {isFunction, isString} from '../core/util'

export function parseVData(data) {
    if (isString(data))
        data = {domProps: {innerHTML: data}};
    else if (data && isFunction(data.get))
        data = data.get();

    return data
}

export function getVNode(VNode) {
    return isFunction(VNode) ? VNode() : (VNode || [])
}

export default class VNode {

    constructor(vm) {
        this.setVm(vm);
    }

    setVm(vm) {
        this.vm = vm;
        this.$h = vm.$createElement;
    }

    make(nodeName, data, VNodeFn) {
        let Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
        Node.context = this.vm;

        return Node
    }

    static use(nodes) {
        Object.keys(nodes).forEach((k) => {
            VNode.prototype[k] = function (data, VNodeFn) {
                return this.make(nodes[k], data, VNodeFn);
            }
        })
    }
}
