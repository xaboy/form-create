import {hasProperty} from '@form-create/utils/lib/type';
import {defineComponent, markRaw, nextTick} from 'vue';
import IconCirclePlus from './IconCirclePlus.vue';
import IconRemove from './IconRemove.vue';
import deepExtend, {deepCopy} from '@form-create/utils/lib/deepextend';
import extend from '@form-create/utils/lib/extend';

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
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
        },
        fontSize: {
            type: Number,
            default: 28
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
    },
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
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
        disabled(n) {
            if (this.syncDisabled) {
                const lst = this.cacheRule;
                Object.keys(lst).forEach(k => {
                    lst[k].$f.disabled(n);
                })
            }
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
                let keys = Object.keys(this.cacheRule), total = keys.length, len = total - n.length;
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
            const keys = Object.keys(cacheRule);
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
            this.cacheRule[++this.len] = {rule, options};
            if (emit) {
                nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            this.formData(key, $f.formData());
            nextTick(() => {
                if (this.syncDisabled) {
                    $f.disabled(this.disabled);
                }
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
        add() {
            if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
                return;
            }
            this.modelValue.push(this.field ? null : {});
            this.$emit('update:modelValue', this.modelValue);
        },
        del(index, key) {
            if (this.disabled || false === this.onBeforeRemove(this.modelValue, index)) {
                return;
            }
            this.removeRule(key, true);
            this.modelValue.splice(index, 1);
            this.input(this.modelValue);
        },
        addIcon(key) {
            return <ElIcon key={`a${key}`}
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer'};`}
                onClick={this.add}>
                <IconCirclePlus/>
            </ElIcon>
        },
        delIcon(index, key) {
            return <ElIcon key={`d${key}`} class="el-icon-remove-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266'};`}
                onClick={() => this.del(index, key)}>
                <IconRemove/>
            </ElIcon>
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
            if (index === 0) {
                return [(this.max !== 0 && total >= this.max) ? null : this.addIcon(key), (this.min === 0 || total > this.min) ? this.delIcon(index, key) : null];
            }
            if (total > this.min) {
                return this.delIcon(index, key);
            }
        },
        emitEvent(name, args, index, key) {
            this.$emit(name, ...args, this.cacheRule[key].$f, index);
        },
        expandRule(n) {
            for (let i = 0; i < n; i++) {
                this.modelValue.push(this.field ? null : {});
            }
        }
    },
    created() {
        const d = (this.expand || 0) - this.modelValue.length;
        for (let i = 0; i < this.modelValue.length; i++) {
            this.addRule(i);
        }
        if (d > 0) {
            this.expandRule(d);
        }
    },
    render() {
        const keys = Object.keys(this.cacheRule);
        const button = this.button;
        const Type = this.form;
        return keys.length === 0 ?
            (this.$slots.default ? (this.$slots.default({
                vm: this,
                add: this.add
            })) : <ElIcon key={1}
                style={`font-size:${this.fontSize}px;vertical-align:middle;color:${this.disabled ? '#c9cdd4;cursor: not-allowed' : '#606266;cursor:pointer'};`}
                onClick={this.add}>
                <IconCirclePlus/>
            </ElIcon>) :
            <div style="width: 100%;" key={2}>{keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                return <ElRow align="middle" key={key}
                    style="border-bottom:1px dashed #DCDFE6;margin-bottom:10px;">
                    <ElCol span={button ? 20 : 24}><Type
                        key={key} inFor={true}
                        onUpdate:modelValue={(formData) => this.formData(key, formData)}
                        modelValue={this.field ? {[this.field]: this._value(this.modelValue[index])} : this.modelValue[index]}
                        onEmit-event={(name, ...args) => this.emitEvent(name, args, index, key)}
                        onUpdate:api={($f) => this.add$f(index, key, $f)}
                        rule={rule}
                        option={options} extendOption={true}/></ElCol>
                    {button ? <ElCol span={2} pull={1} push={1}>{this.makeIcon(keys.length, index, key)}</ElCol> : null}
                </ElRow>
            })}</div>
    }
});
