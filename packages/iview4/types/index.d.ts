import {
    FormCreate,
    FormRule as $FormRule,
    Options as $Options,
    Rule as $Rule,
    Creator as $Creator,
    Control as $Control,
    Api as $Api,
    Effect as $Effect,
    Parser as $Parser
} from "@form-create/core";
import ElmMaker from "./maker";
import {CreatorAttrs, OptionAttrs, RuleAttrs} from "./config";

declare const formCreate: FormCreate<ElmMaker, OptionAttrs, CreatorAttrs, RuleAttrs>;
export default formCreate;
export declare const maker: typeof formCreate.maker;
export type FormRule = $FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Options = $Options<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Rule = $Rule<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Effect = $Effect<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Creator = $Creator<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Control = $Control<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Api = $Api<OptionAttrs, CreatorAttrs, RuleAttrs>
export type Parser = $Parser
