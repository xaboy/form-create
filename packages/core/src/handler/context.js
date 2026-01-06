import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del} from '@form-create/utils/lib/modify';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {condition, deepGet, invoke, convertFieldToConditions} from '../frame/util';
import {computed, nextTick, toRef, watch} from 'vue';
import {attrs} from '../frame/attrs';
import {deepSet} from '@form-create/utils';
import toArray from '@form-create/utils/lib/toarray';

const noneKey = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject', 'sync', 'payload', 'optionsTo', 'update', 'slotUpdate', 'computed', 'component', 'cache'];
const oldValueTag = Symbol('oldValue');

export default function useContext(Handler) {
    extend(Handler.prototype, {
        getCtx(id) {
            return this.getFieldCtx(id) || this.getNameCtx(id)[0] || this.ctxs[id];
        },
        getCtxs(id) {
            return this.fieldCtx[id] || this.nameCtx[id] || (this.ctxs[id] ? [this.ctxs[id]] : []);
        },
        setIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            if (!this[field][key]) {
                this[field][key] = [ctx];
            } else {
                this[field][key].push(ctx);
            }
        },
        rmIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            const lst = this[field][key];
            if (!lst) return false;
            const flag = lst.splice(lst.indexOf(ctx) >>> 0, 1).length > 0;
            if (!lst.length) {
                delete this[field][key];
            }
            return flag;
        },
        getFieldCtx(field) {
            return (this.fieldCtx[field] || [])[0];
        },
        getNameCtx(name) {
            return this.nameCtx[name] || [];
        },
        setCtx(ctx) {
            let {id, field, name, rule} = ctx;
            this.ctxs[id] = ctx;
            name && this.setIdCtx(ctx, name, 'name');
            if (!ctx.input) return;
            this.setIdCtx(ctx, field, 'field');
            this.setFormData(ctx, ctx.parser.toFormValue(rule.value, ctx));
            if (this.isMounted && !this.reloading) {
                this.vm.emit('change', ctx.field, rule.value, ctx.origin, this.api, false, true);
            }
        },
        getParser(ctx) {
            const list = this.fc.parsers;
            const renderDriver = this.fc.renderDriver;
            if (renderDriver) {
                const parsers = renderDriver.parsers || {};
                const parser = parsers[ctx.originType] || parsers[toCase(ctx.type)] || parsers[ctx.trueType];
                if (parser) {
                    return parser;
                }
            }
            return list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType] || BaseParser;
        },
        bindParser(ctx) {
            ctx.setParser(this.getParser(ctx));
        },
        getType(alias) {
            const map = this.fc.CreateNode.aliasMap;
            const type = map[alias] || map[toCase(alias)] || alias;
            return toCase(type);
        },
        noWatch(fn) {
            if (!this.noWatchFn) {
                this.noWatchFn = fn;
            }
            invoke(fn);
            if (this.noWatchFn === fn) {
                this.noWatchFn = null;
            }
        },
        watchCtx(ctx) {
            const all = attrs();
            all.filter(k => k[0] !== '_' && k[0] !== '$' && noneKey.indexOf(k) === -1).forEach((key) => {
                const ref = toRef(ctx.rule, key);
                const flag = key === 'children';
                ctx.refRule[key] = ref;
                ctx.watch.push(watch(flag ? () => is.Function(ref.value) ? ref.value : [...(ref.value || [])] : () => ref.value, (_, o) => {
                    let n = ref.value;
                    if (this.isBreakWatch()) return;
                    if (flag && ctx.parser.loadChildren === false) {
                        this.$render.clearCache(ctx);
                        this.nextRefresh();
                        return;
                    }
                    this.watching = true;
                    nextTick(() => {
                        this.targetHook(ctx, 'watch', {key, oldValue: o, newValue: n});
                    });
                    if (key === 'hidden' && Boolean(n) !== Boolean(o)) {
                        this.$render.clearCacheAll();
                        nextTick(() => {
                            this.targetHook(ctx, 'hidden', {value: n});
                        });
                    }
                    if ((key === 'ignore' && ctx.input) || (key === 'hidden' && (ctx.rule.ignore === 'hidden' || this.options.ignoreHiddenFields))) {
                        this.syncForm();
                    } else if (key === 'link') {
                        ctx.link();
                        return;
                    } else if (['props', 'on', 'deep'].indexOf(key) > -1) {
                        this.parseInjectEvent(ctx.rule, n || {});
                        if (key === 'props' && ctx.input) {
                            this.setFormData(ctx, ctx.parser.toFormValue(ctx.rule.value, ctx));
                        }
                    } else if (key === 'emit') {
                        this.parseEmit(ctx);
                    } else if (['prefix', 'suffix'].indexOf(key) > -1)
                        n && this.loadFn(n, ctx.rule);
                    else if (key === 'type') {
                        ctx.updateType();
                        this.bindParser(ctx);
                    } else if (flag) {
                        if (is.Function(o)) {
                            o = ctx.getPending('children', []);
                        }
                        if (is.Function(n)) {
                            n = ctx.loadChildrenPending();
                        }
                        this.updateChildren(ctx, n, o);
                    }
                    this.$render.clearCache(ctx);
                    this.refresh();
                    this.watching = false;
                }, {deep: !flag, sync: flag}));
            });
            ctx.refRule['__$title'] = computed(() => {
                let title = (typeof ctx.rule.title === 'object' ? ctx.rule.title.title : ctx.rule.title) || '';
                if (title) {
                    const match = title.match(/^\{\{\s*\$t\.(.+)\s*\}\}$/);
                    if (match) {
                        title = this.api.t(match[1]);
                    }
                }
                return title;
            });
            ctx.refRule['__$info'] = computed(() => {
                let info = (typeof ctx.rule.info === 'object' ? ctx.rule.info.info : ctx.rule.info) || '';
                if (info) {
                    const match = info.match(/^\{\{\s*\$t\.(.+)\s*\}\}$/);
                    if (match) {
                        info = this.api.t(match[1]);
                    }
                }
                return info;
            });
            ctx.refRule['__$validate'] = computed(() => {
                const t = (msg) => {
                    const match = msg.match(/^\{\{\s*\$t\.(.+)\s*\}\}$/);
                    if (match) {
                        return this.api.t(match[1], {title: ctx.refRule?.__$title?.value});
                    }
                    return msg;
                }
                return toArray(ctx.rule.validate).map(item => {
                    const temp = {...item};
                    if (temp.message) {
                        temp.message = t(temp.message);
                    }
                    if (is.Function(temp.validator)) {
                        const that = ctx;
                        temp.validator = function (...args) {
                            return item.validator.call({
                                that: this,
                                id: that.id,
                                field: that.field,
                                rule: that.rule,
                                api: that.$handle.api,
                            }, ...args)
                        }
                    }
                    if (temp.adapter) {
                        if (typeof temp.error === 'object') {
                            const msg = {...temp.error};
                            Object.keys(msg).forEach((key) => {
                                msg[key] = t(msg[key]);
                            })
                            temp.error = msg;
                        }
                        return this.adapterValidate(temp, ctx);
                    }
                    return temp;
                });
            });
            if (ctx.input) {
                const val = toRef(ctx.rule, 'value');
                ctx.watch.push(watch(() => val.value, () => {
                    let formValue = ctx.parser.toFormValue(val.value, ctx);
                    if (this.isChange(ctx, formValue)) {
                        this.setValue(ctx, val.value, formValue, true);
                    }
                }));
            }
            this.bus.$once('load-end', () => {
                let computedRule = ctx.rule.computed;
                if (!computedRule) {
                    return;
                }
                if (typeof computedRule !== 'object') {
                    computedRule = {value: computedRule}
                }
                Object.keys(computedRule).forEach(k => {
                    const computedValue = computed(() => {
                        const item = computedRule[k];
                        if (!item) return undefined;
                        const value = this.compute(ctx, item);
                        if ((item.linkage || item.linkageVariable) && value === oldValueTag) {
                            return oldValueTag;
                        }
                        return value;
                    });
                    const callback = (n) => {
                        if (k === 'value') {
                            this.onInput(ctx, n);
                        } else if (k[0] === '$') {
                            this.api.setEffect(ctx.id, k, n);
                        } else {
                            deepSet(ctx.rule, k, n);
                        }
                    };
                    if (k === 'value' ? [undefined, null, ''].indexOf(ctx.rule.value) > -1 : computedValue.value !== deepGet(ctx.rule, k)) {
                        callback(computedValue.value);
                    }
                    ctx.watch.push(watch(computedValue, (n) => {
                        if(n === oldValueTag) {
                            return ;
                        }
                        setTimeout(() => {
                            callback(n);
                        });
                    }, {deep: true}));
                });

            });
            this.watchEffect(ctx);
        },
        adapterValidate(validate, ctx) {
            const validator = (value, callback) => {
                const before = validate.beforeValidate && invoke(() => validate.beforeValidate({
                    value,
                    api: this.api,
                    validate,
                    rule: ctx.rule
                }));
                if (before === false) {
                    callback();
                } else {
                    const key = this.validator(ctx, value, validate);
                    if (!key) {
                        if (validate.validator) {
                            const res = validate.validator && invoke(() => validate.validator(value, callback));
                            if (res && is.Function(res.then)) {
                                res.then(() => callback()).catch((e) => callback(e));
                            }
                        } else {
                            callback();
                        }
                    } else {
                        let message = '';
                        if (typeof validate.error === 'object') {
                            message = validate.error[key] || validate.error.default;
                        }
                        if (!message && typeof validate.message === 'string') {
                            message = validate.message;
                        }
                        if (!message) {
                            message = this.getValidateMessage(ctx, {key, rule: validate[key]});
                        }
                        callback(message);
                    }
                }
            }
            return this.$manager.adapterValidate({
                required: validate.required,
                message: validate.message,
                trigger: validate.trigger,
            }, validator);
        },
        getValidateMessage(ctx, invalid) {
            const formatRule = Array.isArray(invalid.rule) ? invalid.rule.join(',') : ('' + invalid.rule);
            return this.api.t(invalid.key === 'required' ? invalid.key : ('validate.' + invalid.key), {
                [invalid.key]: formatRule,
                title: ctx.refRule?.__$title?.value
            });
        },
        validator(ctx, value, validate) {
            const isEmpty = is.empty(value);
            if (isEmpty) {
                if (validate.required) {
                    return 'required'
                }
                return;
            }
            for (const [key, rule] of Object.entries(validate)) {
                switch (key) {
                case 'len':
                case 'maxLen':
                case 'minLen':
                    const check = (val) => {
                        if (key === 'len') {
                            return val === rule;
                        } else if (key === 'maxLen') {
                            return val <= rule;
                        } else {
                            return val >= rule;
                        }
                    }
                    if (Array.isArray(value)) {
                        if (!check(value.length)) {
                            return key;
                        }
                    } else if (typeof value === 'object') {
                        return key;
                    } else if (!check(('' + value).length)) {
                        return key;
                    }
                    break;
                case 'pattern':
                    const reg = typeof rule === 'string' ? new RegExp(rule) : rule;
                    if (!reg.test('' + value)) {
                        return key;
                    }
                    break;
                case 'uppercase':
                    if (rule && (typeof value !== 'string' || !/^[A-Z]*$/.test(value))) {
                        return key;
                    }
                    break;
                case 'lowercase':
                    if (rule && (typeof value !== 'string' || !/^[a-z]*$/.test(value))) {
                        return key;
                    }
                    break;
                case 'min':
                case 'max':
                case 'positive':
                case 'negative':
                case 'integer':
                case 'number':
                    const num = Number(value);
                    if (Number.isNaN(num)) {
                        return key;
                    }
                    if (key === 'min' && num < rule) {
                        return key;
                    }
                    if (key === 'max' && num > rule) {
                        return key;
                    }
                    if (key === 'positive' && num <= 0) {
                        return key;
                    }
                    if (key === 'negative' && num >= 0) {
                        return key;
                    }
                    if (key === 'integer' && !Number.isInteger(num)) {
                        return key;
                    }
                    break;
                case 'equal':
                    if (value !== rule) {
                        return key;
                    }
                    break;
                case 'enum':
                    if (Array.isArray(rule) && !rule.includes(value)) {
                        return key;
                    }
                    break;
                case 'hasKeys':
                    if (typeof value !== 'object' || Array.isArray(rule) && rule.some(key => !(key in value))) {
                        return key;
                    }
                    break;
                case 'email':
                    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!regexEmail.test('' + value)) {
                        return key;
                    }
                    break;
                case 'url':
                    const regexUrl = new RegExp(
                        '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
                        'i'
                    );
                    if (!regexUrl.test('' + value)) {
                        return key;
                    }
                    break;
                case 'ip':
                    const regexIp =
                        /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/;
                    if (!regexIp.test('' + value)) {
                        return key;
                    }
                    break;
                case 'phone':
                    const regexPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
                    if (!regexPhone.test('' + value)) {
                        return key;
                    }
                    break;
                case 'computed':
                    if (!this.compute(ctx, rule)) {
                        return key;
                    }
                    break;
                default:
                    break;
                }
            }
        },
        compute(ctx, item) {
            let fn;
            if (typeof item === 'object') {
                const group = ctx.getParentGroup();
                const checkCondition = (item) => {
                    item = Array.isArray(item) ? {mode: 'AND', group: item} : item;
                    if (!is.trueArray(item.group)) {
                        return true;
                    }
                    const or = item.mode === 'OR';
                    let valid = true;
                    for (let i = 0; i < item.group.length; i++) {
                        const one = item.group[i];
                        let flag;
                        let field = null;
                        let variableVal = null;
                        if (one.variable) {
                            variableVal = this.fc.getLoadData(one.variable);
                        } else if (one.field) {
                            field = convertFieldToConditions(one.field || '');
                        } else if (!one.mode) {
                            return true;
                        }
                        let compare = one.compare;
                        if (compare) {
                            compare = convertFieldToConditions(compare || '');
                        }
                        if (one.mode) {
                            flag = checkCondition(one);
                        } else if (!condition[one.condition]) {
                            flag = false;
                        } else if (is.Function(one.handler)) {
                            flag = invoke(() => one.handler(this.api, ctx.rule));
                        } else {
                            flag = invoke(() => (new Function('$condition', '$variableVal', '$val', '$form', '$scope', '$group', '$rule', `with($form){with($scope){with(this){with($group){ return $condition['${one.condition}'](${one.variable ? '$variableVal' : field}, ${compare ? compare : '$val'}); }}}}`)).call(this.api.form, condition, variableVal, one.value, this.api.top.form, this.api.top === this.api.scope ? {} : this.api.scope.form, group ? (this.subRuleData[group.id] || {}) : {}, ctx.rule));
                        }
                        if (or && flag) {
                            return true;
                        }
                        if (!or) {
                            valid = valid && flag;
                        }
                    }
                    return or ? false : valid;
                }
                let val = checkCondition(item);
                val = item.invert === true ? !val : val;
                if (item.linkage) {
                    return val ? invoke(() => this.computeValue(item.linkage, ctx, group), undefined) : oldValueTag;
                } else if(item.linkageVariable) {
                    return val ? invoke(() => this.fc.getLoadData(item.linkageVariable), undefined) : oldValueTag;
                }
                return val;
            } else if (is.Function(item)) {
                fn = () => item(this.api.form, this.api, ctx.rule);
            } else {
                const group = ctx.getParentGroup();
                fn = () => this.computeValue(item, ctx, group);
            }
            return invoke(fn, undefined);
        },
        computeValue(str, ctx, group) {
            const that = this;
            const formulas = Object.keys(this.fc.formulas).reduce((obj, k) => {
                obj[k] = function (...args) {
                    return that.fc.formulas[k].call({
                        that: this,
                        rule: ctx.rule,
                        api: that.api,
                        fc: that.fc
                    }, ...args);
                }
                return obj;
            }, {})
            return invoke(() => (new Function('$formulas', '$form', '$scope', '$group', '$rule', '$api', `with($form){with($scope){with(this){with($group){with($formulas){ return ${str} }}}}}`)).call(this.api.form, formulas, this.api.top.form, this.api.top === this.api.scope ? {} : this.api.scope.form, group ? (this.subRuleData[group.id] || {}) : {}, ctx.rule, this.api), undefined);
        },
        updateChildren(ctx, n, o) {
            this.deferSyncValue(() => {
                o && o.forEach((child) => {
                    if ((n || []).indexOf(child) === -1 && child && !is.String(child) && child.__fc__ && child.__fc__.parent === ctx) {
                        this.rmCtx(child.__fc__);
                    }
                });
                if (is.trueArray(n)) {
                    this.loadChildren(n, ctx);
                    this.bus.$emit('update', this.api);
                }
            });
        },
        rmSub(sub) {
            is.trueArray(sub) && sub.forEach(r => {
                r && r.__fc__ && this.rmCtx(r.__fc__);
            })
        },
        rmCtx(ctx) {
            if (ctx.deleted) return;
            const {id, field, input, name} = ctx;

            $del(this.ctxs, id);
            $del(this.formData, id);
            $del(this.subForm, id);
            $del(this.vm.setupState.ctxInject, id);
            const group = ctx.getParentGroup();
            if (group && this.subRuleData[group.id]) {
                $del(this.subRuleData[group.id], field);
            }
            if (ctx.group) {
                $del(this.subRuleData, id);
            }

            input && this.rmIdCtx(ctx, field, 'field');
            name && this.rmIdCtx(ctx, name, 'name');

            if (input && !hasProperty(this.fieldCtx, field)) {
                $del(this.form, field);
            }

            this.deferSyncValue(() => {
                if (!this.reloading) {
                    if (ctx.parser.loadChildren !== false) {
                        const children = ctx.getPending('children', ctx.rule.children);
                        if (is.trueArray(children)) {
                            children.forEach(h => h && h.__fc__ && this.rmCtx(h.__fc__));
                        }
                    }
                    if (ctx.root === this.rules) {
                        this.vm.setupState.renderRule();
                    }
                }
            }, input);

            const index = this.sort.indexOf(id);
            if (index > -1) {
                this.sort.splice(index, 1);
            }

            this.$render.clearCache(ctx);
            ctx.delete();
            this.effect(ctx, 'deleted');
            this.targetHook(ctx, 'deleted');
            input && !this.fieldCtx[field] && this.vm.emit('remove-field', field, ctx.rule, this.api);
            ctx.rule.__ctrl || this.vm.emit('remove-rule', ctx.rule, this.api);
            return ctx;
        },
    })
}
