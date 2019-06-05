import {creatorTypeFactory} from '@form-create/core';

const name = 'input';

const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((maker, type) => {
    maker[type] = creatorTypeFactory(name, type);
    return maker;
}, {});

maker.idate = creatorTypeFactory(name, 'date');

export default maker;