import extend from '@form-create/utils/lib/extend';
import {$set} from '@form-create/utils/lib/modify';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';
import toArray from '@form-create/utils/lib/toarray';

export default function useInput(Handler) {
    extend(Handler.prototype, {
        getValue(ctx) {
            if (is.Undef(ctx.cacheValue)) {
                ctx.cacheValue = ctx.parser.toValue(this.getFormData(ctx), ctx);
            }
            return ctx.cacheValue;
        },
        setValue(ctx, value, formValue, setFlag) {
            if (ctx.deleted) return;
            ctx.cacheValue = value;
            this.changeStatus = true;
            this.nextRefresh();
            this.$render.clearCache(ctx);
            this.setFormData(ctx, formValue);
            this.syncValue();
            this.valueChange(ctx, value);
            this.vm.$emit('change', ctx.field, value, ctx.origin, this.api, setFlag || false);
            this.effect(ctx, 'value');
        },
        onInput(ctx, value) {
            let val;
            if (ctx.input && (this.isQuote(ctx, val = ctx.parser.toValue(value, ctx)) || this.isChange(ctx, val))) {
                this.setValue(ctx, val, value);
            }
        },
        setFormData(ctx, value) {
            $set(this.formData, ctx.id, value === null ? undefined : value);
        },
        getFormData(ctx) {
            return this.formData[ctx.id];
        },
        validate() {
            toEmpty(this.vm.validate);
            this.fields().forEach(id => {
                this.fieldCtx[id].forEach(ctx => {
                    this.vm.validate[ctx.id] = toArray(ctx.rule.validate);
                });
            });
            return this.vm.validate;
        },
        syncForm() {
            toEmpty(this.form);
            Object.defineProperties(this.form, this.fields().reduce((initial, field) => {
                const ctx = this.getFieldCtx(field);
                const handle = this.valueHandle(ctx);
                handle.configurable = true;
                initial[field] = handle;
                return initial;
            }, this.options.appendValue ? Object.keys(this.appendData).reduce((initial, field) => {
                initial[field] = {
                    enumerable: true,
                    configurable: true,
                    get: () => {
                        return this.appendData[field];
                    },
                    set: (val) => {
                        this.appendData[field] = val;
                    }
                }
                return initial;
            }, {}) : {}));
            this.syncValue();
        },
        valueHandle(ctx) {
            return {
                enumerable: true,
                get: () => {
                    return this.getValue(ctx);
                },
                set: (value) => {
                    if (this.isChange(ctx, value)) {
                        this.setValue(ctx, value, ctx.parser.toFormValue(value, ctx), true);
                    }
                }
            };
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
            this.vm._updateValue({...(this.options.appendValue ? this.appendData : {}), ...this.form});
        },
        isChange(ctx, value) {
            return JSON.stringify(ctx.rule.value, strFn) !== JSON.stringify(value === null ? undefined : value, strFn);
        },
        isQuote(ctx, value) {
            return (is.Object(value) || Array.isArray(value)) && value === ctx.rule.value;
        },
        refreshUpdate(ctx, val, origin) {
            if (is.Function(ctx.rule.update)) {
                const state = invoke(() => ctx.rule.update(val, ctx.origin, this.api, {origin: origin || 'change'}));
                if (state === undefined) return;
                ctx.rule.hidden = state === true;
            }
        },
        valueChange(ctx, val) {
            this.refreshRule(ctx, val);
            this.bus.$emit('change-' + ctx.field, val);
        },
        refreshRule(ctx, val, origin) {
            if (this.refreshControl(ctx)) {
                this.$render.clearCacheAll();
                this.loadRule();
                this.vm.$emit('update', this.api);
                this.refresh();
            }
            this.refreshUpdate(ctx, val, origin);
        },
        appendLink(ctx) {
            const link = ctx.rule.link;
            is.trueArray(link) && link.forEach(field => {
                const fn = () => this.refreshRule(ctx, ctx.rule.value, 'link');

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

function toEmpty(obj) {
    Object.keys(obj).forEach(k => delete obj[k]);
}
