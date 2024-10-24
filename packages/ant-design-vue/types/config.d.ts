import {FormData, VNodeRule} from "@form-create/core";
import {Button, Col, Popover, Row, Tooltip, FormModel} from "ant-design-vue";
import {FormModelItem} from "ant-design-vue/types/form-model/form-item";
import {Api} from "./index";

export interface OptionAttrs {
    col?: Boolean | Partial<Col & {
        labelWidth?: number | string;
        show?: Boolean;
    }>;
    row?: Boolean | Row & {
        show?: Boolean;
    };
    info?: Boolean | Partial<(Tooltip | Popover) & VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    }>;
    wrap?: Boolean | Partial<VNodeRule & {
        colon?: boolean;
        extra?: any;
        hasFeedback?: boolean;
        help?: any;
        label?: any;
        labelCol?: Col;
        required?: boolean;
        validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
        wrapperCol?: Col;
        labelAlign?: 'left' | 'right';
        autoLink?: boolean;
        show?: Boolean;
    }>;
    form?: Partial<{
        hideRequiredMark?: boolean;
        labelCol?: Col;
        layout?: 'horizontal' | 'inline' | 'vertical';
        wrapperCol?: Col;
        colon?: boolean;
        labelAlign?: 'left' | 'right';
        validateMessages?: any;
        validateOnRuleChange?: boolean;
        className?: any;
        col?: Boolean;
    }>;

    submitBtn?: Boolean | Partial<Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;

    resetBtn?: Boolean | Partial<Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;

}

declare const optionAttrs: Partial<OptionAttrs & {
    title?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        title?: string;
    }>;
}>;

export interface CreatorAttrs {
    col(props: typeof optionAttrs.col): this;

    wrap(props: typeof optionAttrs.wrap): this;

    title(props: string | typeof optionAttrs.title): this;

    info(props: string | typeof optionAttrs.info): this;

    className(prop: string): this;

}

export interface RuleAttrs {
    col?: typeof optionAttrs.col;
    wrap?: typeof optionAttrs.wrap;
    title?: string | typeof optionAttrs.title;
    info?: string | typeof optionAttrs.info;
    className?: string;
}

export interface ApiAttrs {
    btn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }
    resetBtn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }

    formEl(): undefined | FormModel;

    wrapEl(id: string): undefined | FormModelItem;

    submit(success: (formData: FormData, api: Api) => void, fail: (api: Api) => void): void;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    validate(callback?: (boolean: boolean, object: Object) => void): Promise<any>;

    validateField(field: string, callback?: (errorMessage: string) => void): Promise<any>;

    submitBtnProps(props: Button): void;

    resetBtnProps(props: Button): void;

}
