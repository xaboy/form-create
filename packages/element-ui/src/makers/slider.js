import {creatorTypeFactory} from '@form-create/core';

const name = 'slider';

export default {
    sliderRange: creatorTypeFactory(name, true, 'range')
};