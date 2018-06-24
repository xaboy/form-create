import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray, uniqueId} from "../core/util";
import makerFactory from "../factory/make";
import {render as uploadRender} from '../components/upload';
const handler = handlerFactory({
    init(){
        let props = this.rule.props;
        if(!props.type) props.type = 'input';
        if(!props.icon) props.icon = 'folder';
        if(!props.width) props.width = '500px';
        if(!props.height) props.height = '370px';
        if(props.spin === undefined) props.spin = true;
        if(!props.title) props.title = '请选择'+this.rule.title;
        if(!props.maxLength) props.maxLength = 0;
	    props.multiple = props.maxLength.toString() !== '1';
        if(props.type === 'file' && props.handleIcon === undefined)
            props.handleIcon = false;
        else
            props.handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon;
        if(props.allowRemove === undefined) props.allowRemove = true;
    },
    toParseValue(value){
        let parseValue,oldValue = value,isArr = isArray(oldValue);
        if(oldValue==='')
            parseValue = [];
        else if (!isArr)
            parseValue = [oldValue];
        else
            parseValue = oldValue;
        this.parseValue = parseValue;
        return parseValue;
    },
    toTrueValue(parseValue){
        return this.rule.props.multiple === true
            ? parseValue
            : (parseValue[0] === undefined
                ? ''
                : parseValue[0]);
    }
});

const eventList = {onOpen:'on-open',onChange:'on-change',onOk:'on-ok'};

const render = renderFactory({
    init(){
        let field = this.handler.field,b = false;
        this.vm.$watch(`formData.${field}`,()=>{
            b === true && this.onChange();
            b = true;
        });
        this._props = this.handler.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
    },
    parse(){
        let type = this._props.type,vNode;
        if(type === 'image')
            vNode = this.makeGroup(this.makeImage());
        else if(type === 'file')
            vNode = this.makeGroup(this.makeFile());
        else
            vNode = this.makeInput();
        return vNode;
    },
    makeInput(hidden){
        let unique = this.handler.unique, props = this.inputProps().props({
            type:"text",
            value:this.handler.parseValue.toString(),
            icon:this._props.icon,
            readonly:true,
        }).on('on-click',()=>{
            this.showModel();
        }).key('ifit'+unique).style({display:hidden === true ? 'none' : 'inline-block'}).get();
        return [this.cvm.input(props)];
    },
    makeGroup(render){
        let unique = this.handler.unique,field = this.handler.field;
        return [this.cvm.make('div',{key:`ifgp1${unique}`,class:{'fc-upload fc-frame':true},ref:this.handler.refName,props:{value:this.vm.formData[field]}},render),
            this.makeInput(true)
        ]
    },
    makeImage(){
        let unique = this.handler.unique;
        let vNode =  this.handler.parseValue.map((src,index)=>{
            return this.cvm.make('div',{key:`ifid1${unique}${index}`,class:{'fc-files':true}},[
                this.cvm.make('img',{key:`ifim${unique}${index}`,attrs:{src}}),
                this.makeIcons(src,unique,index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    },
    makeFile(){
        let unique = this.handler.unique;
        let vNode =  this.handler.parseValue.map((src,index)=>{
            return this.cvm.make('div',{key:`iffd2${unique}${index}`,class:{'fc-files':true}},[
                this.cvm.icon({key:`iff${unique}${index}`,props:{type:"document-text", size:40}}),
                this.makeIcons(src,unique,index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    },
    makeBtn(){
        let props = this.handler.rule.props;
        if(props.maxLength > 0 && this.handler.parseValue.length >= props.maxLength) return ;
        let unique = this.handler.unique;
	    // return this.cvm.make('div',{key:`ifgp2${unique}`,class:{'ivu-upload ivu-upload-select':true}})
        return this.cvm.make('div',{key:`ifbd3${unique}`,class:{'fc-upload-btn':true},on:{click:()=>{
            this.showModel();
        }}},[
            this.cvm.icon({key:`ifbi${unique}`,props:{type:this._props.icon, size:20}})
        ])
    },
    makeSpin(){
        if(true !== this._props.spin) return ;
        let unique = this.handler.unique;
        return this.cvm.make('Spin',{
            props:{fix:true},
            key:'ifsp'+unique,
            class:{
                'fc-spin':true
            }
        },[
            this.cvm.icon({
                props:{
                    type:'load-c',
                    size:18
                },
                class:{
                    'fc-spin-icon-load':true
                },
                key:'ifspi'+unique
            }),
            this.cvm.make('div',{
                domProps:{
                    innerHTML:'加载中...'
                },
                key:'ifspd'+unique
            })
        ])
    },
    makeIcons(src,key,index){
        if(this.issetIcon === true)
            return this.cvm.make('div',{key:`ifis${key}${index}`,class:{'fc-upload-cover':true}},()=>{
                let icon = [];
                if(this._props.handleIcon !== false)
                    icon.push(this.makeHandleIcon(src,key,index));
                if(this._props.allowRemove === true)
                    icon.push(this.makeRemoveIcon(src,key,index));
                return icon;
            });
    },
    makeRemoveIcon(src,key,index){
        return this.cvm.icon({key:`ifri${key}${index}`,props:{type:'ios-trash-outline'},nativeOn:{'click':()=>{
            this.onRemove(src) !== false && this.handler.parseValue.splice(index,1);
        }}});
    },
    makeHandleIcon(src,key,index){
        let props = this._props;
        return this.cvm.icon({key:`ifhi${key}${index}`,props:{type:props.handleIcon.toString()},nativeOn:{'click':()=>{
            this.onHandle(src);
        }}});
    },
    onRemove(src){
        let fn = this.handler.rule.event['on-remove'];
        if(fn)
            return fn(src,this.handler.getValue());
    },
    onHandle(src){
        let fn = this.handler.rule.event['on-handle'];
        if(fn)
            return fn(src);
        else
            this.defaultOnHandle(src);
    },
    showModel(){
        let isShow = false !== this.onOpen(),
            {width,height,src,title} = this._props;
        isShow && this.vm.$Modal.info({
            title:title,
            render:()=>[
                this.makeSpin()
                ,this.cvm.make('iframe',{
                    attrs:{
                        src:src
                    },
                    style:{
                        'height' : height,
                        'border' : "0 none",
                        'width' : "100%",
                    },
                    on:{
                        'load':()=>{
                            this._props.spin === true
                            && document.getElementsByClassName('fc-spin')[0].remove();
                        }
                    },
                    key:`ifmd`+uniqueId()
            })],
            onOk:()=>{
                this.onOk();
            },
            width : width
        });
    }
});
render.prototype.defaultOnHandle = uploadRender.prototype.defaultOnHandle;
Object.keys(eventList).forEach(k=>{
	render.prototype[k] = function () {
		let fn = this.handler.rule.event['on-open'];
		if(fn)
			return fn(this.handler.getValue());
	}
});

const make = makerFactory('frame',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}