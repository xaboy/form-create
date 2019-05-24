import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'slider';

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};


export default {parser, name, maker};
