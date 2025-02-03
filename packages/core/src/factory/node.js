import toLine from '@form-create/utils/lib/toline';
import is from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';
import Vue from 'vue';

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
            this.h = this.$h = vm.$createElement;
        },
        make(tag, data, children) {
            if (Vue.isReservedTag ? (Vue.isReservedTag(tag)) : Vue?.config?.isReservedTag(tag)) {
                delete data?.nativeOn;
                delete data?.props?.formCreateInject;
            }
            return this.makeComponent(tag, data, children);
        },
        makeComponent(type, data, children) {
            let Node = this.$h(type, parseProp(data), children || []);
            if (Node?.componentOptions?.propsData && data?.props) {
                const keys = Object.keys(Node.componentOptions.propsData);
                if (!Node.data.attrs) {
                    Node.data.attrs = {};
                }
                Object.keys(data.props).forEach(key => {
                    if (Node.data.attrs[key] == null && keys.indexOf(key) === -1 && ['string', 'number', 'boolean'].indexOf(typeof data.props[key]) > -1) {
                        Node.data.attrs[key] = data.props[key];
                    }
                })
            }
            Node.context = this.vm;
            return Node;
        },
        aliasMap
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
                    CreateNode.prototype[n] = function (data, children) {
                        return this.make(v, data, children);
                    };
                });
            });
        }
    })

    return CreateNode;
}
