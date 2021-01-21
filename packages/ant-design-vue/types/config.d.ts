import {VNodeData} from "@form-create/core";
import {Button, Col, Popover, Row, Tooltip} from "ant-design-vue";

export interface OptionAttrs {
    col?: Boolean | Col & {
        labelWidth?: number | string;
        show?: Boolean;
    };
    row?: Boolean | Row & {
        show?: Boolean;
    };
    info?: Boolean | (Tooltip | Popover) & VNodeData & {
        show?: Boolean;
    };
    title?: Boolean | VNodeData & {
        show?: Boolean;
    };
    wrap?: Boolean | VNodeData & {
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
    };
    form?: {
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

interface children {
    children?: VNodeData[]
}

export interface CreatorAttrs {
    col(props: typeof optionAttrs.col): this;

    wrap(props: typeof optionAttrs.wrap): this;

    title(props: string | typeof optionAttrs.title & children): this;

    info(props: string | typeof optionAttrs.info & children): this;

    className(prop: string): this;

}

export interface RuleAttrs {
    col?: typeof optionAttrs.col;
    wrap?: typeof optionAttrs.wrap;
    title?: string | typeof optionAttrs.title & children;
    info?: string | typeof optionAttrs.info & children;
    className?: string;
}