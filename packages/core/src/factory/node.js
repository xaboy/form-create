import toLine from '@form-create/utils/lib/toline';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';
import {toProps} from '../frame/util';
import {createVNode, getCurrentInstance, resolveComponent, resolveDirective, withDirectives} from 'vue';


function tidyDirectives(directives) {
    return Object.keys(directives).map(n => {
        const directive = directives[n];
        return [
            resolveDirective(n), directive.arg, directive.value, directive.modifiers
        ]
    });
}

function makeDirective(data, vn) {
    let directives = data.directives;
    if (!directives) return vn;
    if (!Array.isArray(directives)) {
        directives = [directives];
    }
    return withDirectives(vn, directives.reduce((lst, v) => {
        return lst.concat(tidyDirectives(v));
    }, []))
}

export function CreateNodeFactory() {

    const aliasMap = {};

    function CreateNode() {
    }

    extend(CreateNode.prototype, {
        make(tag, data, children) {
            return makeDirective(data, this.h(tag, toProps(data), children));
        },
        h(tag, data, children) {
            return createVNode(getCurrentInstance().appContext.config.isNativeTag(tag) ? tag : resolveComponent(tag), data, children);
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
