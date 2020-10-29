import {creatorFactory} from '@form-create/core';

const name = 'hidden';
export default {
    name,
    maker: {
        [name]: (field, value) => creatorFactory('hidden')('', field, value)
    },
    render() {
        return [];
    }
}
