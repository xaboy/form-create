import {
    defineComponent,
    getCurrentInstance,
    inject,
    markRaw,
    onBeforeUnmount,
    onMounted,
    onUpdated,
    provide,
    reactive,
    toRefs,
    watch
} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'FormCreate';

const getRuleInject = (vm, parent) => {
    if (!vm || vm === parent) {
        return;
    }
    if (vm.props.formCreateInject) {
        return vm.props.formCreateInject
    }
    if (vm.parent) {
        return getRuleInject(vm.parent, parent);
    }
}

export default function $FormCreate(FormCreate, components, directives) {
    return defineComponent({
        name: NAME,
        components,
        directives,
        props: {
            rule: {
                type: Array,
                required: true,
                default: () => []
            },
            option: {
                type: Object,
                default: () => ({})
            },
            extendOption: Boolean,
            modelValue: Object,
            api: Object,
            name: String,
            subForm: {
                type: Boolean,
                default: true
            },
            inFor: Boolean,
        },
        emits: ['update:api', 'update:modelValue', 'mounted', 'submit', 'change', 'emit-event', 'control', 'remove-rule', 'remove-field', 'sync', 'reload', 'repeat-field', 'update', 'validate-field-fail', 'validate-fail'],
        render() {
            return this.fc.render();
        },
        setup(props) {
            const vm = getCurrentInstance();
            provide('parentFC', vm);
            const parent = inject('parentFC', null);

            const {rule, modelValue, subForm, inFor} = toRefs(props);

            const data = reactive({
                ctxInject: {},
                destroyed: false,
                isShow: true,
                unique: 1,
                renderRule: [...rule.value || []],
                updateValue: JSON.stringify(modelValue || {})
            });

            const fc = new FormCreate(vm);
            const fapi = fc.api();

            const isMore = inFor.value;

            const addSubForm = () => {
                if (parent) {
                    const inject = getRuleInject(vm, parent);
                    if (inject) {
                        let sub;
                        if (isMore) {
                            sub = toArray(inject.getSubForm());
                            sub.push(fapi);

                        } else {
                            sub = fapi;
                        }
                        inject.subForm(sub);
                    }
                }
            };

            const rmSubForm = () => {
                const inject = getRuleInject(vm, parent);
                if (inject) {
                    if (isMore) {
                        const sub = toArray(inject.getSubForm());
                        const idx = sub.indexOf(fapi);
                        if (idx > -1) {
                            sub.splice(idx, 1);
                        }
                    } else {
                        inject.subForm();
                    }
                }
            };


            onMounted(() => {
                fc.mounted();
            });

            onBeforeUnmount(() => {
                rmSubForm();
                data.destroyed = true;
                fc.unmount();
            })

            onUpdated(() => {
                fc.updated();
            });

            watch(subForm, (n) => {
                n ? addSubForm() : rmSubForm();
            }, {immediate: true});

            watch(() => [...rule.value], (n) => {
                if (fc.$handle.isBreakWatch() || n.length === data.renderRule.length && n.every(v => data.renderRule.indexOf(v) > -1)) return;
                fc.$handle.reloadRule(rule.value);
                vm.proxy.renderRule();
            })

            watch(() => props.option, () => {
                fc.initOptions();
                fapi.refresh();
            }, {deep: true});

            watch(modelValue, (n) => {
                if (JSON.stringify(n || {}) === data.updateValue) return;
                fapi.config.forceCoverValue ? fapi.coverValue(n || {}) : fapi.setValue(n || {});
            }, {deep: true});

            return {
                fc: markRaw(fc),
                parent: parent ? markRaw(parent) : parent,
                fapi: markRaw(fapi),
                ...toRefs(data),
                refresh() {
                    ++data.unique;
                },
                renderRule() {
                    data.renderRule = [...rule.value || []];
                },
                updateValue(value) {
                    if (data.destroyed) return;
                    data.updateValue = JSON.stringify(value);
                    vm.emit('update:modelValue', value);
                }
            }
        },
        created() {
            const vm = getCurrentInstance();
            vm.proxy.fc.init();
            vm.emit('update:api', vm.proxy.fapi);
        },
    })
}
