import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {_vue as Vue} from '../frame';
import {tip} from '@form-create/utils/lib/console';

function setTemplateProps(vm, parser, api) {
    if (!vm.$props) return;

    const {prop} = parser;
    const keys = Object.keys(vm.$props);
    const inject = injectProp(parser, api);
    const injectKeys = Object.keys(inject);

    keys.forEach(key => {
        if (hasProperty(prop.props, key))
            vm.$props[key] = prop.props[key];
        else if (injectKeys.indexOf(key) > -1) vm.$props[key] = inject[key];
    });

    const key = (vm.$options.model && vm.$options.model.prop) || 'value';
    if (keys.indexOf(key) !== -1) {
        vm.$props[key] = prop.value;
    }
}

function injectProp(parser, api) {
    return {
        formCreate: api,
        formCreateField: parser.input ? parser.field : undefined,
        formCreateOptions: parser.rule.options,
        formCreateRule: (function () {
            const temp = {...parser.prop};
            return temp.on = temp.on ? {...temp.on} : {}, temp;
        }()),
    }
}


export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.renderList = {};
            this.clearOrgChildren();
        },
        initOrgChildren() {
            const parsers = this.$handle.parsers;
            this.orgChildren = Object.keys(parsers).reduce((initial, id) => {
                const children = parsers[id].rule.children;
                initial[id] = is.trueArray(children) ? [...children] : [];

                return initial;
            }, {});

        },
        clearOrgChildren() {
            this.orgChildren = {};
        },
        render() {
            if (!this.vm.isShow) return;

            this.$manager.updateOptions(this.$handle.options);
            this.$manager.beforeRender();

            const vn = this.$handle.sortList.map((id) => {
                return this.renderParser(this.$handle.parsers[id]);
            }).filter((val) => val !== undefined);

            return this.$manager.render(vn);
        },
        makeVm(rule) {
            const vm = rule.vm;
            if (!vm)
                return new Vue;
            else if (is.Function(vm))
                return vm(this.$handle.getInjectData(rule));
            else if (!vm._isVue)
                return new Vue(vm);
            return vm;
        },
        mergeGlobal(parser) {
            const g = this.$handle.options.global;
            if (!g) return;
            mergeProps([g['*'], g[parser.type] || g[parser.originType] || {}], parser.prop);
        },
        renderTemplate(parser) {
            if (!Vue.compile) {
                tip('当前使用的Vue构建版本不支持compile,无法使用template功能');
                return [];
            }
            const rule = this.mergeProp(parser);
            const {id, key} = parser;

            if (!this.renderList[id]) {
                if (!parser.el)
                    parser.el = this.makeVm(rule);

                let vm = parser.el;
                if (parser.input)
                    vm.$on((vm.$options.model && vm.$options.model.event) || 'input', (value) => {
                        this.onInput(parser, value);
                    });

                this.renderList[id] = {
                    vm,
                    template: Vue.compile(rule.template)
                };
            }

            const {vm, template} = this.renderList[id];

            setTemplateProps(vm, parser, this.$handle.api);

            const vn = template.render.call(vm);

            if (is.Undef(vn.data)) vn.data = {};
            vn.key = key;
            vn.data.ref = parser.refName;
            vn.data.key = key;
            return vn;
        },
        renderParser(parser, parent) {
            if (parser.type === 'hidden') return;
            if (!this.cache[parser.id] || parser.type === 'template') {
                const form = this.$manager;
                parser.initProp();
                form.tidyRule(parser);
                this.mergeGlobal(parser);
                let {type, prop: rule} = parser, vn;
                if (is.Boolean(rule.hidden) && rule.hidden) return;

                if (type === 'template' && rule.template) {
                    vn = this.renderTemplate(parser);

                    if (parent && is.Undef(rule.native)) {
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                } else if (parser.input) {
                    const children = this.renderChildren(parser);
                    vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
                } else {
                    vn = this.defaultRender(parser, this.renderChildren(parser));
                    if (parent && is.Undef(rule.native)) {
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                }
                if (rule.native !== true)
                    vn = form.makeFormItem(parser, vn);
                this.setCache(parser, vn, parent);
                return vn;
            }

            return this.getCache(parser);
        },
        mergeProp(parser, custom) {
            const {refName, key} = parser;
            const props = [
                {
                    props: injectProp(parser, this.$handle.api),
                    on: {
                        'fc.subForm': (subForm) => this.$handle.addSubForm(parser, subForm)
                    },
                    ref: refName,
                    key: `${key}fc`,
                }
            ]

            if (!custom) {
                props.push({
                    on: {
                        ['hook:mounted']: () => {
                            parser.el = this.vm.$refs[refName];
                            parser.mounted();
                            console.log('mounted', parser.field);
                        }
                    },
                    model: parser.input ? {
                        //todo 优化获取 formData
                        value: this.$handle.getFormData(parser),
                        callback: (value) => {
                            console.log(parser.field, value);
                            this.onInput(parser, value);
                        },
                        expression: `formData.${parser.field}`
                    } : undefined,
                })

            }
            mergeProps(props, parser.prop);

            this.$manager.mergeProp && this.$manager.mergeProp(parser, custom);
            parser.mergeProp && parser.mergeProp(custom);
            return parser.prop;
        },
        onInput(parser, value) {
            this.$handle.onInput(parser, value);
        },
        renderChildren(parser) {
            const {children} = parser.rule, orgChildren = this.orgChildren[parser.id];

            if (!is.trueArray(children) && orgChildren) {
                orgChildren.forEach(child => {
                    if (!is.String(child) && child.__fc__) {
                        this.$handle.deleteParser(child.__fc__);
                    }
                });
                this.orgChildren[parser.id] = [];
                return [];
            }

            orgChildren && orgChildren.forEach(child => {
                if (children.indexOf(child) === -1 && !is.String(child) && child.__fc__) {
                    this.$handle.deleteParser(child.__fc__);
                }
            });

            return children.map(child => {
                if (is.String(child)) return child;
                if (child.__fc__) {
                    return this.renderParser(child.__fc__, parser);
                }
                if (!this.$handle.isRepeatRule(child.__origin__ || child) && child.type) {
                    this.vm.$nextTick(() => {
                        this.$handle.loadChildren(children, parser);
                        this.$handle.refresh();
                    });
                }
            });

        },
        defaultRender(parser, children) {
            const prop = this.mergeProp(parser);
            if (this.vNode[parser.type])
                return this.vNode[parser.type](prop, children);
            if (this.vNode[parser.originType])
                return this.vNode[parser.originType](prop, children);
            return this.vNode.make(parser.originType, prop, children);
        },
        renderRule(rule, children = []) {
            return this.vm.$createElement(rule.type, rule, children);
        }
    })
}
