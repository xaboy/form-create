import {creatorTypeFactory} from '@form-create/core';

const name = 'tree';

const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

export default Object.keys(types).reduce((maker, key) => {
    maker[key] = creatorTypeFactory(name, types[key]);
    return maker;
}, {});