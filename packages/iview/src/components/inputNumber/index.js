import parser from './parser';
import {creatorFactory} from '@form-create/core';


const name = 'inputNumber';


const maker = {
    number: creatorFactory(name)
};

export default {parser, name, maker};
