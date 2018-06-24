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
    class(classList = throwIfMissing('缺少参数:classList'),status){
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
    directives(directives = throwIfMissing('缺少参数:directives')){
        this._data.directives = concat.call(...this._data.directives,...directives);
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

const keyList = ['ref','key','slot'];
const objList = ['scopedSlots','nativeOn','on','domProps','props','attrs','style'];

keyList.forEach(key=>{
   props.prototype[key] = function (val) {
       this._data[key] = val;
       return this;
   }
});

objList.forEach(key=>{
    props.prototype[key] = function (obj = throwIfMissing('缺少参数:'+key),val) {
	    if(isPlainObject(obj)){
		    this._data[key] = assign({},this._data[key],obj)
	    }else{
		    this._data[key][obj.toString()] = val
	    }
	    return this
    }
});

export default props