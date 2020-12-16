import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {_vue as Vue} from '../frame';
import {tip} from '@form-create/utils/lib/console';
import {invoke} from '../frame/util';
import toCase from '@form-create/utils/lib/tocase';

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
        formCreateField: parser.field,
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
            if (!this.vm.isShow) {
                return;
            }
            this.$manager.beforeRender();

            const vn = this.sortList.map((id) => {
                return this.renderParser(this.$handle.parsers[id]);
            }).filter((val) => val !== undefined);

            return this.$manager.render(vn);
        },
        makeVm(rule) {
            const vm = rule.vm;
            if (!vm)
                return new Vue;
            else if (is.Function(vm))
                return invoke(() => vm(this.$handle.getInjectData(rule)));
            else if (!vm._isVue)
                return new Vue(vm);
            return vm;
        },
        mergeGlobal(parser) {
            const g = this.$handle.options.global;
            if (!g) return;
            if (!parser.cacheConfig)
                parser.cacheConfig = g[parser.originType] || g[parser.type] || g[parser.trueType] || {};
            mergeProps([g['*'], parser.cacheConfig], parser.prop);
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
        renderAround(vn, parser) {
            const prop = parser.prop;
            return [prop.prefix || undefined, vn, prop.suffix || undefined];
        },
        renderParser(parser, parent) {
            if (parser.type === 'hidden') return;
            if (!this.cache[parser.id] || parser.type === 'template') {
                const form = this.$manager;
                parser.initProp();
                form.tidyRule(parser);
                this.mergeGlobal(parser);
                let {type, prop: rule} = parser, vn;
                if (rule.hidden) return;

                if (type === 'template' && rule.template) {
                    vn = this.renderTemplate(parser);

                    if (parent && is.Undef(rule.native)) {
                        vn = this.renderAround(vn, parser);
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                } else if (parser.input) {
                    const children = this.renderChildren(parser);
                    vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
                } else {
                    vn = this.defaultRender(parser, this.renderChildren(parser));
                    if (parent && is.Undef(rule.native)) {
                        vn = this.renderAround(vn, parser);
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                }
                vn = this.renderAround(vn, parser);
                if (rule.native !== true)
                    vn = form.makeFormItem(parser, vn);
                this.setCache(parser, vn, parent);
                return vn;
            }

            return this.getCache(parser);
        },
        //todo 优化调用
        mergeProp(parser, custom) {
            const {refName, key} = parser;
            this.$manager.mergeProp && this.$manager.mergeProp(parser, custom);
            parser.mergeProp && parser.mergeProp(custom);
            const props = [
                {
                    props: injectProp(parser, this.$handle.api),
                    on: parser.input ? {
                        'fc.sub-form': (subForm) => this.$handle.addSubForm(parser, subForm)
                    } : {},
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
                            this.$handle.effect(parser, 'mounted');
                        }
                    },
                    model: parser.input ? {
                        value: this.$handle.getFormData(parser),
                        callback: (value) => {
                            this.onInput(parser, value);
                        },
                        expression: `formData.${parser.field}`
                    } : undefined,
                })
            }
            mergeProps(props, parser.prop);
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
                        this.$handle.rmParser(child.__fc__);
                    }
                });
                this.orgChildren[parser.id] = [];
                return [];
            }

            orgChildren && orgChildren.forEach(child => {
                if (children.indexOf(child) === -1 && !is.String(child) && child.__fc__) {
                    this.$handle.rmParser(child.__fc__);
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
            let type = toCase(rule.type);
            const alias = this.vNode.aliasMap[type];
            if (alias) type = toCase(alias);
            return this.vm.$createElement(type, rule, children);
        }
    })
}
