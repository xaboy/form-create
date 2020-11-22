import extend from '@form-create/utils/lib/extend';
import {$set} from '@form-create/utils/lib';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';

export default function useInput(Handler) {
    extend(Handler.prototype, {
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
            this.effect(parser, 'value');
        },
        onInput(parser, value) {
            let val;
            if (parser.input && (this.isQuote(parser, val = parser.toValue(value)) || this.isChange(parser, val))) {
                this.setValue(parser, val, value);
            }
        },
        setFormData(parser, value) {
            $set(this.formData, parser.field, value);
        },
        getFormData(parser) {
            return this.formData[parser.field];
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
        appendValue(rule) {
            if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
            rule.value = this.appendData[rule.field];
            delete this.appendData[rule.field];
        },
        addSubForm(parser, subForm) {
            this.subForm[parser.field] = subForm;
        },
        syncValue() {
            this.vm && this.vm._updateValue(this.form);
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
        fields() {
            return Object.keys(this.formData);
        },
    });
}
