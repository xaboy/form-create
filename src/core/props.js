import {throwIfMissing,isPlainObject,concat,assign,isArray} from './util';

const props = function () {
    this._data = this._initData();
    this._prev = null;
};

let _instance = null;

props.instance = ()=>{
    if(false === _instance instanceof props)
        _instance = new props;
    return _instance;
};

props.prototype = {
    _initData(){
        return {
            class:{},
            style:{},
            attrs:{},
            props:{},
            domProps:{},
            on:{},
            nativeOn:{},
            directives:[],
            scopedSlots:{},
            slot:undefined,
            key:undefined,
            ref:undefined
        };
    },
    class(classList = throwIfMissing('缺少参数:classList'),status = undefined){
        if(isArray(classList)){
            classList.map((cls)=>{
                this._data.class[cls.toString()] = true
            })
        }else if(isPlainObject(classList)){
            this._data.class = assign({},this._data.class,classList)
        }else{
            this._data.class[classList.toString()] = (status === undefined ? true : status)
        }
        return this
    },
    style(style = throwIfMissing('缺少参数:style'),value = undefined){
        if(isPlainObject(style)){
            this._data.style = assign({},this._data.style,style)
        }else if(value !== undefined){
            this._data.style[style.toString()] = value
        }
        return this
    },
    attrs(attrs = throwIfMissing('缺少参数:attrs'),value = ''){
        if(isPlainObject(attrs)){
            this._data.attrs = assign({},this._data.attrs,attrs)
        }else{
            this._data.attrs[attrs.toString()] = value
        }
        return this
    },
    props(props = throwIfMissing('缺少参数:props'),value = undefined){
        if(isPlainObject(props)){
            this._data.props = assign({},this._data.props,props)
        }else{
            this._data.props[props.toString()] = value
        }
        return this
    },
    domProps(domProps = throwIfMissing('缺少参数:domProps'),value = undefined){
        if(isPlainObject(domProps)){
            this._data.domProps = assign({},this._data.domProps,domProps)
        }else{
            this._data.domProps[domProps.toString()] = value
        }
        return this
    },
    on(onType = throwIfMissing('缺少参数:onType'),call = function(){}){
        if(isPlainObject(onType)){
            this._data.on = assign({},this._data.on,onType)
        }else{
            this._data.on[onType.toString()] = call
        }
        return this
    },
    nativeOn(onType = throwIfMissing('缺少参数:onType'),call = function(){}){
        if(isPlainObject(onType)){
            this._data.nativeOn = assign({},this._data.nativeOn,onType)
        }else{
            this._data.nativeOn[onType.toString()] = call
        }
        return this
    },
    directives(directives = throwIfMissing('缺少参数:directives')){
        this._data.directives = concat.call(...this._data.directives,...directives);
        return this
    },
    scopedSlots(scopedSlot = throwIfMissing('缺少参数:scopedSlot'),call = function(){}){
        if(isPlainObject(scopedSlot)){
            this._data.scopedSlots = assign({},this._data.scopedSlots,scopedSlot)
        }else{
            this._data.scopedSlots[scopedSlot.toString()] = call
        }
        return this
    },
    slot(slot){
        this._data.slot = slot;
        return this
    },
    key(key){
        this._data.key = key;
        return this
    },
    ref(ref){
        this._data.ref = ref;
        return this
    },
    init(){
        this._data = this._initData()
    },
    get(){
        this._prev = this._data;
        this.init();
        return this._prev
    },
    getPrev(){
        return this._prev
    }
};


export default props