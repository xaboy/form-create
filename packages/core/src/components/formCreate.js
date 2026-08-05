import {
    defineComponent,
    getCurrentInstance,
    inject,
    markRaw,
    nextTick,
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    onUpdated,
    provide,
    reactive,
    toRefs,
    watch, watchEffect
} from 'vue';
import toArray from '@form-create/utils/lib/toarray';
import debounce from '@form-create/utils/lib/debounce';
import toLine from '@form-create/utils/lib/toline';
import {toJson} from '../frame/util';

const getGroupInject = (vm, parent) => {
    if (!vm || vm === parent) {
        return;
    }
    if (vm.props.formCreateInject) {
        return vm.props.formCreateInject
    }
    if (vm.parent) {
        return getGroupInject(vm.parent, parent);
    }
}

//单字段快路径：基本类型直接比，避免大表每次 sync 都整表 toJson
function valueEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a == null || b == null) {
        return a === b;
    }
    const type = typeof a;
    if (type !== typeof b) {
        return false;
    }
    if (type === 'string' || type === 'boolean') {
        return false;
    }
    if (type === 'number') {
        return Number.isNaN(a) && Number.isNaN(b);
    }
    //对象/数组仅在引用不同时才序列化该字段
    return toJson(a) === toJson(b);
}

function formEqual(a, b) {
    if (a === b) {
        return true;
    }
    a = a || {};
    b = b || {};
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!Object.prototype.hasOwnProperty.call(b, key)) {
            return false;
        }
        if (!valueEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}

export default function $FormCreate(FormCreate, components, directives) {
    return defineComponent({
        name: 'FormCreate' + (FormCreate.isMobile ? 'Mobile' : ''),
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
            driver: [String, Object],
            modelValue: Object,
            disabled: {
                type: Boolean,
                default: undefined,
            },
            preview: {
                type: Boolean,
                default: undefined,
            },
            index: [String, Number],
            api: Object,
            locale: [String, Object],
            t: Function,
            name: String,
            subForm: {
                type: Boolean,
                default: true
            },
            inFor: Boolean,
        },
        emits: ['update:api', 'update:modelValue', 'mounted', 'beforeUnmount', 'submit', 'reset', 'change', 'emit-event', 'control', 'remove-rule', 'remove-field', 'sync', 'reload', 'repeat-field', 'update', 'validate-field-fail', 'validate-fail', 'created'],
        render() {
            return this.fc.render();
        },
        setup(props) {
            const vm = getCurrentInstance();
            provide('parentFC', vm);
            const parent = inject('parentFC', null);
            let top = parent;

            if (parent) {
                while (top.setupState.parent) {
                    top = top.setupState.parent;
                }
            } else {
                top = vm;
            }

            const {rule, modelValue, subForm, inFor} = toRefs(props);

            const data = reactive({
                ctxInject: {},
                destroyed: false,
                isShow: true,
                unique: 1,
                renderRule: [...rule.value || []],
            });
            //最近一次对外同步的表单快照；用字段级比较替代整表 toJson 字符串
            let lastForm = modelValue.value || {};

            const fc = new FormCreate(vm);
            const fapi = fc.api();

            const isMore = inFor.value;

            const addSubForm = () => {
                if (parent) {
                    const inject = getGroupInject(vm, parent);
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
                const inject = getGroupInject(vm, parent);
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

            let styleEl = null;

            onBeforeMount(() => {
                watchEffect(() => {
                    let content = '';
                    const globalClass = (props.option && props.option.globalClass) || {};
                    Object.keys(globalClass).forEach(k => {
                        let subCss = '';
                        globalClass[k].style && Object.keys(globalClass[k].style).forEach(key => {
                            subCss += toLine(key) + ':' + globalClass[k].style[key] + ';';
                        });
                        if (globalClass[k].content) {
                            subCss += globalClass[k].content + ';';
                        }
                        if (subCss) {
                            content += `.${k}{${subCss}}`;
                        }
                    });
                    if (props.option && props.option.style) {
                        content += props.option.style;
                    }
                    if (!styleEl) {
                        styleEl = document.createElement('style');
                        styleEl.type = 'text/css';
                        document.head.appendChild(styleEl);
                    }
                    styleEl.innerHTML = content || '';
                })
            });

            const emit$topForm = debounce(() => {
                fc.bus.$emit('$loadData.$topForm');
            }, 100);

            const emit$scopeForm = debounce(function () {
                fc.bus.$emit('$loadData.$scopeForm');
            }, 100);

            const emit$form = debounce(() => {
                fc.bus.$emit('$loadData.$form');
            }, 100);

            const emit$change = (field) => {
                fc.bus.$emit('change-$form.' + field);
            };

            onMounted(() => {
                if (parent) {
                    fapi.top.bus.$on('$loadData.$form', emit$topForm);
                    fapi.top.bus.$on('change', emit$change);
                }
                if (fapi !== fapi.scope) {
                    fapi.scope.bus.$on('$loadData.$scopeForm', emit$scopeForm);
                }
                fc.mounted();
            });

            onBeforeUnmount(() => {
                if (parent) {
                    fapi.top.bus.$off('$loadData.$form', emit$topForm);
                    fapi.top.bus.$off('change', emit$change);
                }
                if (fapi !== fapi.scope) {
                    fapi.scope.bus.$off('$loadData.$scopeForm', emit$scopeForm);
                }
                rmSubForm();
                data.destroyed = true;
                fc.unmount();
                styleEl && (styleEl.parentNode || styleEl.parentElement) && document.head.removeChild(styleEl);
            })

            onUpdated(() => {
                fc.updated();
            });

            addSubForm();

            watch(() => props.option, () => {
                fc.initOptions();
                fapi.refresh();
            }, {deep: true, flush: 'sync'});

            watch(() => [...rule.value], (n) => {
                if (fc.$handle.isBreakWatch() || n.length === data.renderRule.length && n.every(v => data.renderRule.indexOf(v) > -1)) return;
                fc.$handle.updateAppendData();
                fc.$handle.reloadRule(rule.value);
                vm.setupState.renderRule();
            })

            watch(() => [props.disabled, props.preview], () => {
                fapi.refresh();
            });

            watch(modelValue, (n) => {
                if (formEqual(n || {}, lastForm)) return;
                if (fapi.config.forceCoverValue) {
                    fapi.coverValue(n || {});
                } else {
                    fapi.setValue(n || {});
                }
            }, {deep: true, flush: 'post'});

            watch(() => props.index, () => {
                fapi.coverValue({});
                fc.$handle.updateAppendData();
                nextTick(() => {
                    nextTick(() => {
                        fapi.clearValidateState();
                    });
                });
            }, {flush: 'sync'});

            return {
                fc: markRaw(fc),
                parent: parent ? markRaw(parent) : parent,
                top: markRaw(top),
                fapi: markRaw(fapi),
                ...toRefs(data),
                getGroupInject: () => getGroupInject(vm, parent),
                refresh() {
                    ++data.unique;
                },
                renderRule() {
                    data.renderRule = [...rule.value || []];
                },
                updateValue(value) {
                    if (data.destroyed) return;
                    if (formEqual(value, lastForm)) {
                        return;
                    }
                    lastForm = value;
                    vm.emit('update:modelValue', value);
                    nextTick(() => {
                        emit$form();
                        if (!parent) {
                            emit$topForm();
                            emit$scopeForm();
                        } else if (!subForm.value) {
                            emit$scopeForm();
                        }
                    });
                }
            }
        },
        created() {
            const vm = getCurrentInstance();
            vm.emit('update:api', vm.setupState.fapi);
            vm.setupState.fc.init();
        },
    })
}
