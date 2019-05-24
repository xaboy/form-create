import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'tree';

const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

const maker = Object.keys(types).reduce((initial, key) => {
    initial[key] = creatorTypeFactory(name, types[key]);
    return initial;
}, {});

export default {parser, name, maker};
