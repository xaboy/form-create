import Api from '../frame/api';
import Render from '../render';
import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {byParser, copyRule, enumerable, funcProxy, getRule, invoke} from '../frame/util';
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
        pageEnd: true,
        nextReload: () => {
            this.lifecycle('reload');
        }
    });
    this.initData(fc.rules);

    funcProxy(this, {
        options() {
            return fc.options;
        },
        bus() {
            return fc.bus;
        },
    })

    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = Api(this);
    this.usePage();
    this.loadRule();
    this.init();
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
    usePage() {
        const page = this.options.page;
        if (!page) return;
        let first = 18;
        let limit = getLimit(this.rules);
        if (is.Object(page)) {
            if (page.first) first = parseInt(page.first, 10) || first;
            if (page.limit) limit = parseInt(page.limit, 10) || limit;
        }
        extend(this, {
            first,
            limit,
            pageEnd: this.rules.length <= first,
        })

        this.bus.$on('page-end', () => this.vm.$emit('page-end', this.api));
        this.pageLoad();
    },
    pageLoad() {
        this.api.nextTick(() => {
            if (this.pageEnd) {
                this.bus.$emit('page-end');
            } else {
                this.first += this.limit;
                this.pageEnd = this.rules.length <= this.first;
                this.loadRule();
                this.pageLoad();
                this.refresh();
            }
        });
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
        this.syncValue();
    },
    init() {
        const vm = this.vm;
        vm.$set(vm, 'formData', this.formData);
        vm.$f = this.api;
        vm.$emit('input', this.api);
        vm._updateValue(this.form);

        const f = this.fieldList;
        Object.keys(f).forEach(k => {
            const p = f[k];
            this.refreshUpdate(p, p.rule.value);
        })
    },
    isRepeatRule(rule) {
        return this.repeatRule.indexOf(rule) > -1;
    },
    loadRule() {
        console.warn('%c load', 'color:blue');
        this.cycleLoad = false;
        if (this.pageEnd) {
            this.bus.$emit('use-ctrl');
        }
        this._loadRule(this.rules);
        if (this.cycleLoad && this.pageEnd) {
            return this.loadRule();
        }
        this.vm._renderRule();
        this.$render.initOrgChildren();
        this.syncForm();
    },
    loadChildren(children, parent) {
        this.cycleLoad = false;
        this.bus.$emit('use-ctrl');
        this._loadRule(children, parent);
        if (this.cycleLoad) {
            return this.loadRule();
        }
        this.$render.clearCache(parent, true);
    },
    _loadRule(rules, parent) {

        const preIndex = (i) => {
            let pre = rules[i - 1];
            if (!pre || !pre.__fc__) {
                return i > 0 ? preIndex(i - 1) : -1;
            }
            let index = this.sortList.indexOf(pre.__fc__.id);
            return index > -1 ? index : preIndex(i - 1);
        }

        const loadChildren = (children, parser) => {
            if (is.trueArray(children)) {
                this._loadRule(children, parser);
            }
        };

        rules.map((_rule, index) => {
            if (parent && is.String(_rule)) return;
            if (!this.pageEnd && !parent && index >= this.first) return;

            if (!is.Object(_rule) || !getRule(_rule).type)
                return err('未定义生成规则的 type 字段', _rule);

            if (_rule.__fc__ && _rule.__fc__.root === rules && this.parsers[_rule.__fc__.id]) {
                loadChildren(_rule.__fc__.rule.children, _rule.__fc__);
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
                        rules[index] = _rule = _rule._clone ? _rule._clone() : copyRule(_rule);
                        parser = this.createParser(this.parseRule(_rule));
                    }
                }
                if (parser.originType !== parser.rule.type) {
                    parser = this.transformParser(parser.rule, parser);
                }
            } else {
                parser = this.createParser(this.parseRule(_rule));
            }
            this.appendValue(parser.rule);
            [false, true].forEach(b => this.parseEmit(parser, b));
            parser.parent = parent || null;
            parser.root = rules;
            this.setParser(parser);

            loadChildren(parser.rule.children, parser);

            if (!parent) {
                const _preIndex = preIndex(index);
                if (_preIndex > -1) {
                    this.sortList.splice(_preIndex + 1, 0, parser.id);
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
    transformParser(rule, parser) {
        const transform = this.createParser(rule);
        transform.id = parser.id;
        parser._delete();
        return transform;
    },
    valueHandle(parser) {
        return {
            enumerable: true,
            get: () => {
                return this.getValue(parser);
            },
            set: (value) => {
                if (this.isChange(parser, value)) {
                    this.setValue(parser, value, parser.toFormValue(value), true);
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

        ['on', 'props', 'nativeOn'].forEach(k => {
            this.parseInjectEvent(rule, rule[k] || {});
        })

        return rule;
    },
    parseInjectEvent(rule, on) {
        if (rule.inject === false) return;
        const inject = rule.inject || this.options.injectEvent;
        if (is.Undef(inject)) return;
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
            return _fn.apply(this, args);
        };
        fn.__inject = true;
        fn.__origin = _fn;
        return fn;
    },
    parseEmit(parser, on) {
        let event = {}, rule = parser.rule, {emitPrefix, field, name, inject} = rule;
        let emit = rule[on ? 'emit' : 'nativeEmit'] || [];
        if (is.trueArray(emit)) {
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
            this.bindNextTick(() => this.bus.$emit('next-tick', this.api));
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
    //todo control 添加到内部可能有问题
    refreshUpdate(parser, val) {
        const fn = parser.rule.update;
        if (is.Function(fn)) {
            const state = invoke(() => fn(val, parser.origin, this.api));
            if (state === undefined) return;
            parser.rule.hidden = state === true;
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
        this.refreshUpdate(parser, val);
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
        this.vm && this.vm._updateValue(this.form);
    },
    onInput(parser, value) {
        let val;
        if (parser.input && (this.isQuote(parser, val = parser.toValue(value)) || this.isChange(parser, val))) {
            this.setValue(parser, val, value);
        }
    },
    getValue(parser) {
        if (!hasProperty(parser, 'cacheValue')) {
            parser.cacheValue = parser.toValue(this.getFormData(parser));
        }
        return parser.cacheValue;
    },
    setValue(parser, value, formValue, setFlag) {
        parser.cacheValue = value;
        this.nextLoad();
        this.$render.clearCache(parser);
        this.setFormData(parser, formValue);
        this.changeStatus = true;
        this.valueChange(parser, value);
        this.syncValue();
        this.vm.$emit('change', parser.field, value, parser.origin, this.api, setFlag);
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
        const none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject'];
        Object.keys(parser.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
            parser.watch.push(vm.$watch(() => parser.rule[key], n => {
                this.watching = true;
                if (key === 'hidden')
                    parser.updateKey(true);
                else if (key === 'link')
                    parser._link();
                else if (key === 'validate') {
                    if (parser.input) {
                        this.validate[parser.field] = n || []
                    } else return;
                } else if (['props', 'on', 'nativeOn'].indexOf(key) > -1)
                    this.parseInjectEvent(parser.rule, n || {});
                else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                    this.parseEmit(parser, key === 'emit');
                else if (key === 'type')
                    return this.reloadRule();
                this.$render.clearCache(parser);
                this.watching = false;
            }, {deep: key !== 'children'}));
        });
    },
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
                valid: invoke(() => handleFn(parser.rule.value, api)),
                ctrl: findControl(parser, control.rule),
            };
            if ((data.valid && data.ctrl) || (!data.valid && !data.ctrl)) continue;
            validate.push(data);
        }
        if (!validate.length) return false;

        let flag = false;
        validate.reverse().forEach(({valid, rule, prepend, append, child, ctrl}) => {
            if (valid) {
                flag = true;
                const ruleCon = {
                    type: 'fcFragment',
                    native: true,
                    __ctrl: true,
                    children: rule,
                }
                parser.ctrlRule.push(ruleCon);
                this.bus.$once('use-ctrl', () => {
                    // this.cycleLoad = true;
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
        this.vm.$emit('control', parser.origin, this.api);
        return flag;
    },
    mounted() {
        const _mounted = () => {
            this.isMounted = true;
            this.lifecycle('mounted');
        }
        if (this.pageEnd) {
            _mounted();
        } else {
            this.bus.$on('page-end', _mounted);
        }
    },
    lifecycle(name) {
        const fn = this.options[name];
        is.Function(fn) && invoke(() => fn(this.api));
        this.vm.$emit(name, this.api);
    },
    rmParser(parser, reloadFlag) {
        this._rmParser(parser);
        if (!reloadFlag) {
            this.$render.initOrgChildren();
            this.syncValue();
        }
    },
    _rmParser(parser) {
        if (parser.deleted) return;
        const {id, field, name} = parser;
        // console.warn(parser);
        if (parser.input) {
            Object.defineProperty(parser.rule, 'value', {
                value: parser.rule.value,
                writable: true
            });
        }

        if (is.trueArray(parser.rule.children)) {
            parser.rule.children.forEach(h => h.__fc__ && this._rmParser(h.__fc__));
        }

        $del(this.parsers, id);
        $del(this.validate, field);
        $del(this.formData, field);
        $del(this.form, field);
        $del(this.fieldList, field);
        $del(this.$render.renderList, id);
        $del(this.customData, name);
        $del(this.subForm, field);
        $del(parser, 'cacheValue');

        const index = this.sortList.indexOf(id);
        if (index > -1) {
            this.sortList.splice(index, 1);
        }

        parser._delete(true);
        return parser;
    },
    //todo 组件生成全部通过 alias
    //todo 优化 mergeProp update
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
            .forEach(id => this.rmParser(parsers[id], true));

        this.$render.clearCacheAll();
        this.refresh();

        this.bus.$off('next-tick', this.nextReload);
        this.bus.$once('next-tick', this.nextReload);
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

function useHelper(rules) {
    if (!Array.isArray(rules) || rules.findField) return;
    Object.defineProperties(rules, {
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

function getLimit(rules) {
    return rules.length < 31 ? 31 : Math.ceil(rules.length / 3);
}
