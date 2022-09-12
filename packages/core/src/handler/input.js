import extend from '@form-create/utils/lib/extend';
import {$set} from '@form-create/utils/lib/modify';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';
import {customRef, reactive, toRef} from 'vue';

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
        },
        onInput(ctx, value) {
            let val;
            if (ctx.input && (this.isQuote(ctx, val = ctx.parser.toValue(value, ctx)) || this.isChange(ctx, value))) {
                this.setValue(ctx, val, value);
            }
        },
        setFormData(ctx, value) {
            $set(this.formData, ctx.id, value);
        },
        getFormData(ctx) {
            return this.formData[ctx.id];
        },
        syncForm() {
            const data = reactive({});
            this.fields().reduce((initial, field) => {
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
                    this.syncValue();
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
        refreshUpdate(ctx, val) {
            if (is.Function(ctx.rule.update)) {
                const state = invoke(() => ctx.rule.update(val, ctx.origin, this.api));
                if (state === undefined) return;
                ctx.rule.hidden = state === true;
            }
        },
        valueChange(ctx, val) {
            this.refreshRule(ctx, val);
            this.bus.$emit('change-' + ctx.field, val);
        },
        refreshRule(ctx, val) {
            if (this.refreshControl(ctx)) {
                this.$render.clearCacheAll();
                this.loadRule();
                this.bus.$emit('update', this.api);
                this.refresh();
            }
            this.refreshUpdate(ctx, val);
        },
        appendLink(ctx) {
            const link = ctx.rule.link;
            is.trueArray(link) && link.forEach(field => {
                const fn = () => this.refreshRule(ctx, ctx.rule.value);

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
