import extend from '@form-create/utils/lib/extend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';


export default function useEffect(Handler) {
    extend(Handler.prototype, {
        useProvider() {
            const ps = this.fc.providers;
            Object.keys(ps).forEach(k => {
                const prop = ps[k];
                prop._c = getComponent(prop);
                this.onEffect(prop);
                this.providers[k] = prop;
            });
        },
        onEffect(provider) {
            const used = [];
            (provider._c || ['*']).forEach(name => {
                const type = name === '*' ? '*' : this.getType(name);
                if (used.indexOf(type) > -1) return;
                used.push(type);
                this.bus.$on(`p:${provider.name}:${type}:${provider.input ? 1 : 0}`, (event, args) => {
                    provider[event] && provider[event](...args);
                });
            });
            provider._used = used;
        },
        watchEffect(ctx) {
            const vm = this.vm;
            Object.keys(ctx.rule.effect || {}).forEach(k => {
                ctx.watch.push(vm.$watch(() => ctx.rule.effect[k], (n) => {
                    this.effect(ctx, 'watch', {[k]: n});
                }, {deep: true}));
            });
        },
        ruleEffect(rule, event, append) {
            this.emitEffect({
                rule,
                input: !!rule.field,
                type: this.getType(rule.type)
            }, event, append);
        },
        effect(ctx, event, custom) {
            this.emitEffect({
                rule: ctx.rule,
                input: ctx.input,
                type: ctx.trueType,
                ctx,
                custom
            }, event);
        },
        getEffect(rule, name) {
            if (hasProperty(rule, 'effect') && hasProperty(rule.effect, name))
                return rule.effect[name];
            else
                return undefined;
        },
        emitEffect({ctx, rule, input, type, custom}, event, append) {
            if (!type || type === 'fcFragment') return;
            const effect = custom ? custom : (rule.effect || {});
            Object.keys(effect).forEach(attr => {
                const p = this.providers[attr];
                if (!p || (p.input && !input)) return;
                let _type;
                if (!p._c) {
                    _type = '*';
                } else if (p._used.indexOf(type) > -1) {
                    _type = type;
                } else {
                    return;
                }
                const data = {value: effect[attr], getValue: () => this.getEffect(rule, attr), ...(append || {})};
                if (ctx) {
                    data.getProp = () => ctx.effectData(attr);
                    data.clearProp = () => ctx.clearEffectData(attr);
                    data.mergeProp = (prop) => mergeProps([prop], data.getProp());
                }
                this.bus.$emit(`p:${attr}:${_type}:${p.input ? 1 : 0}`, event, [data, rule, this.api]);
            });
        }
    });
}

function unique(arr) {
    return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index;
    });
}

function getComponent(p) {
    const c = p.components;
    if (Array.isArray(c)) return unique(c.filter(v => v !== '*'));
    else if (is.String(c)) return [c];
    else return false;
}
