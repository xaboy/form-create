import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
        let props = this.rule.props;
        props.defaultFileList = [];
        props.showUploadList = false;
        props.uploadType = !props.uploadType
            ? 'file'
            : props.uploadType;
        if(props.uploadType === 'file' && props.handleIcon === undefined) props.handleIcon = false;
        this.parseValue = [];
    },
    toParseValue(value) {
        let files = isArray(value)
            ? value
            : ((!value ? [] : [value])
        );
        this.parseValue.splice(0,this.parseValue.length);
        files.forEach((file)=>this.push(file));
	    this.rule.props.defaultFileList = this.parseValue;
        return this.parseValue;
    },
    mounted() {
        this.el = this.vm.$refs[this.refName] || {};
        if(this.el.fileList === undefined) this.el.fileList = [];
        this.changeParseValue(this.el.fileList);
    },
    push(file){
        this.parseValue.push({
            url : file,
            name : this.getFileName(file)
        });
    },
    toTrueValue(parseValue){
        if(!parseValue) return [];
        let files = parseValue.map((file)=>file.url).filter((file)=>file !== undefined);
        return this.rule.props.maxLength <= 1
            ? (files[0] || '')
            : files;
    },
    changeParseValue(parseValue){
        this.parseValue = parseValue;
        this.vm.getTrueData(this.field).rule.props.defaultFileList = parseValue;
    },
	watchTrueValue(n){
		let b = true;
		n.rule.props.defaultFileList.forEach((pic)=>{
			b = b && (pic.percentage === undefined || pic.status === 'finished');
		});
		if(b)
			this.vm.changeFormData(this.field,this.toParseValue(n.value));
	},
    getFileName(pic){
        let res = pic.split('/'),
            file = res[res.length - 1],
            index = file.indexOf('.');
        return index === -1 ? file : file.substr(0,index);
    }
});

const propsEventType = ['beforeUpload','onProgress','onPreview','onRemove','onFormatError','onExceededSize','onError'];

const render = renderFactory({
    init(){
        let handler = this.handler;
	    this.uploadOptions = Object.assign(Object.create(null),this.options.upload,handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        let events = propsEventType.reduce((initial,eventName)=>{
            initial[eventName] = (...arg)=>{
                if(this.uploadOptions[eventName])
                    return this.uploadOptions[eventName].call(null,...arg);
            };
            return initial;
        },{});
        this.propsData = this.props.props(this.uploadOptions)
            .props('onSuccess',(response, file, fileList)=>{
                let url = this.uploadOptions.onSuccess.call(null,response, file, fileList);
                if(url) {
                    file.url = url;
                    file.name = handler.getFileName(url);
                }
        }).props(events).ref(handler.refName).key(`fip${handler.unique}`).get();
    },
	defaultOnHandle(src){
		this.vm.$Modal.info({
			title:"预览",
			render:(h)=>{
				return h('img',{attrs:{src},style:"width: 100%"});
			}
		});
	},
	onHandle(src) {
		let fn = this.uploadOptions.onHandle;
		if (fn)
			return fn(src);
		else
			this.defaultOnHandle(src);
	},
    parse(){
	    let {rule,unique} = this.handler;
	    this.uploadOptions = Object.assign(Object.create(null),this.options.upload,rule.props);
	    if(this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        let value = this.vm.formData[this.handler.field],
            render = [...value.map((file,index)=>{
                if(file.status === undefined || file.status === 'finished'){
                    return this.makeUploadView(file.url,`${index}${unique}`,index)
                }else if(file.showProgress){
                    return this.makeProgress(file,`${index}${unique}`);
                }
            })];
        render.push(this.makeUploadBtn(unique,(!this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.formData[this.handler.field].length)));
        return [this.cvm.make('div',{key:`div4${unique}`,class:{'fc-upload':true}},render)];
    },
    makeUploadView(src,key,index){
        return this.cvm.make('div',{key:`div1${key}`,class:{'fc-files':true}},()=>{
            let container = [];
            if(this.handler.rule.props.uploadType === 'image'){
                container.push(this.cvm.make('img',{key:`img${key}`,attrs:{src}}));
            }else{
                container.push(this.cvm.icon({key:`file${key}`,props:{type:"document-text", size:40}}))
            }
            if(this.issetIcon)
                container.push(this.makeIcons(src,key,index));
            return container;
        });
    },
    makeIcons(src,key,index){
        return this.cvm.make('div',{key:`div2${key}`,class:{'fc-upload-cover':true}},()=>{
            let icon = [];
            if(!!this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(src,key,index));
            if(this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(src,key,index));
            return icon;
        });
    },
    makeProgress(file,unique) {
        return this.cvm.make('div', {key:`div3${unique}`,class: {'fc-files': true}}, [
            this.cvm.progress({key:`upp${unique}`,props:{percent:file.percentage,hideInfo:true}})
        ]);
    },
    makeUploadBtn(unique,isShow){
        return this.cvm.upload(this.propsData,
            isShow === true ?[
            this.cvm.make('div',{key:`div5${unique}`,class:{'fc-upload-btn':true}},[
                this.cvm.icon({key:`upi${unique}`,props:{type:"camera", size:20}})
            ])
        ] : []);
    },
    makeRemoveIcon(src,key,index){
        return this.cvm.icon({key:`upri${key}${index}`,props:{type:'ios-trash-outline'},nativeOn:{'click':()=>{
            this.handler.el.fileList.splice(index,1);
            this.handler.changeParseValue(this.handler.el.fileList);
        }}});
    },
    makeHandleIcon(src,key,index){
        return this.cvm.icon({key:`uphi${key}${index}`,props:{type:this.uploadOptions.handleIcon.toString()},nativeOn:{'click':()=>{
            this.onHandle(src);
        }}});
    }
});

const make = makerFactory('upload',['props','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}