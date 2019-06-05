import components from './components/index';
import {creatorFactory} from '@form-create/core';



const maker = function () {
    const m = {};
    const names = ['autoComplete','cascader'];

    names.forEach(name=>{
        m[name] = creatorFactory(name);
    });

    m.auto = m.autoComplete
}();

const names = ['autoComplete'];