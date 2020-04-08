import {creatorTypeFactory} from '@form-create/core';

const name = 'select';

export default {
    selectMultiple: creatorTypeFactory(name, true, 'multiple'),
    selectOne: creatorTypeFactory(name, false, 'multiple'),
};