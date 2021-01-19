import {VNodeData} from "@form-create/core";
import {Col, Row, Tooltip, Poptip, Button} from "iview";

export interface OptionAttrs {
    col?: Boolean | Col & {
        labelWidth?: number | string;
        show?: Boolean;
    };
    row?: Boolean | Row & {
        show?: Boolean;
    };
    info?: Boolean | (Tooltip | Poptip) & VNodeData & {
        show?: Boolean;
    };
    title?: Boolean | VNodeData & {
        show?: Boolean;
    };
    wrap?: Boolean | VNodeData & {
        labelWidth?: number;
        labelFor?: string;
        required?: boolean;
        error?: string;
        showMessage?: boolean;
        show?: Boolean;
    };
    form?: {
        inline?: boolean;
        labelPosition?: 'left' | 'right' | 'top';
        labelWidth?: number;
        showMessage?: boolean;
        className?: any;
        col?: Boolean;
    };

    submitBtn?: Boolean | Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

    resetBtn?: Boolean | Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

}

declare const optionAttrs: OptionAttrs;

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