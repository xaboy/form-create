import {isFunction, preventDefault, toString, isString, isType} from '@form-create/utils';
import {BaseForm} from '@form-create/core';
import style from '../style/index.css';

const upperCaseReg = /[A-Z]/;

export function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (isString(value) || isType(value) === 'Number'))
}

function isTooltip(info) {
    return info.type === 'tooltip';
}

export default class Form extends BaseForm {

    constructor(handle) {
        super(handle);
        this.refName = `cForm${this.id}`;
        this.hidden = [];
        this.visibility = [];
    }

    inputVData(parser) {
        const props = parser.rule.props || {};
        parser.vData.attrs(Object.keys(props).reduce((initial, val) => {
            if (isAttr(val, props[val]))
                initial[val] = props[val];
            return initial;
        }, {}));
        if (!props.size && this.options.form.size)
            parser.vData.props('size', this.options.form.size);
    }

    getFormRef() {
        return this.vm.$refs[this.refName];
    }

    beforeRender() {
        this.propsData = this.vData.props(this.options.form).props({
            model: this.$handle.formData,
            rules: this.$handle.validate,
            key: 'form' + this.unique
        }).ref(this.refName).nativeOn({submit: preventDefault}).class('form-create', true).key(this.unique).get();
    }

    render(vn) {
        if (vn.length > 0)
            vn.push(this.makeFormBtn());

        return this.vNode.form(this.propsData, [this.makeRow(vn)]);
    }

    makeRow(vn) {
        return this.vNode.row({props: this.options.row || {}, key: 'fr' + this.unique}, vn)
    }

    container(child, parser) {
        return this.makeFormItem(parser, child);
    }

    makeFormItem(parser, child) {
        let fItemUnique = `fItem${parser.key}${this.unique}`,
            {rule, field, formItemRefName} = parser,
            col = this.getGetCol(parser),
            labelWidth = (!col.labelWidth && !rule.title) ? 0 : col.labelWidth,
            className = rule.className, propsData = this.vData.props({
                prop: field,
                // label: rule.title,
                // labelFor: unique,
                rules: rule.validate,
                labelWidth: toString(labelWidth),
                required: rule.props.required
            }).key(fItemUnique).ref(formItemRefName).class(className).get(),
            node = this.vNode.formItem(propsData, [child, this.makeFormPop(parser, fItemUnique)]);
        return this.propsData.props.inline === true ? node : this.makeCol(col, parser, fItemUnique, [node]);
    }

    makeFormPop({rule}, unique) {
        if (rule.title) {
            const info = this.options.info || {}, svn = [rule.title];
            if (rule.info) {
                svn.push(this.vNode.make(isTooltip(info) ? 'el-tooltip' : 'el-popover', {
                    props: {...info, content: rule.info},
                    key: `pop${unique}`
                }, [
                    this.vNode.icon({
                        class: [info.icon || 'el-icon-warning'],
                        slot: isTooltip(info) ? 'default' : 'reference'
                    })
                ]));
            }
            return this.vNode.make('span', {slot: 'label'}, svn);
        }
    }

    makeCol(col, parser, fItemUnique, VNodeFn) {
        if (col.span === undefined)
            col.span = 24;
        return this.vNode.col({
            props: col, 'class': {
                [style.__fc_h]: this.hidden.indexOf(parser) !== -1,
                [style.__fc_v]: this.visibility.indexOf(parser) !== -1
            }, key: `${fItemUnique}col1`
        }, VNodeFn);
    }

    makeFormBtn() {
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow)
            btn.push(this.makeSubmitBtn(resetBtnShow ? 19 : 24));
        if (resetBtnShow)
            btn.push(this.makeResetBtn(4));

        return this.propsData.props.inline === true ? btn : this.vNode.col({
            props: {span: 24},
            key: `${this.unique}col2`
        }, btn);
    }

    makeResetBtn(span) {
        const resetBtn = this.vm.resetProps,
            props = resetBtn.col || {span: span, push: 1};

        return this.vNode.col({props: props, key: `${this.unique}col3`}, [
            this.vNode.button({
                key: `frsbtn${this.unique}`, props: resetBtn, on: {
                    'click': () => {
                        const fApi = this.$handle.fCreateApi;
                        isFunction(resetBtn.click)
                            ? resetBtn.click(fApi)
                            : fApi.resetFields();
                    }
                }, style: {width: resetBtn.width}
            }, [resetBtn.innerText])
        ]);
    }

    makeSubmitBtn(span) {
        const submitBtn = this.vm.buttonProps,
            props = submitBtn.col || {span: span};

        return this.vNode.col({props: props, key: `${this.unique}col4`}, [
            this.vNode.button({
                key: `fbtn${this.unique}`, props: submitBtn, on: {
                    'click': () => {
                        const fApi = this.$handle.fCreateApi;
                        isFunction(submitBtn.click)
                            ? submitBtn.click(fApi)
                            : fApi.submit();
                    }
                }, style: {width: submitBtn.width}
            }, [submitBtn.innerText])
        ]);
    }
}
