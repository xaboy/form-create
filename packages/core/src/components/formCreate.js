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

const NAME = 'FormCreate';

export default function $FormCreate(FormCreate) {
    return defineComponent({
        name: NAME,
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
        },
        emits: ['update:api', 'update:modelValue', 'mounted', 'submit', 'change', 'emit-event', 'control', 'remove-rule', 'remove-field', 'sync'],
        render() {
            return this.fc.render();
        },
        setup(props) {
            const vm = getCurrentInstance();
            provide('parentFC', vm.ctx);
            const parent = inject('parentFC');

            const {rule, modelValue} = toRefs(props);

            const data = reactive({
                destroyed: false,
                isShow: true,
                unique: 1,
                renderRule: [...rule.value || []],
                updateValue: JSON.stringify(modelValue)
            });

            const fc = new FormCreate(vm);
            const fapi = fc.api();

            onMounted(() => {
                fc.mounted();
            });

            onBeforeUnmount(() => {
                data.destroyed = true;
                fc.unmount();
            })

            onUpdated(() => {
                fc.updated();
            });

            watch(() => [...rule.value], function (n) {
                if (fc.$handle.isBreakWatch() || n.length === data.renderRule.length && n.every(v => data.renderRule.indexOf(v) > -1)) return;
                fc.$handle.reloadRule(rule.value);
                vm.ctx.renderRule();
            })

            watch(props.option, function (n) {
                fc.initOptions(n);
                fapi.refresh();
            });

            watch(modelValue, (n) => {
                if (JSON.stringify(n) === data.updateValue) return;
                fapi.setValue(n);
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
                    this.$emit('update:modelValue', value);
                }
            }
        },
        beforeCreate() {
            this.fc.init();
            this.$emit('update:api', this.fapi);
        },
    })
}
