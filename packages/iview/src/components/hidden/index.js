import {BaseParser, creatorFactory} from '@form-create/core';

const name = 'hidden';

class parser extends BaseParser {
    render() {
        return [];
    }
}

const maker = {
    [name]: (field, value) => creatorFactory(name)('', field, value)
};

export default {parser, name, maker};
