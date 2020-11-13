import Api from '../frame/api';
import Render from '../render';
import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {byParser, copyRule, enumerable, funcProxy, getRule} from '../frame/util';
import {err} from '@form-create/utils/lib/console';
import BaseParser from '../factory/parser';
import toLine from '@form-create/utils/lib/toline';
import {$del, $set} from '@form-create/utils/lib';
import debounce from '@form-create/utils/lib/debounce';
import {baseRule} from '../factory/creator';


export default function Handler(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
        watching: false,
        isMounted: false,
        validate: {},
        formData: {},
        subForm: {},
        form: {},
        appendData: {},
        cycleLoad: null,
        loadedId: 1,
        nextTick: null,
        changeStatus: false,
        nextReload: () => {
            this.lifecycle('reload');
        }
    });
    this.initData(fc.rules);

    funcProxy(this, {
        options() {
            return fc.options || {};
        },
        bus() {
            return fc.bus;
        },
    })

    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = Api(this);
    this.loadRule();
    this.initVm();
    this.$manager.__init();
}

extend(Handler.prototype, {
    initData(rules) {
        extend(this, {
            fieldList: {},
            parsers: {},
            customData: {},
            sortList: [],
            rules,
            repeatRule: [],
        });
        useHelper(rules);
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
    syncForm() {
        Object.keys(this.form).forEach(k => delete this.form[k]);
        Object.defineProperties(this.form, Object.keys(this.formData).reduce((initial, field) => {
            const parser = this.getParser(field);
            const handle = this.valueHandle(parser);
            handle.configurable = true;
            initial[field] = handle;
            return initial;
        }, {}));
    },
    initVm() {
        this.vm.$set(this.vm, 'formData', this.formData);
        this.syncForm();
    },
    isRepeatRule(rule) {
        return this.repeatRule.indexOf(rule) > -1;
    },
    loadRule() {
        console.warn('%c load', 'color:blue');
        this.cycleLoad = false;
        this.bus.$emit('beforeLoad');
        this._loadRule(this.rules);
        if (this.cycleLoad) {
            return this.loadRule();
        }
        this.vm._renderRule();
        this.$render.initOrgChildren();
    },
    loadChildren(children, parent) {
        this.cycleLoad = false;
        this.bus.$emit('beforeLoad');
        this._loadRule(children, parent);
        if (this.cycleLoad) {
            return this.loadRule();
        }
        this.$render.clearCache(parent, true);
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
                        if (parser.rule.__ctrl) {
                            return;
                        }
                        parser.update(this);
                    }
                } else {
                    if (!parser._check(this) || this.parsers[parser.id]) {
                        if (parser.rule.__ctrl) {
                            return;
                        }
                        //todo 检查复制规则,规则复用,复用后顺序错乱
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
                const pre = rules[index - 1];
                if (pre) {
                    this.sortList.splice(this.sortList.indexOf(pre.__fc__.id) + 1, 0, parser.id);
                } else {
                    this.sortList.push(parser.id);
                }
            }

            if (parser.input)
                Object.defineProperty(parser.rule, 'value', this.valueHandle(parser));

            if (this.refreshControl(parser)) this.cycleLoad = true;
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
                    this.vm.$emit('change', parser.field, value, this.api, true);
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
        console.warn('%c render', 'color:green');
        ++this.loadedId;
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
    valueChange(parser, val) {
        this.refreshRule(parser, val);
        this.bus.$emit('change-' + parser.field, val);
    },
    refreshRule(parser, val) {
        if (this.refreshControl(parser)) {
            this.$render.clearCacheAll();
            this.loadRule();
            this.refresh();
        }
        this.refreshVisible(parser, val);
    },
    appendLink(parser) {
        const link = parser.rule.link;
        is.trueArray(link) && link.forEach(field => {
            const fn = () => this.refreshRule(parser, parser.rule.value);

            this.bus.$on('change-' + field, fn);
            parser.linkOn.push(() => this.bus.$off('change-' + field, fn));
        });
    },
    syncValue() {
        this.isMounted && this.vm && this.vm.$emit('update:value', this.api.formData());
    },
    onInput(parser, value) {
        let val;
        if (parser.input && (this.isQuote(parser, val = parser.toValue(value)) || this.isChange(parser, val))) {
            this.$render.clearCache(parser);
            this.setFormData(parser, value);
            this.changeStatus = true;
            this.valueChange(parser, val);
            this.syncValue();
            this.vm.$emit('change', parser.field, val, this.api);
            this.nextLoad();
        }
    },
    nextLoad() {
        const id = this.loadedId;
        this.vm.$nextTick(() => {
            id === this.loadedId && this.refresh();
        });
    },
    getParser(id) {
        return this.fieldList[id] || this.customData[id] || this.parsers[id];
    },
    addParserWitch(parser) {
        const vm = this.vm;
        const none = ['field', 'type', 'value', 'vm', 'template', 'name', 'config', 'control', 'link', 'visible'];
        Object.keys(parser.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
            parser.watch.push(vm.$watch(() => parser.rule[key], n => {
                //todo 检查所以配置的回调逻辑
                this.watching = true;
                if (key === 'hidden')
                    parser.updateKey(true);
                else if (key === 'link')
                    parser._link();
                else if (key === 'validate')
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
    //todo 检查复用排序错误问题
    refreshControl(parser) {
        return parser.input && parser.rule.control && this.useCtrl(parser);
    },
    useCtrl(parser) {
        const controls = getControl(parser), validate = [], api = this.api;
        if (!controls.length) return false;

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

        validate.reverse().forEach(({valid, rule, prepend, append, child, ctrl}) => {
            if (valid) {
                const ruleCon = {
                    type: 'fcFragment',
                    native: true,
                    children: rule,
                }
                Object.defineProperty(ruleCon, '__ctrl', enumerable(true))
                parser.ctrlRule.push(ruleCon);
                this.bus.$once('beforeLoad', () => {
                    this.cycleLoad = true;
                    if (prepend) {
                        api.prepend(ruleCon, prepend, child)
                    } else if (append) {
                        api.append(ruleCon, append, child)
                    } else {
                        parser.root.splice(parser.root.indexOf(parser.origin) + 1, 0, ruleCon);
                    }
                });
            } else {
                parser.ctrlRule.splice(parser.ctrlRule.indexOf(ctrl), 1);
                const ctrlParser = byParser(ctrl);
                if (ctrlParser) {
                    ctrlParser._remove();
                }
            }
        });
        this.vm.$emit('control', parser.rule.__origin__, this.api);
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
    rmParser(parser, flag) {
        if (parser.deleted) return;
        const {id, field, name} = parser;
        // console.warn(parser);
        if (parser.input) {
            Object.defineProperty(parser.rule, 'value', {
                value: parser.rule.value
            });
        }

        if (is.trueArray(parser.rule.children)) {
            parser.rule.children.forEach(h => h.__fc__ && this.rmParser(h.__fc__, true));
        }

        $del(this.parsers, id);
        $del(this.validate, field);
        $del(this.formData, field);
        $del(this.fieldList, field);
        $del(this.$render.renderList, id);
        $del(this.customData, name);
        $del(this.subForm, field);

        const index = this.sortList.indexOf(id);
        if (index > -1) {
            this.sortList.splice(index, 1);
        }

        parser._delete();
        if (!flag) this.$render.initOrgChildren();
        return parser;
    },
    //todo 检查调用,考虑是否用 nextLoad 代替
    //todo 主动联动,目前是被动联动
    //todo created 赋值优化,目前赋值无效
    //todo 区分规则拷贝和合并
    //todo 组件生成全部通过 alias
    //todo value.sync 同步
    //todo refresh 作用于为 rule
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
        console.warn('%c reload', 'color:red');
        if (!rules) rules = this.rules;

        const parsers = {...this.parsers};

        this.clearNextTick();
        this.$render.clearOrgChildren();
        this.initData(rules);
        this.loadRule();

        Object.keys(parsers).filter(id => this.parsers[id] === undefined)
            .forEach(id => this.rmParser(parsers[id]));

        this.syncForm();

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

function useHelper(rule) {
    if (!Array.isArray(rule) || rule.findField) return;
    Object.defineProperties(rule, {
        findField: enumerable(findField),
        findName: enumerable(findName),
        setValue: enumerable(setValue),
    })
}

function find(field, name, origin) {
    if (!this.length) return;
    let children = [];
    for (let i = 0; i < this.length; i++) {
        if (!is.Object(this[i])) continue;
        let rule = getRule(this[i]);
        if (rule[name] === field) return origin ? rule : this[i];
        if (is.trueArray(rule.children)) children = children.concat(rule.children);
        is.trueArray(rule.control) && rule.control.forEach(r => {
            children = children.concat(r.rule);
        })
    }
    return find.call(children, field, name, origin);
}

function findField(field) {
    return find.call(this, field, 'field');
}

function findName(field) {
    return find.call(this, field, 'name');
}

function setValue(formData) {
    Object.keys(formData).forEach(field => {
        const rule = find.call(this, field, 'field', true);
        if (rule) rule.value = formData[field];
    });
}
