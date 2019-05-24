import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'select';

const maker = {
    selectMultiple: creatorTypeFactory(name, true, 'multiple'),
    selectOne: creatorTypeFactory(name, false, 'multiple'),
};

export default {parser, name, maker};
