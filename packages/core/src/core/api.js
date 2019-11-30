import {$set, deepExtend, errMsg, isPlainObject} from '@form-create/utils';
import {toJson} from './util';

export default function baseApi(h) {

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(h.fieldList) : h.fields();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        formData() {
            const parsers = h.fieldList;

            return Object.keys(parsers).reduce((initial, id) => {
                const parser = parsers[id];
                initial[parser.field] = deepExtend({}, {value: parser.rule.value}).value;
                return initial;
            }, {});
        },
        getValue(field) {
            const parser = h.fieldList[field];
            if (!parser) return;
            return deepExtend({}, {value: parser.rule.value}).value;
        },
        setValue(field, value) {
            let formData = field;
            if (!isPlainObject(field))
                formData = {[field]: value};
            Object.keys(formData).forEach(key => {
                const parser = h.fieldList[key];
                if (!parser) return;
                parser.rule.value = formData[key];
            });
        },
        changeValue(field, value) {
            this.setValue(field, value);
        },
        changeField(field, value) {
            this.setValue(field, value);
        },
        removeField(field) {
            let parser = h.getParser(field);
            if (!parser)
                return;
            let fields = parser.root.map(rule => rule.__field__), index = fields.indexOf(field);
            if (index === -1)
                return;
            parser.root.splice(index, 1);
            if (h.sortList.indexOf(parser.id) === -1)
                this.reload();

            return parser.rule.__origin__;
        },
        destroy: () => {
            h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after, isChild) => {
            let fields = Object.keys(h.fieldList), index = h.sortList.length, rules = h.rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                    index = parser.rule.children.length;
                } else {
                    index = parser.root.indexOf(parser.rule.__origin__);
                }
            }
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, isChild) => {
            let fields = Object.keys(h.fieldList), index = 0, rules = h.rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                } else {
                    index = parser.root.indexOf(parser.rule.__origin__);
                }
            }
            rules.splice(index, 0, rule);
        },
        hidden(hidden, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;
                $set(parser.rule, 'hidden', !!hidden);
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        hiddenStatus(id) {
            const parser = h.getParser(id);
            if (!parser) return;
            return !!parser.rule.hidden;
        },
        visibility(visibility, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;
                $set(parser.rule, 'visibility', !!visibility);
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        visibilityStatus(id) {
            const parser = h.getParser(id);
            if (!parser) return;
            return !!parser.rule.visibility;
        },
        disabled(disabled, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'disabled', !!disabled);
            });
        },
        model() {
            return Object.keys(h.trueData).reduce((initial, key) => {
                initial[key] = h.trueData[key].rule;
                return initial;
            }, {});
        },
        component() {
            return Object.keys(h.customData).reduce((initial, key) => {
                initial[key] = h.customData[key].rule;
                return initial;
            }, {});
        },
        bind() {
            let bind = {}, properties = {};
            Object.keys(h.fieldList).forEach((field) => {
                const parser = h.fieldList[field];
                properties[field] = {
                    get() {
                        return parser.rule.value;
                    },
                    set(value) {
                        parser.rule.value = value;
                    },
                    enumerable: true,
                    configurable: true
                };
            });
            Object.defineProperties(bind, properties);
            return bind;
        },
        submitBtnProps: (props = {}) => {
            h.vm._buttonProps(props);
        },
        resetBtnProps: (props = {}) => {
            h.vm._resetProps(props);
        },
        set: (node, field, value) => {
            h.vm.$set(node, field, value);
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        updateOptions(options) {
            deepExtend(h.options, options);
            this.refresh(true);
        },
        onSubmit(fn) {
            this.options({onSubmit: fn});
        },
        sync: (field) => {
            const parser = h.getParser(field);
            if (parser) {
                h.$render.clearCache(parser, true);
                h.refresh();
            }
        },
        refresh: (clear) => {
            if (clear)
                h.$render.clearCacheAll();
            h.refresh();
        },
        hideForm: (isShow) => {
            h.vm.isShow = !isShow;
        },
        changeStatus: () => {
            return h.changeStatus;
        },
        clearChangeStatus: () => {
            h.changeStatus = false;
        },
        updateRule: (id, rule, cover) => {
            const parser = h.getParser(id);
            if (parser) {
                cover ? Object.keys(rule).forEach(key => {
                    parser.rule[key] = rule[key];
                }) : deepExtend(parser.rule, rule);
                return parser.rule.__origin__;
            }
        },
        getRule: (id) => {
            const parser = h.getParser(id);
            if (parser) {
                return parser.rule;
            }
        },
        updateRules(rules, cover) {
            Object.keys(rules).forEach(id => {
                this.updateRule(id, rules[id], cover);
            })
        },
        updateValidate(id, validate, merge) {
            const parser = h.getParser(id);
            if (parser) {
                parser.rule.validate = merge ? parser.rule.validate.concat(validate) : validate;
            }
        },
        updateValidates(validates, merge) {
            Object.keys(validates).forEach(id => {
                this.updateValidate(id, validates[id], merge);
            })
        },
        method(id, name) {
            const el = this.el(id);
            if (!el || !el[name])
                throw new Error('方法不存在' + errMsg());
            return (...args) => {
                el[name](args);
            }
        },
        toJson() {
            return toJson(this.rule);
        },
        on(...args) {
            h.vm.$on(...args);
        },
        once(...args) {
            h.vm.$once(...args);
        },
        off(...args) {
            h.vm.$off(...args);
        },
        trigger(id, event, ...args) {
            const el = this.el(id);
            el && el.$emit(event, ...args);
        },
        el(id) {
            const parser = h.getParser(id);
            if (parser) return parser.el;
        }
    };
}
