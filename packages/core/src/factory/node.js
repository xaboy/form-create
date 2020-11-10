import toLine from '@form-create/utils/lib/toline';
import is from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';

function parseProp(prop) {
    if (is.String(prop))
        return {domProps: {innerHTML: prop}};
    return prop;
}

export function CreateNodeFactory() {

    const aliasMap = {};

    function CreateNode(vm) {
        vm && this.setVm(vm);
    }

    extend(CreateNode.prototype, {
        setVm(vm) {
            this.vm = vm;
            this.$h = vm.$createElement;
        },
        make(nodeName, data, VNodeFn) {
            let Node = this.$h(nodeName, parseProp(data), VNodeFn || []);
            Node.context = this.vm;
            return Node;
        }
    });

    extend(CreateNode, {
        aliasMap,
        alias(alias, name) {
            aliasMap[alias] = name;
        },
        use(nodes) {
            Object.keys(nodes).forEach((k) => {
                const line = toLine(k);
                const lower = toString(k).toLocaleLowerCase();
                const v = nodes[k];
                [k, line, lower].forEach(n => {
                    CreateNode.alias(k, v);
                    CreateNode.prototype[n] = function (data, VNodeFn) {
                        return this.make(v, data, VNodeFn);
                    };
                });
            });
        }
    })

    return CreateNode;
}
