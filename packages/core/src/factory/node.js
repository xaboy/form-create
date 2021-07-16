import toLine, {_parseProp} from '@form-create/utils/lib/toline';
import is from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';
import {createVNode, resolveComponent, getCurrentInstance} from 'vue';

function parseProp(prop) {
    if (is.String(prop))
        return {domProps: {innerHTML: prop}};
    return prop;
}

export function CreateNodeFactory() {

    const aliasMap = {};

    function CreateNode() {
    }

    extend(CreateNode.prototype, {
        make(tag, data, children) {
            console.log(tag);
            // if (Vue.config.isReservedTag(tag) && data.nativeOn) delete data.nativeOn;
            return createVNode(getCurrentInstance().appContext.config.isNativeTag(tag) ? tag : resolveComponent(tag), _parseProp(data), children);
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
