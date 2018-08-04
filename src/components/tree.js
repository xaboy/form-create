import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray, TA, uniqueId} from "../core/util";
import makerFactory from "../factory/make";
import {render as uploadRender} from '../components/upload';
const handler = handlerFactory({
	init(){
		let props = this.rule.props;
		if(props.data === undefined) props.data = [];
		if(props.type === undefined) props.type = 'checked';
		if(props.multiple === undefined) props.multiple = false;
		if(this.isMultiple() && isArray(this.value))
			this.value = this.value[0] || '';
		this._data = {};
		this.data(props.data);
		let value = TA(this.value);
		value.forEach(this.rule.props.type === 'selected' ? (v)=>this.selected(v) : (v)=>this.checked(v));
		this.value = [];
		props.type === 'selected'
			? Object.keys(this._data).forEach((key)=>{
				let node = this._data[key];
				if(node.selected === true)
					this.value.push(node.id);
			})
			: Object.keys(this._data).forEach((key)=>{
				let node = this._data[key];
				if(node.checked === true)
					this.value.push(node.id);
			});
	},
	toParseValue(value){
		value = [...new Set(TA(value))];
		this.choose(value);
		return value;
	},
	choose(value){
		let {rule,_data} = this;
		rule.props.type === 'selected'
			? Object.keys(_data).forEach((key)=>{
				this.vm.$set(_data[key],'selected',value.indexOf(_data[key].id) !== -1);
			})
			: Object.keys(_data).forEach((key)=>{
				this.vm.$set(_data[key],'checked',value.indexOf(_data[key].id) !== -1);
			});
	},
	checked(v){
		if(this._data[v] !== undefined) {
			this.vm.$set(this._data[v],'checked',true);
		}
	},
	selected(v){
		if(this._data[v] !== undefined) {
			this.vm.$set(this._data[v],'selected',true);
		}
	},
	isMultiple(){
		return (!this.rule.props.multiple) && this.rule.props.type === 'selected';
	},
	toTrueValue(parseValue){
		let value = (this.el.getSelectedNodes === undefined
			? parseValue
			: this.toValue());
		return !this.isMultiple() ? value : (value[0] || '');
	},
	selectedNodeToValue(nodes){
		let value = [];
		nodes.forEach((node)=>{
			if(node.selected === true)
				value.push(node.id);
		});
		return value;
	},
	checkedNodeToValue(nodes){
		let value = [];
		nodes.forEach((node)=>{
			if(node.checked === true)
				value.push(node.id);
		});
		return value;
	},
	toValue(){
		return this.rule.props.type === 'selected'
			? this.selectedNodeToValue(this.el.getSelectedNodes())
			: this.checkedNodeToValue(this.el.getCheckedNodes())
	},
	data(data){
		data.forEach((node)=>{
			this._data[node.id] = node;
			if(node.children !== undefined && isArray(node.children))
				this.data(node.children)
		});
	}
});

const render = renderFactory({
	parse(){
		let {rule,refName,field,unique} = this.handler,props = this.props.on(rule.event).on({
			'on-select-change':(v)=>{
				this.vm.changeTrueData(field,this.handler.toValue());
				rule.event['on-select-change'] && rule.event['on-select-change'](v);
			},
			'on-check-change':(v)=>{
				this.vm.changeTrueData(field,this.handler.toValue());
				rule.event['on-check-change'] && rule.event['on-check-change'](v);
			},
		}).props(rule.props).ref(refName).key(`fip${unique}`);
		return [this.cvm.tree(props.get())];
	}
});

const make = makerFactory('tree',['props','event']);

const component = {handler,render,make};

export default component;

export {
	handler,render,make
}