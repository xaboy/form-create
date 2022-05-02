import toLine from '@form-create/utils/lib/toline';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';
import {toProps} from '../frame/util';
import {createVNode, getCurrentInstance, resolveComponent, resolveDirective, withDirectives} from 'vue';


function tidyDirectives(directives) {
    return Object.keys(directives).map(n => {
        const data = directives[n];
        const directive = resolveDirective(n);
        if (!directive) return;
        return [
            directive, data.value, data.arg, data.modifiers
        ]
    }).filter(v => !!v);
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
        makeComponent(type, data, children) {
            try {
                return makeDirective(data, createVNode(type, toProps(data), children));
            } catch (e) {
                console.error(e);
                return createVNode('');
            }
        },
        h(tag, data, children) {
            const isNativeTag = getCurrentInstance().appContext.config.isNativeTag(tag);
            if (isNativeTag) {
                delete data.formCreateInject;
            }
            try{
                return createVNode(isNativeTag ? tag : resolveComponent(tag), data, children);
            }catch (e){
                console.error(e);
                return createVNode('');
            }
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
