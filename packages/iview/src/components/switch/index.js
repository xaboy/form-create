import {creatorTypeFactory} from '@form-create/core';
import parser from './parser';

const name = 'switch';

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

export default {parser, name, maker};
