import {ScopedSlot, VNodeDirective} from "vue/types/vnode";
import Vue, {VNode} from "vue";
import {ExtendedVue} from "vue/types/vue";
import {PluginObject} from "vue/types/plugin";

export type Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & OptionAttrs;

export type Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & RuleAttrs;

export type FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    | Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

export declare type Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & CreatorAttrs;

export declare type Maker<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & MakerAttrs;

export declare type Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseApi<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & ApiAttrs;

declare type FormCreateFactory<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    (config: FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

export default FormCreateFactory;

export interface Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (formCreate: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, opt: any): void;
}

export interface FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    manager: {
        [key: string]: Object | Function;
    },
    attrs?: {
        key?: string[],
        array?: string[],
        normal?: string[],
    },
    extendApi?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, h: Object) => Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    version?: string;
    ui?: string;
    install?: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
}


export interface FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> extends PluginObject<Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>> {
    readonly version: string;
    readonly ui: string;
    readonly data: Object;
    readonly maker: Maker<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    (rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[], option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    fetch(option: FetchOption, effectArgs: Object): void,

    component(name: string, component: any): void;

    component(component: string | any): any;

    directive(name: string, directive: any): void;

    directive(directive: any): void;

    register(name: string, effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    register(effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    parser(name: string, parser: Parser): void;

    parser(parser: Parser): void;

    parseFn(val: any): any;

    use(install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | {
        install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
        [key: string]: any
    }, Opt?: any): void;

    componentAlias(alias: { [alias: string]: string }): void;

    copyRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    copyRules(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    $form(): ExtendedVue<Vue, {}, {}, {}, {}>;

    parseJson(json: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    toJson(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[], space?: string | number): string;

    install(vue: typeof Vue, options?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    create: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    factory(inherit?: boolean): FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getApi(name: string): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | undefined;

    init(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[], option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): {
        mount($el?: Element): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

        remove(): void;

        destroy(): void;

        api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    }

}


export interface FormData {
    [field: string]: any
}

export interface BindFormData extends FormData {

}

export interface VNodeData {
    type?: string;
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


export interface VNodeRule extends VNodeData {
    children?: Array<VNodeRule | string>;
}

export interface Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    value?: any;
    handle?: (val: any, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => boolean;
    method?: 'display' | 'disabled' | 'hidden' | 'required';
    condition?: '==' | '!=' | '<>' | '>' | '>=' | '<' | '<=' | 'in' | 'notIn' | 'on' | 'notOn' | 'between' | 'notBetween';
    rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[] | string[];
}

export interface BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> extends VNodeData {
    field?: string;
    key?: string;
    name?: string;
    emitPrefix?: string;
    value?: any;
    emit?: Array<string | { name: string; inject: any }>;
    nativeEmit?: Array<string | { name: string; inject: any }>;
    link?: string[];
    sync?: string[];
    prefix?: string | VNodeRule;
    suffix?: string | VNodeRule;
    update?: (value: any, $rule: this, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, arg: {origin: 'change' | 'init' | 'link'}) => boolean | void;
    options?: Object[];
    optionsTo?: string;
    deep?: Object;
    native?: boolean;
    hidden?: boolean;
    preview?: boolean;
    cache?: boolean;
    component?: ExtendedVue<Vue, {}, {}, {}, {}>;
    display?: boolean;
    inject?: any;

    validate?: Object[];
    children?: Array<FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | string>;
    control?: Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];
    effect?: {
        fetch?: String | FetchEffectOption | ((rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => FetchEffectOption),
        componentValidate?: string | boolean;
        required?:boolean | string | object;
        loadData?:LoadDataEffectOption | Array<LoadDataEffectOption>
        [key: string]: any
    };

    [key: string]: any;
}

export interface CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (title?: string | Object, field?: string, value?: any, props?: Object): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
}

export declare interface CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (name: string, init: Object | ((m: Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>))
        : CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
}

export class BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {

    private _data: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    constructor(type: string, title?: string | Object, field?: string, value?: any, props?: Object) ;

    setProp(key: String, prop: any): this;

    getRule(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    _clone(): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    slot(prop: string): this;

    scopedSlots(prop: { [key: string]: ScopedSlot | undefined }): this;
    scopedSlots(prop: string, key: ScopedSlot | undefined): this;

    class(prop: any): this;

    style(prop: string | object[] | object): this;

    props(prop: { [key: string]: any }): this;
    props(prop: string, val: any): this;

    key(key: string): this;

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

    preview(prop: boolean): this;

    cache(prop: boolean): this;

    component(prop: ExtendedVue<Vue, {}, {}, {}, {}>): this;

    field(prop: string): this;

    name(prop: string): this;

    emitPrefix(prop: string): this;

    value(prop: any): this;

    emit(prop: Array<string | { name: string; inject: any }>): this;

    link(prop: string[]): this;

    sync(prop: string[]): this;

    prefix(prop: string | VNodeRule): this;

    suffix(prop: string | VNodeRule): this;

    update(prop: (value: any, $rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => boolean | void): this;

    native(prop: boolean): this;

    hidden(prop: boolean): this;

    display(prop: boolean): this;

    inject(prop: any): this;

    deep(deep: Object): this;

    validate(prop: Object[]): this;

    children(prop: Array<FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | string>): this;

    control(prop: Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): this;

    effect(prop: Object): this;

    options(options: Array<Object>): this;

    optionsTo(to: string): this;

    nativeEmit(emit: Array<string | { name: string; inject: any }>): this;
}

export interface BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    create(type: string, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    createTmp(template: string, vm: Vue | Function, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    template(template: string, vm: Vue | Function, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    html: CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    factory: CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
}

export interface BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    global?: {
        [key: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    };
    injectEvent?: boolean;
    appendValue?: boolean;
    forceCoverValue?: boolean;
    preview?: boolean;
    formData?: FormData;
    el?: Element | string;
    page?: boolean | {
        limit?: number;
        first?: number;
    };
    onSubmit?: (formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    beforeFetch?: (config: FetchEffectOption, form: {
        api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
        rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    }) => void;
    mounted?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    reload?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
}


export interface BaseApi<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    readonly config: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    readonly options: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    readonly form: BindFormData;
    readonly rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];
    readonly parent: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | undefined;
    readonly children: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

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

    removeField(field: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    removeRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    destroy(): void;

    fields(): string[];

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string, child: boolean): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string, child: boolean): void;

    hidden(hidden: boolean): void;

    hidden(hidden: boolean, field: string | Array<string>): void;

    hiddenStatus(field: String): boolean;

    display(hidden: boolean): void;

    display(hidden: boolean, field: string | Array<string>): void;

    displayStatus(field: String): boolean;

    disabled(disabled: boolean): void;

    disabled(disabled: boolean, field: string | Array<string>): void;

    model(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    model(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    component(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    component(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    bind(): BindFormData;

    reload(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): void;

    updateOptions(options: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    onSubmit(fn: (formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void): void;

    sync(field: string | string[]): void;

    sync(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): void;

    refresh(): void;

    refreshOptions(): void;

    hideForm(hide?: boolean): void;

    changeStatus(): boolean;

    clearChangeStatus(): void;

    setEffect(id: string, attr: string, value: any): void;

    clearEffectData(id: string, attr?: string): void;

    updateRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    updateRule(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> }): void;

    mergeRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    mergeRules(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> }): void;

    getRule(id: string): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getRule(id: string, origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getRule(id: string, origin: false): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    updateValidate(id: string, validate: Object[], merge?: boolean): void;

    updateValidates(validates: { [id: string]: Object[] }, merge?: boolean): void;

    refreshValidate(): void;

    method(id: string, name: string): (...args: any[]) => any;

    exec(id: string, name: string, ...args: any[]): any;

    toJson(space?: string | number): string;

    trigger(id: string, event: string, ...args: any[]): void;

    el(id: string): any;

    closeModal(id: string): void;

    resetFields(): void;

    resetFields(field: string | string[]): void;

    getSubForm(field: string): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    nextTick(fn: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void): void;

    nextRefresh(fn: Function): void;

    deferSyncValue(fn: Function, autoSync?: boolean): void;

    set<T>(object: object, key: string | number, value: T): T;

    on(event: string | string[], callback: Function): this;

    once(event: string | string[], callback: Function): this;

    off(event?: string | string[], callback?: Function): this;

    [key: string]: any;
}

export interface EffectValue {
    value: any;
    getProp: () => Object;
    clearProp: () => void;
    getValue: () => any;
    mergeProp: (prop: Object) => Object;
}

export interface Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    name?: string;
    components?: string | string[];
    init?: (data: { value: any, getValue: () => any; repeat: boolean; }, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    load?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    loaded?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    watch?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    value?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    control?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    deleted?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    mounted?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
}

export interface Parser {
    name?: string;
    merge?: boolean;
    init?: (ctx: Object) => void;
    toFormValue?: (value: any, ctx: Object) => void;
    toValue?: (value: any, ctx: Object) => void;
    mounted?: (ctx: Object) => void;
    render?: (children: VNode[], ctx: Object) => VNode | VNode[];
    preview?: (children: VNode[], ctx: Object) => VNode | VNode[];
    mergeProp?: (ctx: Object) => void;
}

export interface FetchOption {
    action: String;
    method?: String;
    data?: Object;
    dataType?: 'json';
    headers?: Object;
    withCredentials?: boolean;
    onSuccess: (body: any) => void
    onError?: (e: Error | ProgressEvent) => void;
}

export interface FetchEffectOption {
    action: String | Promise<any>;
    to?: String;
    parse?: String | ((body: any, rule: Object, api: Object) => any);
    method?: String;
    data?: Object;
    dataType?: 'json';
    headers?: Object;
    withCredentials?: boolean;
    onError?: (e: Error | ProgressEvent, rule: Object, api: Object) => void;
}

export interface LoadDataEffectOption {
    attr: String;
    to?: String;
    copy?: boolean;
    watch?: boolean;
}


