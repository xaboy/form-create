import Api from '../core/api';
import Render from '../core/render';
import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {copyRule, enumerable, getRule} from '../core/util';
import {err} from '@form-create/utils/lib/console';
import BaseParser from '../factory/parser';
import toLine from '@form-create/utils/lib/toline';
import {$del, $set} from '@form-create/utils/lib';
import debounce from '@form-create/utils/lib/debounce';
import {baseRule} from '../factory/creator';


export default function Handler(fc) {
    extend(this, {
        get options() {
            return fc.options || {};
        },
        fc,
        vm: fc.vm,
        watching: false,
        isMounted: false,
        validate: {},
        formData: {},
        subForm: {},
        appendData: {},
        reloadFlag: null,
        nextTick: null,
        nextReload: () => {
            this.lifecycle('reload');
        }
    });
    this.initData(fc.rules);
    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = Api(this);
    this.loadRule();
    this.initVm();
    this.$manager.__init();
}


extend(Handler.prototype, {
    initData(rules) {
        this.fieldList = {};
        this.parsers = {};
        this.customData = {};
        this.sortList = [];
        this.rules = rules;
        this.origin = [...this.rules];
        this.changeStatus = false;
        this.repeatRule = [];
    },
    clearNextTick() {
        this.nextTick && clearTimeout(this.nextTick);
        this.nextTick = null;
    },
    bindNextTick(fn) {
        this.clearNextTick();
        this.nextTick = setTimeout(() => {
            fn()
            this.nextTick = null;
        }, 10);
    },
    initVm() {
        const vm = this.vm;

        vm.$set(vm, 'formData', this.formData);

        //todo 优化 formData
        if (this.api.form) {
            const form = this.api.form;
            Object.keys(form).forEach((field) => {
                delete form[field];
            })
        } else {
            Object.defineProperty(this.api, 'form', {
                value: {},
                writable: false,
                enumerable: true
            });
        }
        Object.defineProperties(this.api.form, Object.keys(this.api.formData()).reduce((initial, field) => {
            const parser = this.getParser(field);
            const handle = this.valueHandle(parser);
            handle.configurable = true;
            initial[field] = handle;
            return initial;
        }, {}));
    },
    isRepeatRule(rule) {
        return this.repeatRule.indexOf(rule) > -1;
    },
    loadRule() {
        this.reloadFlag = false;
        this._loadRule(this.rules);
        if (this.reloadFlag) this.loadRule();
        this.vm._renderRule();
        this.$render.initOrgChildren();
    },
    loadChildren(children, parent) {
        this.reloadFlag = false;
        this._loadRule(children, parent);
        if (this.reloadFlag) this.loadRule();
    },
    _loadRule(rules, parent) {
        rules.map((_rule, index) => {
            if (parent && is.String(_rule)) return;

            if (!is.Object(_rule) || !getRule(_rule).type)
                return err('未定义生成规则的 type 字段', _rule);

            if (_rule.__fc__ && _rule.__fc__.root === rules && this.parsers[_rule.__fc__.id]) {
                let rule = _rule.__fc__.rule.children;
                if (is.trueArray(rule)) {
                    this._loadRule(rule, _rule.__fc__);
                }
                return _rule.__fc__;
            }

            let rule = getRule(_rule);

            if (rule.field && this.fieldList[rule.field]) {
                this.repeatRule.push(_rule);
                return err(`${rule.field} 字段已存在`, _rule);
            }

            let parser;
            if (_rule.__fc__) {
                parser = _rule.__fc__;
                if (parser.deleted) {
                    if (!parser._check(this)) {
                        parser.update(this);
                    }
                } else {
                    if (!parser._check(this) || this.parsers[parser.id]) {
                        //todo 检查复制规则
                        rules[index] = _rule = _rule._clone ? _rule._clone() : copyRule(_rule);
                        parser = this.createParser(this.parseRule(_rule));
                    }
                }
                if (parser.originType !== parser.rule.type) {
                    parser = this.createParser(parser.rule);
                }
            } else {
                parser = this.createParser(this.parseRule(_rule));
            }
            this.appendValue(parser.rule);
            [false, true].forEach(b => this.parseEmit(parser, b));
            parser.parent = parent || null;
            parser.root = rules;
            this.setParser(parser);

            let children = parser.rule.children;

            if (is.trueArray(children)) {
                this._loadRule(children, parser);
            }

            if (!parent) {
                this.sortList.push(parser.id);
            }
            //todo 优化 children 渲染,避免监听 vue 的 value
            if (parser.input)
                Object.defineProperty(parser.rule, 'value', this.valueHandle(parser));

            if (this.refreshControl(parser)) this.reloadFlag = true;
            return parser;
        });
    },
    valueHandle(parser) {
        return {
            enumerable: true,
            get: () => {
                return parser.toValue(this.getFormData(parser));
            },
            set: (value) => {
                if (this.isChange(parser, value)) {
                    this.setFormData(parser, parser.toFormValue(value));
                    this.valueChange(parser, value);
                    this.refresh();
                    this.$render.clearCache(parser, true);
                    this.syncValue();
                    this.vm.$emit('set-value', parser.field, value, this.api);
                }
            }
        };
    },
    createParser(rule) {
        return new (this.fc.parsers[rule.type] || this.fc.parsers[toCase(rule.type)] || this.fc.parsers[toCase('' + this.fc.CreateNode.aliasMap[toCase(rule.type)])] || BaseParser)(this, rule);
    },
    appendValue(rule) {
        if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
        rule.value = this.appendData[rule.field];
        delete this.appendData[rule.field];
    },
    parseRule(_rule) {
        const rule = getRule(_rule);
        Object.defineProperties(rule, {
            __origin__: enumerable(_rule, true)
        });

        fullRule(rule);

        if (rule.field && hasProperty(this.options.formData || {}, rule.field))
            rule.value = this.options.formData[rule.field];

        rule.options = parseArray(rule.options);
        ['on', 'props'].forEach(n => {
            this.parseInjectEvent(rule, n || {});
        })

        return rule;
    },
    parseInjectEvent(rule, on) {
        if (rule.inject === false) return;
        const inject = rule.inject || this.options.injectEvent;
        if (!is.Undef(inject)) return;
        Object.keys(on).forEach(k => {
            if (is.Function(on[k]))
                on[k] = this.inject(rule, on[k], inject)
        });
        return on;
    },
    getInjectData(self, inject) {
        const {option, rule} = this.vm.$options.propsData;
        return {
            $f: this.api,
            rule,
            self: self.__origin__,
            option,
            inject
        };
    },
    inject(self, _fn, inject) {
        if (_fn.__inject) {
            if (this.watching)
                return _fn;
            _fn = _fn.__origin;
        }

        const h = this;

        const fn = function (...args) {
            args.unshift(h.getInjectData(self, inject));
            return _fn(...args);
        };
        fn.__inject = true;
        fn.__origin = _fn;
        return fn;
    },
    parseEmit(parser, on) {
        let event = {}, rule = parser.rule, {emitPrefix, field, name, inject} = rule;
        let emit = rule[on ? 'emit' : 'nativeEmit'] || [];
        if (Array.isArray(emit)) {
            let emitKey = emitPrefix || field || name;
            if (emitKey) {
                if (!on) emitKey = `native-${emitKey}`;
                emit.forEach(eventName => {
                    if (!eventName) return;
                    const fieldKey = toLine(`${emitKey}-${eventName}`);
                    const fn = (...arg) => {
                        this.vm.$emit(fieldKey, ...arg);
                        this.vm.$emit('emit-event', fieldKey, ...arg);
                    };
                    fn.__emit = true;

                    if (inject === false) {
                        event[eventName] = fn;
                    } else {
                        inject = rule.inject || this.options.injectEvent;
                        event[eventName] = is.Undef(inject) ? fn : this.inject(rule, fn, inject);
                    }
                });
            }

        }
        parser.computed[on ? 'on' : 'nativeOn'] = event;
        return event;
    },
    render() {
        console.warn('render');
        this.vm.$nextTick(() => {
            this.bindNextTick(() => this.vm.$emit('fc.nextTick'));
        })

        if (this.vm.unique > 0)
            return this.$render.render();
        else {
            this.vm.unique = 1;
            return [];
        }
    },
    setParser(parser) {
        let {id, field, name, rule} = parser;
        this.parsers[id] = parser;
        if (name) $set(this.customData, name, parser);
        if (!parser.input) return;
        this.fieldList[field] = parser;
        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate || []);
    },
    addSubForm(parser, subForm) {
        this.subForm[parser.field] = subForm;
    },
    isChange(parser, value) {
        return JSON.stringify(parser.rule.value) !== JSON.stringify(value);
    },
    isQuote(parser, value) {
        return (is.Object(value) || Array.isArray(value)) && value === parser.rule.value;
    },
    refreshVisible(parser, val) {
        if (is.Function(parser.rule.visible)) {
            parser.rule.hidden = parser.rule.visible(val, this.api) === true;
        }
    },
    refreshLink(parser) {
        if (is.trueArray(parser.rule.link)) {
            parser.rule.link.forEach(id => {
                const p = this.getParser(id);
                if (p) {
                    this.valueChange(p, p.rule.value);
                }
            })
        }
    },
    valueChange(parser, val) {
        this.refreshVisible(parser, val);
        this.refreshLink(parser);
        if (this.refreshControl(parser)) {
            this.$render.clearCacheAll();
            this._reloadRule();
            this.refresh();
        }
    },
    syncValue() {
        this.isMounted && this.vm && this.vm.$emit('update:value', this.api.formData());
    },
    onInput(parser, value) {
        let val;
        if (parser.input && (this.isQuote(parser, val = parser.toValue(value)) || this.isChange(parser, val))) {
            this.setFormData(parser, value);
            this.changeStatus = true;
            this.valueChange(parser, val);
            this.$render.clearCache(parser);
            this.syncValue();
            this.vm.$emit('change', parser.field, val, this.api);
        }
    },
    getParser(id) {
        return this.fieldList[id] || this.customData[id] || this.parsers[id];
    },
    addParserWitch(parser) {
        const vm = this.vm;
        const none = ['field', 'type', 'value', 'vm', 'template', 'name', 'config', 'control', 'link', 'visible'];
        Object.keys(parser.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
            parser.watch.push(vm.$watch(() => parser.rule[key], n => {
                this.watching = true;
                if (key === 'hidden')
                    parser.updateKey(true);
                if (key === 'validate')
                    this.validate[parser.field] = n || [];
                else if (['props', 'on', 'nativeOn'].indexOf(key) > -1)
                    this.parseInjectEvent(parser.rule, n || {});
                else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                    this.parseEmit(parser, key === 'emit');
                this.$render.clearCache(parser);
                this.watching = false;
            }, {deep: key !== 'children'}));
        });
    },
    //todo 优化删除 rule
    //todo 检查表单重置
    //todo 检查深拷贝运行机制
    //todo 减少 reload
    //todo 优化 options 获取方式
    //todo control 中有插槽,检查缓存
    //TODO 增量 reload
    refreshControl(parser) {
        return parser.input && parser.rule.control && this.useCtrl(parser);
    },
    useCtrl(parser) {
        const controls = getControl(parser), validate = [], api = this.api;
        if (!controls.length) return false;
        //todo 优化 root,优化 control.parser, control 事件
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i], handleFn = control.handle || (val => val === control.value);
            const data = {
                ...control,
                valid: handleFn(parser.rule.value, api),
                ctrl: findControl(parser, control.rule),
            };
            if ((data.valid && data.ctrl) || (!data.valid && !data.ctrl)) continue;
            validate.push(data);
        }
        if (!validate.length) return false;
        validate.forEach(({valid, rule, prepend, append, child, ctrl}) => {
            if (valid) {
                const ruleCon = {
                    type: 'fcFragment',
                    native: true,
                    children: rule
                }
                parser.ctrlRule.push(ruleCon);
                if (prepend) {
                    api.prepend(ruleCon, prepend, child)
                } else if (append) {
                    api.append(ruleCon, append, child)
                } else {
                    parser.root.splice(parser.root.indexOf(parser.rule.__origin__) + 1, 0, ruleCon);
                }
            } else {
                parser.ctrlRule.splice(parser.ctrlRule.indexOf(ctrl), 1);
                api.removeRule(ctrl);
            }
        });
        return true;
    },
    mounted() {
        this.isMounted = true;
        this.lifecycle('mounted');
    },
    lifecycle(name) {
        const fn = this.options[name];
        fn && fn(this.api);
        this.fc.$emit(name, this.api);
    },
    deleteParser(parser, flag) {
        if (parser.delete) return;

        const {id, field, name} = parser, index = this.sortList.indexOf(id);
        console.warn(parser);
        if (parser.input) {
            Object.defineProperty(parser.rule, 'value', {
                value: parser.rule.value
            });
        }

        if (is.trueArray(parser.rule.children)) {
            parser.rule.children.forEach(h => h.__fc__ && this.deleteParser(h.__fc__, true));
        }

        $del(this.parsers, id);

        if (index > -1) {
            this.sortList.splice(index, 1);
        }
        delete this.$render.renderList[parser.id];

        if (this.fieldList[field]) {
            $del(this.validate, field);
            $del(this.formData, field);
            $del(this.fieldList, field);
        }

        if (this.$render.renderList[id]) {
            $del(this.$render.renderList, id);
        }

        if (name && this.customData[name]) {
            $del(this.customData, name);
        }

        if (this.subForm[parser.field])
            $del(this.subForm, field);
        parser._delete();
        if (!flag) this.$render.initOrgChildren();
        return parser;
    },
    refresh() {
        this.vm._refresh();
    },
    setFormData(parser, value) {
        $set(this.formData, parser.field, value);
    },
    getFormData(parser) {
        return this.formData[parser.field];
    },
    fields() {
        return Object.keys(this.formData);
    },
    reloadRule: debounce(function (rules) {
        return this._reloadRule(rules);
    }, 1),
    _reloadRule(rules) {
        console.warn('reload');
        const vm = this.vm;
        if (!rules) rules = this.rules;
        if (!this.origin.length) this.api.refresh();

        this.clearNextTick();
        this.$render.clearOrgChildren();

        this.origin = [...rules];
        const parsers = {...this.parsers};

        this.initData(rules);
        this.loadRule();
        // todo 移除已删除规则可能会导致 reload,考虑内部用 origin 渲染
        Object.keys(parsers).filter(id => this.parsers[id] === undefined)
            .forEach(id => this.deleteParser(parsers[id]));
        this.formData = {...this.formData};
        this.initVm();

        vm.$f = this.api;
        this.$render.clearCacheAll();
        this.refresh();

        this.vm.$off('fc.nextTick', this.nextReload);
        this.vm.$once('fc.nextTick', this.nextReload);
    }
})


function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function fullRule(rule) {
    const def = baseRule();

    Object.keys(def).forEach(k => {
        if (!hasProperty(rule, k)) $set(rule, k, def[k]);
    });
    return rule;
}

function getControl(parser) {
    const control = parser.rule.control || [];
    if (is.Object(control)) return [control];
    else return control;
}

function findControl(parser, rule) {
    for (let i = 0; i < parser.ctrlRule.length; i++) {
        const ctrl = parser.ctrlRule[i];
        if (ctrl.children === rule)
            return ctrl;
    }
}
