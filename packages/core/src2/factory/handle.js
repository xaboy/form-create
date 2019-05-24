import {
    $del,
    $nt,
    $set, deepExtend,
    errMsg,
    extend,
    isNumeric,
    isString,
    isUndef,
    isValidChildren,
    toLine,
    uniqueId
} from '@form-create/utils';
import {getRule} from '../utils';
import FormItem from './formItem';


export default class Handle {

    constructor(fc) {
        const {vm, rules, options, drive, drive: {components, FormRender}} = fc;

        this.rules = rules;
        this.vm = vm;
        this.fc = fc;
        this.components = components;
        this.id = uniqueId();
        this.formRefName = 'fc_' + this.id;
        this.options = options;
        this.drive = drive;

        this.parsers = {};
        this.validate = {};
        this.formData = {};
        this.trueData = {};
        this.customData = {};
        this.fieldList = [];
        this.fCreateApi = undefined;

        this.loadRule(this.rules, false);

        this.render = new FormRender(this);
        this.origin = [...this.rules];
    }

    loadRule(rules, child) {
        rules.map((_rule) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error('未定义生成规则的 type 字段' + errMsg());

            let rule = getRule(_rule), parser;

            if (_rule.__fc__) {
                parser = _rule.__fc__;

            } else {
                parser = this.getComponent(this.parseRule(rule));
            }

            let children = parser.rule.children;
            if (!this.notField(parser.field))
                return console.error(`${rule.field} 字段已存在` + errMsg());

            this.setParser(parser);

            if (!_rule.__handler__) {
                bindParser(_rule, parser);
            }
            if (isValidChildren(children)) {
                this.loadRule(children, true);
            }

            if (!child) {
                this.fieldList.push(parser.field);
            }
            return parser;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });
    }

    getComponent(rule) {
        const id = this.id + '' + uniqueId();
        if (this.components[rule.field])
            return new this.components[rule.field](rule, id, false);
        else
            return new FormItem(rule, id, true);
    }

    parseRule(_rule, vm, noVal) {
        const def = defRule(), rule = getRule(_rule);
        Object.keys(def).forEach(k => {
            if (isUndef(rule[k])) $set(rule, k, def[k]);
        });
        const parseRule = {
            col: parseCol(rule.col),
            props: parseProps(rule.props),
            validate: parseArray(rule.validate),
            options: parseArray(rule.options)
        };

        parseRule.on = parseOn(rule.on, this.parseEmit(rule));

        Object.keys(parseRule).forEach(k => {
            $set(rule, k, parseRule[k]);
        });

        if (!rule.field && !noVal) {
            console.error('规则的 field 字段不能空' + errMsg());
        }

        return rule;
    }

    parseEmit(rule) {
        let event = {}, {emit, emitPrefix, field} = rule;

        if (!Array.isArray(emit)) return event;

        emit.forEach(eventName => {
            const emitKey = emitPrefix ? emitPrefix : field;
            const fieldKey = toLine(`${emitKey}-${eventName}`).replace('_', '-');

            event[eventName] = (...arg) => {
                this.vm.$emit(fieldKey, ...arg);
            };
        });

        return event;
    }


    setParser(parser) {
        let {field, isDef, rule, noValue, value} = parser;
        this.parsers[field] = parser;

        if (noValue === true) {
            if (isDef === true) $set(this.customData, field, rule);
            return;
        }

        $set(this.formData, field, parser.toFormValue(value));
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, rule);
    }

    notField(field) {
        return this.parsers[field] === undefined;
    }

    boot() {
        const vm = this.vm;
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.customData);

        if (this.fCreateApi === undefined) this.fCreateApi = this.drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
    }


    addParserWitch(parser) {
        if (parser.noValue === true) return;
        let field = parser.field, vm = this.vm;

        let unWatch = vm.$watch(() => vm.cptData[field], (n) => {

            if (this.handlers[field] === undefined)
                return delParser(parser);

            let trueValue = parser.toValue(n), json = JSON.stringify(trueValue);
            if (vm._change(field, json)) {
                parser.setValue(trueValue);
                parser.watchFormValue(n);
            }
        }, {deep: true});
        let unWatch2 = vm.$watch(() => vm.trueData[field].value, (n) => {
            if (n === undefined) return;
            if (this.parsers[field] === undefined) return delParser(parser);
            let json = JSON.stringify(n);
            if (vm._change(field, json)) {
                parser.watchValue(n);
                $nt(() => parser.render.sync());
            }
        }, {deep: true});

        parser.watch.push(unWatch, unWatch2);

        const bind = () => {
            if (this.parsers[field] === undefined)
                delParser(parser);
            else
                this.$tick(() => parser.render.sync());
        };

        Object.keys(vm._trueData(field)).forEach((key) => {
            if (key === 'value') return;
            parser.watch.push(vm.$watch(() => vm.trueData[field][key], bind, {deep: true}));
        });
    }

    mountedParser() {
        const vm = this.vm;
        Object.keys(this.parsers).forEach((field) => {
            let parser = this.parsers[field];
            if (parser.watch.length === 0) this.addParserWitch(parser);

            parser.el = vm.$refs[this.refName] || {};

            if (parser.defaultValue === undefined)
                parser.defaultValue = deepExtend({}, {value: this.rule.value}).value;

            parser.mounted(vm);
        });
    }

    defJsonData() {
        const vm = this.vm;
        Object.keys(vm.cptData).forEach(field => {
            //TODO 与 defaultValue 合并
            const value = this.parsers[field].toValue(vm.cptData[field]);
            vm.jsonData[field] = JSON.stringify(value);
            vm._changeValue(field, value);
        });
    }

    mounted() {
        const mounted = this.options.mounted;

        this.mountedParser(this.parsers);

        this.defJsonData();

        mounted && mounted(this.fCreateApi);
        this.fc.$emit('mounted', this.fCreateApi);
    }

    reload() {
        const onReload = this.options.onReload;

        onReload && onReload(this.fCreateApi);
        this.fc.$emit('reload', this.fCreateApi);
    }

    removeField(field) {
        if (this.parsers[field] === undefined) return;
        const index = this.fieldList.indexOf(field);

        delParser(this.parsers[field]);
        $del(this.parsers, field);
        $del(this.validate, field);

        if (index !== -1) {
            this.fieldList.splice(index, 1);
        }

        this.vm._removeField(field);
    }

    getFormRef() {
        return this.vm.$refs[this.formRefName];
    }

    reloadRule(rules) {
        const vm = this.vm;
        if (!rules) return this.reloadRule(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = [...rules];

        Object.keys(this.parsers).forEach(field => this.removeField(field));

        this.loadRule(rules, false);
        this.boot();
        vm.__init();

        $nt(() => {
            this.reload();
        });

        vm.$f = this.fCreateApi;
    }

}

export function delParser(parser) {
    parser.watch.forEach((unWatch) => unWatch());
    parser.watch = [];
    parser.deleted = true;
}

function parseOn(on, emitEvent) {
    if (Object.keys(emitEvent).length > 0) extend(on, emitEvent);
    return on;
}

function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function parseProps(props) {
    if (isUndef(props.hidden)) $set(props, 'hidden', false);
    if (isUndef(props.visibility)) $set(props, 'visibility', false);

    return props;
}

function parseCol(col) {
    if (isNumeric(col)) {
        return {span: col};
    } else if (col.span === undefined) $set(col, 'span', 24);

    return col;
}


function defRule() {
    return {
        validate: [],
        col: {},
        emit: [],
        props: {},
        on: {},
        options: [],
        title: '',
        value: '',
        field: '',
        className: ''
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