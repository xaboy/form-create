import {ScopedSlot, VNodeDirective} from "vue/types/vnode";
import Vue, {VNode} from "vue";
import {ExtendedVue} from "vue/types/vue";

export type Options<OptionAttrs extends Object, CreatorAttrs extends Object, RuleAttrs extends Object> =
    BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs>
    & OptionAttrs;

export type Rule<OptionAttrs extends Object, CreatorAttrs extends Object, RuleAttrs extends Object> =
    BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs>
    & RuleAttrs;

export type FormRule<OptionAttrs, CreatorAttrs, RuleAttrs> =
    Rule<OptionAttrs, CreatorAttrs, RuleAttrs>
    | Creator<OptionAttrs, CreatorAttrs, RuleAttrs>;

export declare type Creator<OptionAttrs extends Object, CreatorAttrs extends Object, RuleAttrs extends Object> =
    BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs>
    & CreatorAttrs;

export declare type Maker<MakerAttrs extends Object, OptionAttrs extends Object, CreatorAttrs extends Object, RuleAttrs extends Object> =
    BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs>
    & MakerAttrs;

declare type FormCreateFactory<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs> =
    (config: FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>) => FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>

export default FormCreateFactory;

export interface Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs> {
    (formCreate: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>, opt: any): void;
}

export interface FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs> {
    manager: {
        [key: string]: Object | Function;
    },
    attrs?: {
        key?: string[],
        array?: string[],
        normal?: string[],
    },
    version?: string;
    ui?: string;
    install?: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>
}


export interface FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs> {
    readonly version: string;
    readonly ui: string;
    readonly data: Object;
    readonly maker: Maker<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>;

    (rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[], option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs>): Api<OptionAttrs, CreatorAttrs, RuleAttrs>;

    component(name: string, component: any): void;

    component(component: string | any): any;

    directive(name: string, directive: any): void;

    directive(directive: any): void;

