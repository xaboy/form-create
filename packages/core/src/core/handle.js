import {
    $del,
    $set, deepExtend,
    errMsg,
    extend,
    isString,
    isUndef,
    isValidChildren,
    isPlainObject,
    toLine,
    toString,
    uniqueId,
    isFunction
} from '@form-create/utils';
import BaseParser from '../factory/parser';
import Render from './render';


export function getRule(rule) {
    if (isFunction(rule.getRule))
        return rule.getRule();
    else
        return rule;
}

export default class Handle {

    constructor(fc) {
        const {vm, rules, options} = fc;

        this.vm = vm;
        this.fc = fc;
        this.id = uniqueId();
        this.options = options;

        this.validate = {};
        this.formData = {};

        this.fCreateApi = undefined;

        this.__init(rules);
        this.$form = new fc.drive.formRender(this, this.id);
        this.$render = new Render(this);

        this.loadRule(this.rules, false);

        this.$render.initOrgChildren();

        this.$form.init();
    }

    __init(rules) {
        this.fieldList = {};
        this.trueData = {};
        this.parsers = {};
        this.customData = {};
        this.sortList = [];
        this.rules = rules;
        this.origin = [...this.rules];
        this.changeStatus = false;
    }

    loadRule(rules, child) {
        rules.map((_rule) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error('未定义生成规则的 type 字段' + errMsg());

            let parser;

            if (_rule.__fc__) {
                parser = _rule.__fc__;

                if (parser.vm !== this.vm && !parser.deleted)
                    return console.error(`${_rule.type}规则正在其他的 <form-create> 中使用` + errMsg());
                parser.update(this);
            } else {
                parser = this.createParser(this.parseRule(_rule));
            }

            let children = parser.rule.children, rule = parser.rule;
            if (!this.notField(parser.field))
                return console.error(`${rule.field} 字段已存在` + errMsg());

            this.setParser(parser);

            if (!_rule.__fc__) {
                bindParser(_rule, parser);
            }
            if (isValidChildren(children)) {
                this.loadRule(children, true);
            }

            if (!child) {
                this.sortList.push(parser.id);
            }

            if (!this.isNoVal(parser))
                Object.defineProperty(parser.rule, 'value', {
                    get: () => {
                        return parser.toValue(this.getFormData(parser));
                    },
                    set: (value) => {
                        if (this.isChange(parser, value)) {
                            this.$render.clearCache(parser, true);
                            this.setFormData(parser, parser.toFormValue(value));
                        }
                    }
                });

            return parser;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });
    }

    createParser(rule) {
        const id = this.id + '' + uniqueId(), parsers = this.fc.parsers, type = toString(rule.type).toLocaleLowerCase();

        const Parser = (parsers[type]) ? parsers[type] : BaseParser;

        return new Parser(this, rule, id);
    }

    parseRule(_rule) {
        const def = defRule(), rule = getRule(_rule);
        Object.keys(def).forEach(k => {
            if (isUndef(rule[k])) $set(rule, k, def[k]);
        });
        const parseRule = {
            options: parseArray(rule.options)
        };

        parseRule.on = this.parseOn(rule.on || {}, this.parseEmit(rule));

        Object.keys(parseRule).forEach(k => {
            $set(rule, k, parseRule[k]);
        });

        return rule;
    }

    parseOn(on, emit) {
        if (this.options.injectEvent)
            Object.keys(on).forEach(k => {
                on[k] = this.inject(on[k])
            });
        return parseOn(on, emit);
    }

    inject(_fn, inject) {
        if (_fn.__inject)
            _fn = _fn.__origin;

        const h = this;

        const fn = function (...args) {
            const {option, rule} = h.vm.$options.propsData;
            args.unshift({
                $f: h.fCreateApi,
                rule,
                option,
                inject
            });
            _fn.apply(this, args);
        };
        fn.__inject = true;
        fn.__origin = _fn;
        return fn;
    }

    parseEmit(rule) {
        let event = {}, {emit, emitPrefix, field} = rule;

        if (!Array.isArray(emit)) return event;

        emit.forEach(config => {
            let inject = {}, eventName = config;
            if (isPlainObject(config)) {
                eventName = config.name;
                inject = config.inject || {};
            }
            if (!eventName) return;

            const emitKey = emitPrefix ? emitPrefix : field;
            const fieldKey = toLine(`${emitKey}-${eventName}`).replace('_', '-');

            const fn = (...arg) => {
                this.vm.$emit(fieldKey, ...arg);
            };
            fn.__emit = true;
            event[eventName] = (this.options.injectEvent || config.inject !== undefined) ? this.inject(fn, inject) : fn;
        });

        return event;
    }

    run() {
        if (this.vm.unique > 0)
            return this.$render.run();
        else {
            this.vm.unique = 1;
            return [];
        }
    }

    setParser(parser) {
        let {id, field, name, rule} = parser;
        if (this.parsers[id])
            return;
        this.parsers[id] = parser;

        if (this.isNoVal(parser)) {
            if (name)
                $set(this.customData, name, parser);
            return;
        }
        this.fieldList[field] = parser;
        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate || []);
        $set(this.trueData, field, parser);
    }

    notField(id) {
        return this.parsers[id] === undefined;
    }

    isChange(parser, value) {
        return JSON.stringify(parser.rule.value) !== JSON.stringify(value);
    }

    onInput(parser, value) {
        if (!this.isNoVal(parser) && this.isChange(parser, parser.toValue(value))) {
            this.$render.clearCache(parser);
            this.setFormData(parser, value);
            this.changeStatus = true;
        }
    }

    getParser(id) {
        if (this.fieldList[id])
            return this.fieldList[id];
        else if (this.customData[id])
            return this.customData[id];
        else if (this.parsers[id])
            return this.parsers[id];
    }

    created() {
        const vm = this.vm;

        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'formData', this.formData);


        if (this.fCreateApi === undefined)
            this.fCreateApi = this.fc.drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
    }


    addParserWitch(parser) {
        const vm = this.vm;

        Object.keys(parser.rule).forEach((key) => {
            if (['field', 'type', 'value', 'vm', 'template', 'name', 'config'].indexOf(key) !== -1 || parser.rule[key] === undefined) return;
            parser.watch.push(vm.$watch(() => parser.rule[key], (n, o) => {
                if (o === undefined) return;
                this.$render.clearCache(parser);
            }, {deep: true, immediate: true}));

        });
    }

    mountedParser() {
        const vm = this.vm;
        Object.keys(this.parsers).forEach((id) => {
            let parser = this.parsers[id];
            if (parser.watch.length === 0) this.addParserWitch(parser);

            parser.el = vm.$refs[parser.refName] || {};

            if (parser.defaultValue === undefined)
                parser.defaultValue = deepExtend({}, {value: parser.rule.value}).value;

            parser.mounted && parser.mounted();
        });
    }

    mounted() {
        const mounted = this.options.mounted;

        this.mountedParser();

        mounted && mounted(this.fCreateApi);
        this.fc.$emit('mounted', this.fCreateApi);
    }

    reload() {
        const onReload = this.options.onReload;

        this.mountedParser();

        onReload && onReload(this.fCreateApi);
        this.fc.$emit('on-reload', this.fCreateApi);
    }

    removeField(parser) {
        const {id, field} = parser, index = this.sortList.indexOf(id);

        delParser(parser);
        $del(this.parsers, id);

        if (index !== -1) {
            this.sortList.splice(index, 1);
        }

        if (!this.fieldList[field]) {
            $del(this.validate, field);
            $del(this.formData, field);
            $del(this.customData, field);
            $del(this.fieldList, field);
            $del(this.trueData, field);
        }
    }

    refresh() {
        this.vm._refresh();
    }

    reloadRule(rules) {
        const vm = this.vm;
        if (!rules) return this.reloadRule(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = [...rules];

        const parsers = {...this.parsers};
        this.__init(rules);
        this.loadRule(rules, false);
        Object.keys(parsers).filter(id => this.parsers[id] === undefined)
            .forEach(id => this.removeField(parsers[id]));
        this.$render.initOrgChildren();
        this.created();

        vm.$nextTick(() => {
            this.reload();
        });

        vm.$f = this.fCreateApi;
        this.$render.clearCacheAll();
        this.refresh();
    }

    setFormData(parser, value) {
        this.formData[parser.field] = value;
    }

    getFormData(parser) {
        return this.formData[parser.field];
    }

    fields() {
        return Object.keys(this.formData);
    }

    isNoVal(parser) {
        return !parser.isDef;
    }

}

export function delParser(parser) {
    parser.watch.forEach((unWatch) => unWatch());
    parser.watch = [];
    parser.deleted = true;
    Object.defineProperty(parser.rule, 'value', {
        value: extend({}, {value: parser.rule.value}).value
    });
}

function parseOn(on, emitEvent) {
    if (Object.keys(emitEvent).length > 0) extend(on, emitEvent);
    return on;
}

function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}


function defRule() {
    return {
        validate: [],
        col: {},
        emit: [],
        props: {},
        on: {},
        options: [],
        title: undefined,
        value: '',
        field: '',
        name: undefined,
        className: undefined
    };
}

function bindParser(rule, parser) {
    Object.defineProperties(rule, {
        __field__: {
            value: parser.field,
            enumerable: false,
            configurable: false
        },
        __fc__: {
            value: parser,
            enumerable: false,
            configurable: false
        }
    });
}