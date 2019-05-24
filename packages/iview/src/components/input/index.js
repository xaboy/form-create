import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'input';

const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial;
}, {});

maker.idate = creatorTypeFactory(name, 'date');


export default {parser, name, maker};
