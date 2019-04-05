import {extend, isFunction, isUndef, preventDefault} from "../../core/util";
import VNode from "../../factory/vNode";
import VData from "../../factory/vData";
import {isComponent} from "../../core/formCreate";


export default class Form {

    constructor(fComponent) {
        let {id, vm, fieldList, handlers} = fComponent;
        this.vm = vm;
        this.handlers = handlers;
        this.renderSort = fieldList;
        this._fc = fComponent;
        this.vNode = new VNode(vm);
        this.vData = new VData();
        this.unique = id;
        this.refName = `cForm${id}`;
        this.cacheUnique = 0;
    }


    getRender(field) {
        return this.handlers[field].render;
    }

    render(vm) {
        if (!vm.isShow)
            return;

        this.vNode.setVm(vm);

        if (this.cacheUnique !== vm.unique) {
            this.renderSort.forEach((field) => {
                this.getRender(field).clearCache();
            });
            this.cacheUnique = vm.unique;
        }
        this.propsData = this.vData.props(this._fc.options.form).props({
            model: this._fc.formData,
            rules: this._fc.validate,
            key: 'form' + this.unique
        })
            .ref(this.refName).nativeOn({submit: preventDefault}).class('form-create', true).key(this.unique).get();
        let unique = this.unique,
            vn = this.renderSort.map((field) => {
                let render = this.getRender(field);
                if (render.handler.type === 'hidden') return;
                return this.makeComponent(render);

            }).filter((val) => val !== undefined);
        if (vn.length > 0)
            vn.push(this.makeFormBtn(unique));

        return this.vNode.form(this.propsData, vn.length > 0 ? [this.vNode.row(extend({props: this._fc.options.row || {}}, {key: 'row' + unique}), vn)] : []);
    }

    makeComponent(render) {
        return this.makeFormItem(render.handler, render.cacheParse(this), `fItem${render.handler.key}${this.unique}`);
    }

    makeFormItem({type, rule, unique, field, refName}, VNodeFn, fItemUnique) {
        let labelWidth = (!isComponent(type) && !rule.col.labelWidth && !rule.title) ? 1 : rule.col.labelWidth,
            className = rule.className, propsData = this.vData.props({
                prop: field,
                label: rule.title,
                labelFor: unique,
                rules: rule.validate,
                labelWidth: labelWidth,
                required: rule.props.required
            }).key(fItemUnique).ref('fItem' + refName).class(className).get(),
            node = this.vNode.formItem(propsData, VNodeFn);
        return this.propsData.props.inline === true ? [node] : this.makeCol(rule, fItemUnique, [node])
    }

    makeCol(rule, fItemUnique, VNodeFn) {
        return this.vNode.col({
            props: rule.col, 'class': {
                '__fc_h': rule.props.hidden === true,
                '__fc_v': rule.props.visibility === true
            }, key: `${fItemUnique}col1`
        }, VNodeFn);
    }

    makeFormBtn(unique) {
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow)
            btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
        if (resetBtnShow)
            btn.push(this.makeResetBtn(unique, 4));

        return this.vNode.col({props: {span: 24}, key: `${this.unique}col2`}, btn);
    }

    makeResetBtn(unique, span) {
        const resetBtn = this._fc.options.resetBtn,
            props = isUndef(this._fc.options.resetBtn.col) ? {span: span, push: 1} : resetBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col3`}, [
            this.vNode.button({
                key: `frsbtn${unique}`, props: this.vm.resetProps, on: {
                    "click": () => {
                        const fApi = this._fc.fCreateApi;
                        isFunction(resetBtn.click)
                            ? resetBtn.click(fApi)
                            : fApi.resetFields();
                    }
                }
            }, [this.vm.resetProps.innerText])
        ]);
    }

    makeSubmitBtn(unique, span) {
        const submitBtn = this._fc.options.submitBtn,
            props = isUndef(this._fc.options.submitBtn.col) ? {span: span} : submitBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col4`}, [
            this.vNode.button({
                key: `fbtn${unique}`, props: this.vm.buttonProps, on: {
                    "click": () => {
                        const fApi = this._fc.fCreateApi;
                        isFunction(submitBtn.click)
                            ? submitBtn.click(fApi)
                            : fApi.submit();
                    }
                }
            }, [this.vm.buttonProps.innerText])
        ]);
    }

}
