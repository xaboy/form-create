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
import Maker from "./maker";
import {ApiAttrs, CreatorAttrs, OptionAttrs, RuleAttrs} from "./config";

declare module 'vue/types/vue' {
    interface Vue {
        $formCreate: FormCreate<Maker, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    }
}

declare const formCreate: FormCreate<Maker, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
export default formCreate;
export declare const maker: typeof formCreate.maker;
export type FormRule = $FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Options = $Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Rule = $Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Effect = $Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Creator = $Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Control = $Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Api = $Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
export type Parser = $Parser
