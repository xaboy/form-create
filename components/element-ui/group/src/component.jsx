import {hasProperty} from '@form-create/utils/lib/type';
import {defineComponent} from 'vue';

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
    },
    inject: ['formCreateInject'],
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
        }
    },
    emits: ['update:modelValue', 'change', 'itemMounted', 'remove'],
    watch: {
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
                        this.addRule(n.length + i);
                    }
                    for (let i = 0; i < total; i++) {
                        this.setValue(keys[i], n[i]);
                    }
                } else {
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            this.removeRule(keys[total - i - 1]);
                        }
                        this.subForm();
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
            this.cacheRule[++this.len] = {rule, options};
            if (emit) {
                this.$nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            this.subForm();
            this.$nextTick(() => {
                if (this.syncDisabled) {
                    $f.disabled(this.disabled);
                }
                this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        subForm() {
            this.formCreateInject.subForm(Object.keys(this.cacheRule).map(k => this.cacheRule[k].$f));
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            delete this.cacheRule[key];
            delete this.cacheValue[key];
            if (emit) {
                this.$nextTick(() => this.$emit('remove', index));
            }
        },
        add() {
            if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
                return;
            }
            this.modelValue.push({});
            this.$emit('update:modelValue', this.modelValue);
        },
        del(index, key) {
            if (this.disabled || false === this.onBeforeRemove(this.modelValue)) {
                return;
            }
            this.removeRule(key, true);
            this.subForm();
            this.modelValue.splice(index, 1);
            this.input(this.modelValue);
        },
        addIcon(key) {
            return <i key={`a${key}`} class="el-icon-circle-plus-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer'};`}
                onClick={this.add}/>;
        },
        delIcon(index, key) {
            return <i key={`d${key}`} class="el-icon-remove-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266'};`}
                onClick={() => this.del(index, key)}/>;
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
            if (index >= this.min) {
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
        this._.appContext.components.FormCreate = this.formCreateInject.form.$form()
        const d = (this.expand || 0) - this.modelValue.length;
        if (d > 0) {
            this.expandRule(d);
        }
        for (let i = 0; i < this.modelValue.length; i++) {
            this.addRule(i);
        }
    },
    render() {
        const keys = Object.keys(this.cacheRule);
        const button = this.button;
        return keys.length === 0 ?
            (this.$slots.default ? (this.$slots.default({
                vm: this,
                add: this.add
            })) : <i key={'a_def'} class="el-icon-circle-plus-outline"
                style={`font-size:${this.fontSize}px;vertical-align:middle;color:${this.disabled ? '#c9cdd4;cursor: not-allowed' : '#606266;cursor:pointer'};`}
                onClick={this.add}/>) :
            <div key={'con'}>{keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                return <ElRow align="middle" type="flex" key={key}
                    style="border-bottom:1px dashed #DCDFE6;margin-bottom:10px;">
                    <ElCol span={button ? 20 : 24}><ElFormItem><FormCreate
                        key={key}
                        onUpdate:modelValue={(formData) => this.formData(key, formData)}
                        modelValue={this.field ? {[this.field]: this._value(this.modelValue[index])} : this.modelValue[index]}
                        onEmit-event={(name, ...args) => this.emitEvent(name, args, index, key)}
                        onUpdate:api={($f) => this.add$f(index, key, $f)}
                        rule={rule}
                        option={options} extendOption={true}/></ElFormItem></ElCol>
                    {button ? <ElCol span={2} pull={1} push={1}>{this.makeIcon(keys.length, index, key)}</ElCol> : null}
                </ElRow>
            })}</div>
    }
});
