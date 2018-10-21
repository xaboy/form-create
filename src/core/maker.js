import creatorFactory from "../factory/creator";
import componentList from './componentList';
import {uniqueId} from "./util";

const maker = (()=>{
    let _m = {};
    Object.keys(componentList).forEach((name)=>{
        _m[name] = creatorFactory(name);
    });

    _m.number = _m.inputnumber;
    _m.time = _m.timepicker;
    _m.date = _m.datepicker;
    _m.color = _m.colorpicker;

    const commonMaker = creatorFactory('');

    Object.assign(_m,{
        hidden :(function () {
            let make = creatorFactory('hidden');
            return make.bind(make,'');
        }()),
        create(type,field='__mp' + uniqueId()) {
            let make = commonMaker('',field);
            make.rule.type = type;
            return make;
        },
        createTmp(template,vm,field='__mp' + uniqueId()) {
            let make = commonMaker('',field);
            make.rule.type = '__tmp';
            make.rule.template = template;
            make.rule._vm = vm;
            return make;
        },
        number : _m.inputnumber,
        time : _m.timepicker,
        date : _m.datepicker,
        color : _m.colorpicker
    });

    return _m;
})();

export default maker
