import {isFunction, isString, preventDefault} from '@form-create/utils';
import {BaseForm} from '@form-create/core';
import style from '../style/index.css';
import {iviewConfig} from './config';

function isTooltip(info) {
    return info.type === 'tooltip';
}

export default class Form extends BaseForm {

    inputVData(parser) {
        if (!parser.rule.props.size && this.options.form.size)
            parser.vData.props('size', this.options.form.size);
    }

    validate(call) {
        this.getFormRef().validate((valid) => {
            call && call(valid);
        });
    }

    validateField(field, call) {
        this.getFormRef().validateField(field, call);
    }

    resetField(parser) {
        this.vm.$refs[parser.formItemRefName].resetField();
    }

    clearValidateState(parser) {
        const fItem = this.vm.$refs[parser.formItemRefName];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    }

    beforeRender() {
        this.propsData = this.vData.props(this.options.form).props({
            model: this.$handle.formData,
            rules: this.$handle.validate,
            key: 'form' + this.unique
        }).ref(this.refName).nativeOn({submit: preventDefault}).class(this.options.form.className).class('form-create', true).key(this.unique).get();
    }

    render(vn) {
        if (vn.length > 0)
            vn.push(this.makeFormBtn());

        return this.vNode.form(this.propsData, [this.options.row === false ? vn : this.makeRow(vn)]);
    }

    makeRow(vn) {
        const _class = {}, row = this.options.row || {};

        if (row.class) _class[row.class] = true;
        return this.vNode.row({props: row || {}, key: 'fr' + this.unique, class: _class}, vn)
    }

    container(child, parser) {
        return this.makeFormItem(parser, child);
    }

    makeFormItem(parser, child) {
        let fItemUnique = `fItem${parser.key}${this.unique}`,
            {rule, field, formItemRefName} = parser,
            col = this.getGetCol(parser),
            labelWidth = (!col.labelWidth && !rule.title) ? 0 : col.labelWidth, {inline, col: _col} = this.propsData.props,
            propsData = this.vData.props({
                prop: field,
                label: rule.title,
                // labelFor: unique,
                rules: rule.validate,
                labelWidth: labelWidth,
                required: rule.props.required
            }).key(fItemUnique).ref(formItemRefName).class(rule.className).get(),
            node = this.vNode.formItem(propsData, [child, this.makeFormPop(parser, fItemUnique)]);
        return (inline === true || _col === false) ? node : this.makeCol(col, parser, fItemUnique, [node]);
    }

    makeFormPop({rule}, unique) {
        if (rule.title) {
            const titleProp = isString(rule.title) ? {title: rule.title} : rule.title;
            const info = this.options.info || {}, svn = [titleProp.title || ''];
            if (rule.info) {
                svn.push(this.vNode.make(isTooltip(info) ? 'Tooltip' : 'Poptip', {
                    props: {...info, content: rule.info},
                    class: 'fc-pop' + iviewConfig._v,
                    key: `pop${unique}`
                }, [
                    this.vNode.icon({props: {type: info.icon || iviewConfig.infoIcon, size: 16}})
                ]));
            }
            return this.vNode.make('span', {...titleProp, slot: 'label'}, svn);
        }
    }

    makeCol(col, parser, fItemUnique, VNodeFn) {
        if (col.span === undefined)
            col.span = 24;
        const cls = {
            [style.__fc_h]: !!parser.rule.hidden,
            [style.__fc_v]: !!parser.rule.visibility
        };
        if (col.class) cls[col.class] = true;
        return this.vNode.col({
            props: col, class: cls, key: `${fItemUnique}col1`
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

        return this.propsData.props.inline === true
            ? btn
            : (btn.length ? this.vNode.col({
                props: {span: 24},
                key: `${this.unique}col2`
            }, btn) : []);
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
                }
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
                }
            }, [submitBtn.innerText])
        ]);
    }
}
