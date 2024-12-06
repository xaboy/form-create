import {FormData, VNodeRule} from "@form-create/core";
import {Api} from "./index";
import {Component} from "vue";

export interface OptionAttrs {
    col?: Boolean | Partial<{
        labelWidth?: number | string;
        show?: Boolean;
        [key: string]: any;
    }>;
    row?: Boolean | Partial<{
        show?: Boolean;
        [key: string]: any;
    }>;
    info?: Partial<{
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    }>;
    wrap?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        [key: string]: any;
    }>;
    form?: Object;

    submitBtn?: Boolean | Partial<{
        click?: Function;
        innerText?: string;
        show?: Boolean;
        [key: string]: any;
    }>;

    resetBtn?: Boolean | Partial<{
        click?: Function;
        innerText?: string;
        show?: Boolean;
        [key: string]: any;
    }>;

}

declare const optionAttrs: Partial<OptionAttrs & {
    title?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        title: string;
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

    formEl(): undefined | Component;

    wrapEl(id: string): undefined | Component;

    submit(success: (formData: FormData, $f: Api) => void, fail: ($f: Api) => void): Promise<any>;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    validate(callback?: (state: any) => void): Promise<any>;

    validateField(field: string, callback?: (state: any) => void): Promise<any>;

    submitBtnProps(props: Object): void;

    resetBtnProps(props: Object): void;

}
