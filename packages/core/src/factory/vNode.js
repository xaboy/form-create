import toLine from '@form-create/utils/lib/toline';
import is from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';

function parseVData(data) {
    if (is.String(data))
        data = {domProps: {innerHTML: data}};
    else if (data && is.Function(data.get))
        data = data.get();

    return data;
}

export default class VNode {

    static aliasMap = {};

    constructor(vm) {
        if (vm)
            this.setVm(vm);
    }

    setVm(vm) {
        this.vm = vm;
        this.$h = vm.$createElement;
    }

    make(nodeName, data, VNodeFn) {
        let Node = this.$h(nodeName, parseVData(data), VNodeFn || []);
        Node.context = this.vm;

        return Node;
    }

    static alias(alias, name) {
        VNode.aliasMap[alias] = name;
    }

    static use(nodes) {
        Object.keys(nodes).forEach((k) => {
            const line = toLine(k);
            const lower = toString(k).toLocaleLowerCase();
            const v = nodes[k];
            [k, line, lower].forEach(n => {
                VNode.alias(k, v);
                VNode.prototype[n] = function (data, VNodeFn) {
                    return this.make(v, data, VNodeFn);
                };
            });
        });
    }
}

VNode.use({fragment: 'fcFragment'});
