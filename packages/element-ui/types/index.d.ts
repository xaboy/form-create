import {Button, Col, Option, Row} from "element-ui";
import {ElementUIComponentSize} from "element-ui/types/component";
import {FormItemLabelPosition} from "element-ui/types/form";
import FormCreate from "@form-create/core";
import Vue from "vue";

export default formCreate;

declare class formCreate {
    static create: create;
    static maker: FormCreate.Maker<Creator, Rule>;
    static install: (vue: typeof Vue) => void;
    static init: init;
    static component: FormCreate.Component;
    static $form: FormCreate.$form;
    static parseJson: FormCreate.parseJson<Rule>;
    static copyRule: FormCreate.CopyRule<FormRule>;
    static copyRules: FormCreate.CopyRules<FormRule>;
}


interface ElementFormConfig {
    inline?: boolean
    disabled?: boolean
    labelPosition?: FormItemLabelPosition
    labelWidth?: string
    labelSuffix?: string
    showMessage?: boolean
    inlineMessage?: boolean
    statusIcon?: boolean
    validateOnRuleChange?: boolean
    size?: ElementUIComponentSize
    className: any;
}

export declare interface FormCol extends Col {
    labelWidth?: number | string;
}

export declare interface FormOption extends FormCreate.BaseOption<Rule>, Option {
}

export declare interface Rule extends FormCreate.Rule<$FApi, FormCol, FormOption> {
}

export declare interface Creator extends FormCreate.Creator<Rule, FormCol, FormOption, $FApi> {

}

export declare interface Control extends FormCreate.Control<FormRule, $FApi> {

}

export declare type FormRule = Creator | Rule;

export declare interface DefaultSlot extends FormCreate.DefaultSlot<Rule> {

}

export declare interface FormConfig extends FormCreate.BaseConfig<ElementFormConfig, Row, Button, FormRule, FormButton> {
}

export declare interface FormButton extends FormCreate.BaseButton<FormCol>, Button {

}

export declare interface $FApi extends FormCreate.$FApi<FormRule, FormConfig, FormButton> {

}

export declare interface FormData extends FormCreate.FormData {
}

export declare interface BindFormData extends FormCreate.BindFormData {
}

export declare interface ParseRuleList extends FormCreate.ParseRuleList<FormRule> {
}

export declare const maker: FormCreate.Maker<Creator, Rule>;

export declare interface create extends FormCreate.Create<FormRule, FormConfig, FormButton> {
}

export declare interface install extends FormCreate.Install {
}

export declare interface init extends FormCreate.Init<FormRule, FormConfig, FormButton> {
}

export declare const MountApi: FormCreate.MountApi<FormRule, FormConfig, FormButton>;


export declare class VData extends FormCreate.VData {

}
