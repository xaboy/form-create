import toArray from '@form-create/utils/lib/toarray';
import {
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
    watch
} from 'vue';
import debounce from '@form-create/utils/lib/debounce'
import toLine from '@form-create/utils/lib/toline';
import {toJson} from '../frame/util';

const NAME = 'FormCreate';

const getGroupInject = (vm, parent) => {
    if (!vm || vm === parent || !vm.$props) {
        return;
    }
    if (vm.$props.formCreateInject) {
        return vm.$props.formCreateInject
    }
    if (vm.$parent) {
        return getGroupInject(vm.$parent, parent);
    }
}

export default function $FormCreate(FormCreate, components, directives) {
    const name = 'FormCreate' + (FormCreate.isMobile ? 'Mobile' : '');
    return {
        name,
        componentName: name,
        model: {
            prop: 'api'
        },
        components,
        directives,
        provide() {
            return {
                $pfc: this,
            }
        },
        inject: {$pfc: {default: null}},
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
            value: Object,
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
            name: String,
            subForm: {
                type: Boolean,
                default: true
            },
            inFor: Boolean,
        },
        render() {
            return this.fc.render();
        },
        setup(props) {
            const vm = getCurrentInstance().proxy;
            provide('parentFC', vm);
            const parent = inject('parentFC', null);
            let top = parent;

            if (parent) {
                while (top.parent) {
                    top = top.parent;
                }
            } else {
                top = vm;
            }

            const {rule, value: modelValue, subForm, inFor} = toRefs(props);

            const data = reactive({
                ctxInject: {},
                destroyed: false,
                isShow: true,
                unique: 1,
                renderRule: [...rule.value || []],
                updateValue: JSON.stringify(modelValue.value || {}),
            });

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
                watch(() => {
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
                },() => {})
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

            watch(subForm, (n) => {
                n ? addSubForm() : rmSubForm();
            }, {immediate: true});

            watch(() => props.option, () => {
                fc.initOptions();
                fapi.refresh();
            }, {deep: true});

            watch(() => [...rule.value], (n) => {
                if (fc.$handle.isBreakWatch() || n.length === data.renderRule.length && n.every(v => data.renderRule.indexOf(v) > -1)) return;
                fc.$handle.updateAppendData();
                fc.$handle.reloadRule(rule.value);
                vm.renderRule();
            })

            watch(() => [props.disabled, props.preview], () => {
                fapi.refresh();
            });

            watch(modelValue, (n) => {
                if (toJson(n || {}) === data.updateValue) return;
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
                    const json = toJson(value);
                    if (data.updateValue === json) {
                        return;
                    }
                    data.updateValue = json;
                    vm.$emit('update:value', value);
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
            this.$emit('input', this.fapi);
            this.fc.init();
        }
    }
}
