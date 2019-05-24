import {creatorFactory, BaseParser} from '@form-create/core';

const name = 'colorPicker';

const maker = {
    color: creatorFactory(name)
};

class parser extends BaseParser {
    watchFormValue(n, h) {
        h.refresh();
    }
}

export default {parser, name, maker};
