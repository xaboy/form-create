import extend from '@form-create/utils/lib/extend';
import {$set} from '@form-create/utils/lib/modify';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';
import {reactive, toRef} from 'vue';

export default function useInput(Handler) {
    extend(Handler.prototype, {
        setValue(ctx, value, formValue, setFlag) {
            if (ctx.deleted) return;
            ctx.rule.value = value;
            this.changeStatus = true;
            this.nextRefresh();
            this.$render.clearCache(ctx);
            this.setFormData(ctx, formValue);
            this.syncValue();
            this.valueChange(ctx, value);
            this.vm.emit('change', ctx.field, value, ctx.origin, this.api, setFlag || false);
            this.effect(ctx, 'value');
            this.emitEvent('change', ctx.field, value, {
                rule: ctx.origin,
                api: this.api,
                setFlag: setFlag || false
            })
        },
        onInput(ctx, value) {
            let val;
            if (ctx.input && (this.isQuote(ctx, val = ctx.parser.toValue(value, ctx)) || this.isChange(ctx, value))) {
                this.setValue(ctx, val, value);
            }
        },
        onUpdateValue(ctx, data) {
            this.deferSyncValue(() => {
                const group = ctx.getParentGroup();
                const subForm = group ? this.subRuleData[group.id] : null;
                const subData = {};
                Object.keys(data || {}).forEach(k => {
                    if (subForm && hasProperty(subForm, k)) {
                        subData[k] = data[k];
                    } else if (hasProperty(this.api.form, k)) {
                        this.api.form[k] = data[k];
                    } else if (this.api.top !== this.api && hasProperty(this.api.top.form, k)) {
                        this.api.top.form[k] = data[k];
                    }
                });
                if (Object.keys(subData).length) {
                    this.api.setChildrenFormData(group.rule, subData);
                }
            })
        },
        onBaseInput(ctx, value) {
            this.setFormData(ctx, value);
            ctx.modelValue = value;
            this.nextRefresh();
            this.$render.clearCache(ctx);
        },
        setFormData(ctx, value) {
            ctx.modelValue = value;
            const group = ctx.getParentGroup();
            if (group) {
                if (!this.subRuleData[group.id]) {
                    this.subRuleData[group.id] = {};
                }
                this.subRuleData[group.id][ctx.field] = ctx.rule.value;
            }
            $set(this.formData, ctx.id, value);
        },
        rmSubRuleData(ctx) {
            const group = ctx.getParentGroup();
            if (group && this.subRuleData[group.id]) {
                delete this.subRuleData[group.id][ctx.field];
            }
        },
        getFormData(ctx) {
            return this.formData[ctx.id];
        },
        syncForm() {
            const data = reactive({});
            const fields = this.fields();
            if (this.options.appendValue !== false) {
                Object.keys(this.appendData).reduce((initial, field) => {
                    if (fields.indexOf(field) === -1) {
                        initial[field] = toRef(this.appendData, field);
                    }
                    return initial;
                }, data);
            }
            fields.reduce((initial, field) => {
                const ctx = this.getCtx(field);
                initial[field] = toRef(ctx.rule, 'value');
                return initial;
            }, data);
            this.form = data;
            this.syncValue();
        },
        appendValue(rule) {
            if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
            rule.value = this.appendData[rule.field];
            delete this.appendData[rule.field];
        },
        addSubForm(ctx, subForm) {
            this.subForm[ctx.id] = subForm;
        },
        deferSyncValue(fn, sync) {
            if (!this.deferSyncFn) {
                this.deferSyncFn = fn;
            }
            if (!this.deferSyncFn.sync) {
                this.deferSyncFn.sync = sync;
            }
            invoke(fn);
            if (this.deferSyncFn === fn) {
                this.deferSyncFn = null;
                if (fn.sync) {
                    this.syncForm();
                }
            }
        },
        syncValue() {
            if (this.deferSyncFn) {
                return this.deferSyncFn.sync = true;
            }
            this.vm.setupState.updateValue({...this.form});
        },
        isChange(ctx, value) {
            return JSON.stringify(this.getFormData(ctx), strFn) !== JSON.stringify(value, strFn);
        },
        isQuote(ctx, value) {
            return (is.Object(value) || Array.isArray(value)) && value === ctx.rule.value;
        },
        refreshUpdate(ctx, val, origin, field) {
            if (is.Function(ctx.rule.update)) {
                const state = invoke(() => ctx.rule.update(val, ctx.origin, this.api, {
                    origin: origin || 'change',
                    linkField: field
                }));
                if (state === undefined) return;
                ctx.rule.hidden = state === true;
            }
        },
        valueChange(ctx, val) {
            this.refreshRule(ctx, val);
            this.bus.$emit('change-' + ctx.field, val);
        },
        refreshRule(ctx, val, origin, field) {
            if (this.refreshControl(ctx)) {
                this.$render.clearCacheAll();
                this.loadRule();
                this.bus.$emit('update', this.api);
                this.refresh();
            }
            this.refreshUpdate(ctx, val, origin, field);
        },
        appendLink(ctx) {
            const link = ctx.rule.link;
            is.trueArray(link) && link.forEach(field => {
                const fn = () => this.refreshRule(ctx, ctx.rule.value, 'link', field);

                this.bus.$on('change-' + field, fn);
                ctx.linkOn.push(() => this.bus.$off('change-' + field, fn));
            });
        },
        fields() {
            return Object.keys(this.fieldCtx);
        },
    });
}

function strFn(key, val) {
    return typeof val === 'function' ? '' + val : val;
}
