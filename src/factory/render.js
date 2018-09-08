import cvm from '../core/cvm';
import props from '../core/props';
import {uniqueId} from '../core/util';

const renderFactory = function (prototypeExtend) {
    let $r = function (vm,handler,options) {
        render.call(this,vm,handler,options);
    };
    $r.prototype = Object.create(render.prototype);
    Object.assign($r.prototype, prototypeExtend);
    $r.prototype.constructor = $r;
    return $r;
};



const render = function (vm, handler, options = {}) {
    this.handler = handler;
    this.options = options;
    this.vm = vm;
    this.cvm = cvm.instance(vm.$createElement);
    this.event = handler.rule.event;
    this.init();
};

render.prototype = {
    props: props.instance(),
    init(){
        this.handler.rule = Object.assign(this.handler.rule,{ref:this.handler.refName,key:'fco' + uniqueId()});
    },
    parse(){
        let {type,rule,childrenHandlers} = this.handler;
        return [this.cvm.make(type,Object.assign({},rule),()=> {
            let vn = [];
            if(childrenHandlers.length > 0)
                vn = childrenHandlers.map((handler)=>{
                    return this.parse.call(handler.render);
                });
            return vn;
        })];
    },
    inputProps(){
        let {refName,unique,field,rule:{props}} = this.handler;
        return this.props
            .props(Object.assign(props,{model:`cptData.${field}`,value:this.vm.cptData[field],elementId:refName}))
            .ref(refName).key(`fip${unique}`).on(this.event).on('input',(value)=>{
                this.vm.$emit('input',value);
                this.vm.$set(this.vm.cptData,field,value);
            });
    }
};

export default renderFactory;
