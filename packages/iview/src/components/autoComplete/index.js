import parser from './parser'
import {creatorFactory} from '@form-create/core';

const name = 'autoComplete';

const maker = {
    auto: creatorFactory(name)
};


export default {parser, name, maker};
