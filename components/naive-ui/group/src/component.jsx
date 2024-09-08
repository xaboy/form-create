import {hasProperty} from '@form-create/utils/lib/type';
import {defineComponent, markRaw, nextTick, watch} from 'vue';
import deepExtend, {deepCopy} from '@form-create/utils/lib/deepextend';
import extend from '@form-create/utils/lib/extend';
import './style.css';

const NAME = 'fcGroup';


export default defineComponent({
    name: NAME,
    props: {
        field: String,
        rule: Array,
        expand: Number,
        options: Object,
        button: {
            type: Boolean,
            default: true
        },
        max: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        modelValue: {
            type: Array,
            default: () => []
        },
        defaultValue: Object,
        sortBtn: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
        },
        onBeforeRemove: {
            type: Function,
            default: () => {
            }
        },
        onBeforeAdd: {
            type: Function,
            default: () => {
            }
        },
        formCreateInject: Object,
        parse: Function,
    },
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
            sort: [],
            form: markRaw(this.formCreateInject.form.$form())
        }
    },
    emits: ['update:modelValue', 'change', 'itemMounted', 'remove', 'add'],
    watch: {
        rule: {
            handler(n, o) {
                Object.keys(this.cacheRule).forEach(v => {
                    const item = this.cacheRule[v];
                    if (item.$f) {
                        const val = item.$f.formData();
                        if (n === o) {
                            item.$f.deferSyncValue(() => {
                                deepExtend(item.rule, n);
                                item.$f.setValue(val);
                            }, true);
                        } else {
                            const val = item.$f.formData();
                            item.$f.once('reloading', () => {
                                item.$f.setValue(val);
                            })
                            item.rule = deepCopy(n);
                        }
                    }
                })
            },
            deep: true
        },
        expand(n) {
            let d = n - this.modelValue.length;
            if (d > 0) {
                this.expandRule(d);
            }
        },
        modelValue: {
            handler(n) {
                n = n || [];
                let keys = this.sort, total = keys.length, len = total - n.length;
                if (len < 0) {
                    for (let i = len; i < 0; i++) {
                        this.addRule(n.length + i, true);
                    }
                    for (let i = 0; i < total; i++) {
                        this.setValue(keys[i], n[i]);
                    }
                } else {
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            this.removeRule(keys[total - i - 1]);
                        }
                    }
                    n.forEach((val, i) => {
                        this.setValue(keys[i], n[i]);
                    });
                }
            },
            deep: true,
        }
    },
    methods: {
        _value(v) {
            return (v && hasProperty(v, this.field)) ? v[this.field] : v;
        },
        cache(k, val) {
            this.cacheValue[k] = JSON.stringify(val);
        },
        input(value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        formData(key, formData) {
            const cacheRule = this.cacheRule;
            const keys = this.sort;
            if (keys.filter(k => cacheRule[k].$f).length !== keys.length) {
                return;
            }
            const value = keys.map(k => {
                const data = key === k ? formData : {...this.cacheRule[k].$f.form};
                const value = this.field ? data[this.field] || null : data;
                this.cache(k, value);
                return value;
            });
            this.input(value);
        },
        setValue(key, value) {
            const field = this.field
            if (field) {
                value = {[field]: this._value(value)};
            }
            if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
                return;
            }
            this.cache(key, value);
        },
        addRule(i, emit) {
            const rule = this.formCreateInject.form.copyRules(this.rule || []);
            const options = this.options ? {...this.options} : {
                submitBtn: false,
                resetBtn: false,
            };
            if (this.defaultValue) {
                if (!options.formData) options.formData = {};
                const defVal = deepCopy(this.defaultValue);
                extend(options.formData, this.field ? {[this.field]: defVal} : defVal);
            }
            this.parse && this.parse({rule, options, index: this.sort.length});
            this.cacheRule[++this.len] = {rule, options};
            if (emit) {
                nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            nextTick(() => {
                this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            delete this.cacheRule[key];
            delete this.cacheValue[key];
            if (emit) {
                nextTick(() => this.$emit('remove', index));
            }
        },
        add(i) {
            if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
                return;
            }
            const value = [...this.modelValue];
            value.push(this.defaultValue ? deepCopy(this.defaultValue) : (this.field ? null : {}));
            this.input(value);
        },
        del(index, key) {
            if (this.disabled || false === this.onBeforeRemove(this.modelValue, index)) {
                return;
            }
            this.removeRule(key, true);
            const value = [...this.modelValue];
            value.splice(index, 1);
            this.input(value);
        },
        addIcon(key) {
            return <div class="_fc-group-btn _fc-group-plus-minus" onClick={this.add}></div>;
        },
        delIcon(index, key) {
            return <div class="_fc-group-btn _fc-group-plus-minus _fc-group-minus"
                onClick={() => this.del(index, key)}></div>
        },
        sortUpIcon(index) {
            return <div class="_fc-group-btn _fc-group-arrow _fc-group-up"
                onClick={() => this.changeSort(index, -1)}></div>
        },
        sortDownIcon(index) {
            return <div class="_fc-group-btn _fc-group-arrow _fc-group-down"
                onClick={() => this.changeSort(index, 1)}></div>
        },
        changeSort(index, sort) {
            const a = this.sort[index];
            this.sort[index] = this.sort[index + sort];
            this.sort[index + sort] = a;
            this.formCreateInject.subForm(this.sort.map(k=>{
                return this.cacheRule[k].$f;
            }));
            this.formData(0);
        },
        makeIcon(total, index, key) {
            if (this.$slots.button) {
                return this.$slots.button({
                    total,
                    index,
                    vm: this,
                    key,
                    del: () => this.del(index, key),
                    add: this.add
                });
            }
            const btn = [];
            if ((!this.max || total < this.max) && total === index + 1) {
                btn.push(this.addIcon(key));
            }
            if (total > this.min) {
                btn.push(this.delIcon(index, key));
            }
            if (this.sortBtn && index) {
                btn.push(this.sortUpIcon(index));
            }
            if (this.sortBtn && index !== total - 1) {
                btn.push(this.sortDownIcon(index));
            }
            return btn;
        },
        emitEvent(name, args, index, key) {
            this.$emit(name, ...args, this.cacheRule[key].$f, index);
        },
        expandRule(n) {
            for (let i = 0; i < n; i++) {
                this.addRule(i);
            }
        }
    },
    created() {
        watch(() => ({...this.cacheRule}), (n) => {
            this.sort = Object.keys(n);
        }, {immediate: true})
        const d = (this.expand || 0) - this.modelValue.length;
        for (let i = 0; i < this.modelValue.length; i++) {
            this.addRule(i);
        }
        if (d > 0) {
            this.expandRule(d);
        }
    },
    render() {
        const keys = this.sort;
        const button = this.button;
        const Type = this.form;
        const disabled = this.disabled;

        const children = keys.length === 0 ?
            (this.$slots.default ? (this.$slots.default({
                vm: this,
                add: this.add
            })) : <div key={'a_def'} class="_fc-group-plus-minus _fc-group-add fc-clock"
                onClick={this.add}/>) : keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                const btn = button && !disabled ? this.makeIcon(keys.length, index, key) : [];
                return <div class="_fc-group-container" key={key}>
                    <Type
                        key={key}
                        {...{
                            disabled,
                            'onUpdate:modelValue': (formData) => this.formData(key, formData),
                            'onEmit-event': (name, ...args) => this.emitEvent(name, args, index, key),
                            'onUpdate:api': ($f) => this.add$f(index, key, $f),
                            inFor: true,
                            modelValue: this.field ? {[this.field]: this._value(this.modelValue[index])} : this.modelValue[index],
                            rule,
                            option: options,
                            extendOption: true
                        }}
                    />
                    <div class="_fc-group-idx">{index + 1}</div>
                    {(btn.length) ? <div class="_fc-group-handle fc-clock">{btn}</div> : null}
                </div>
            });
        return <div key={'con'} class={'_fc-group ' + (disabled ? '_fc-group-disabled' : '')}>{children}</div>
    }
});