    register(name: string, effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    register(effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    parser(name: string, parser: Parser): void;

    parser(parser: Parser): void;

    use(install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs> | {
        install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>,
        [key: string]: any
    }, Opt?: any);

    componentAlias(alias: { [alias: string]: string }): void;

    copyRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    copyRules(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[]): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[];

    $form(): ExtendedVue<Vue, {}, {}, {}, {}>;

    parseJson(json: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[];

    install(vue: Vue): void;

    create: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs>;

    init(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[], option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs>): {
        mount($el?: Element): Api<OptionAttrs, CreatorAttrs, RuleAttrs>;

        remove(): void;

        destroy(): void;

        $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>;
    }

}


export interface FormData {
    [field: string]: any
}

export interface BindFormData extends FormData {

}

export interface VNodeData {
    slot?: string;
    scopedSlots?: { [key: string]: ScopedSlot | undefined };
    class?: any;
    style?: string | object[] | object;
    props?: { [key: string]: any };
    attrs?: { [key: string]: any };
    domProps?: { [key: string]: any };
    hook?: { [key: string]: Function };
    on?: { [key: string]: Function | Function[] };
    nativeOn?: { [key: string]: Function | Function[] };
    directives?: VNodeDirective[];
}

export interface Control<OptionAttrs, CreatorAttrs, RuleAttrs> {
    value?: any;
    handle?: (val: any, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => boolean;
    rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[];
}

export interface BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs> extends VNodeData {
    type: string;
    field?: string;
    name?: string;
    emitPrefix?: string;
    value?: any;
    emit?: Array<string | { name: string; inject: any }>;
    link?: string[];
    prefix?: string | Object;
    suffix?: string | Object;
    update?: (value: any, $rule: this, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => Boolean | void;
    native?: Boolean;
    hidden?: Boolean;
    display?: Boolean;
    inject?: any;

    validate?: Object[];
    children?: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[];
    control?: Control<OptionAttrs, CreatorAttrs, RuleAttrs>[];
    effect?: {
        [key: string]: any
    };

    [key: string]: any;
}

export interface CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs> {
    (title?: string | Object, field?: string, value?: any, props?: Object): Creator<OptionAttrs, CreatorAttrs, RuleAttrs>
}

export declare interface CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs> {
    (name: string, init: Object | ((m: Creator<OptionAttrs, CreatorAttrs, RuleAttrs>) => Creator<OptionAttrs, CreatorAttrs, RuleAttrs>))
        : CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs>;
}

export class BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs> {

    private _data: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    constructor(type: string, title?: string | Object, field?: string, value?: any, props?: Object) ;

    setProp(key: String, prop: any): this;

    getRule(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    _clone(): Creator<OptionAttrs, CreatorAttrs, RuleAttrs>;

    slot(prop: string): this;

    scopedSlots(prop: { [key: string]: ScopedSlot | undefined });
    scopedSlots(prop: string, key: ScopedSlot | undefined);

    class(prop: any): this;

    style(prop: string | object[] | object): this;

    props(prop: { [key: string]: any }): this;
    props(prop: string, val: any): this;

    attrs(prop: { [key: string]: any }): this;
    attrs(prop: string, val: any): this;

    domProps(prop: { [key: string]: any }, val?: any): this;
    domProps(prop: string, val: any): this;

    on(prop: { [key: string]: Function | Function[] }): this;
    on(prop: string, val: Function | Function[]): this;

    nativeOn(prop: { [key: string]: Function | Function[] }): this;
    nativeOn(prop: string, val: Function | Function[]): this;

    directives(prop: VNodeDirective[]): this;

    type(prop: string): this;

    field(prop: string): this;

    name(prop: string): this;

    emitPrefix(prop: string): this;

    value(prop: any): this;

    emit(prop: Array<string | { name: string; inject: any }>): this;

    link(prop: string[]): this;

    prefix(prop: string | Object): this;

    suffix(prop: string | Object): this;

    update(prop: (value: any, $rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => Boolean | void): this;

    native(prop: Boolean): this;

    hidden(prop: Boolean): this;

    display(prop: Boolean): this;

    inject(prop: any): this;

    validate(prop: Object[]): this;

    children(prop: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[]): this;

    control(prop: Control<OptionAttrs, CreatorAttrs, RuleAttrs>[]): this;

    effect(prop: Object): this;
}

export interface BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs> {
    create(type: string, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs>;

    createTmp(template: string, vm: Vue | Function, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs>;

    template(template: string, vm: Vue | Function, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs>;

    factory: CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs>;
}

export interface BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs> {
    global?: {
        [key: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;
    };
    injectEvent?: boolean;
    formData?: FormData;
    el?: Element | string;
    onSubmit?: (formData: FormData, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
}

export interface Api<OptionAttrs, CreatorAttrs, RuleAttrs> {
    readonly config: Options<OptionAttrs, CreatorAttrs, RuleAttrs>;
    readonly options: Options<OptionAttrs, CreatorAttrs, RuleAttrs>;
    readonly form: BindFormData;
    readonly rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[];

    formData(): FormData;

    formData(field: string | Array<string>): FormData;

    getValue(field: string): any;

    coverValue(formData: FormData): void;

    setValue(formData: FormData): void;

    setValue(field: string, value: any): void;

    changeValue(formData: FormData): void;

    changeValue(field: string, value: any): void;

    changeField(formData: FormData): void;

    changeField(field: string, value: any): void;

    removeField(field: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    removeRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    destroy(): void;

    fields(): string[];

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>, field: string): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>, field: string, child: boolean): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>, field: string): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>, field: string, child: boolean): void;

    hidden(hidden: Boolean): void;

    hidden(hidden: Boolean, field: string | Array<string>): void;

    hiddenStatus(field): Boolean;

    display(hidden: Boolean): void;

    display(hidden: Boolean, field: string | Array<string>): void;

    displayStatus(field): Boolean;

    disabled(disabled: Boolean): void;

    disabled(disabled: Boolean, field: string | Array<string>): void;

    model(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    model(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    component(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    component(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    bind(): BindFormData;

    submitBtnProps(props: Object): void;

    resetBtnProps(props: Object): void;

    reload(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>[]): void;

    updateOptions(options: Options<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    onSubmit(fn: (formData: FormData, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void): void;

    sync(field: string): void;

    sync(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    refresh(clear?: Boolean): void;

    refreshOptions(): void;

    hideForm(hide?: Boolean): void;

    changeStatus(): Boolean;

    clearChangeStatus(): void;

    updateRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    updateRule(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs> }): void;

    mergeRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>): void;

    mergeRules(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs> }): void;

    getRule(id: string): Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    getRule(id: string, origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    getRule(id: string, origin: false): Rule<OptionAttrs, CreatorAttrs, RuleAttrs>;

    updateValidate(id: string, validate: Object[], merge?: Boolean): void;

    updateValidates(validates: { [id: string]: Object[] }, merge?: Boolean): void;

    method(id: string, name: string): (...args: any[]) => any;

    exec(id: string, name: string, ...args: any[]): any;

    toJson(): string;

    trigger(id: string, event: string, ...args: any[]): void;

    el(id: string): any;

    closeModal(id: string): void;

    validate(callback?: (...args: any) => void): void;

    validateField(field: string, callback?: (...args: any) => void): void;

    resetFields(): void;

    resetFields(field: string | string[]): void;

    submit(success: (formData: FormData, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void, fail: ($f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void): void;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    getSubForm(field: string): Api<OptionAttrs, CreatorAttrs, RuleAttrs> | Api<OptionAttrs, CreatorAttrs, RuleAttrs>[];

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

    nextTick(fn: ($f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void): void;

    set<T>(object: object, key: string | number, value: T): T;

    on(event: string | string[], callback: Function): this;

    once(event: string | string[], callback: Function): this;

    off(event?: string | string[], callback?: Function): this;
}


export interface Effect<OptionAttrs, CreatorAttrs, RuleAttrs> {
    name?: string;
    components?: string | string[];
    init?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    loaded?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    watch?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    value?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    control?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    deleted?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
    mounted?: (val: any, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs>, $f: Api<OptionAttrs, CreatorAttrs, RuleAttrs>) => void;
}

export interface Parser {
    name?: string;
    init?: (ctx: Object) => void;
    toFormValue?: (value: any, ctx: Object) => void;
    toValue?: (value: any, ctx: Object) => void;
    mounted?: (ctx: Object) => void;
    render?: (children: VNode[], ctx: Object) => VNode | VNode[];
    mergeProp?: (ctx: Object) => void;
}



