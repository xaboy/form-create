import {creatorFactory} from './creator';

const commonMaker = creatorFactory('');

export function create(type, field, title) {
    let make = commonMaker('', field);
    make._data.type = type;
    make._data.title = title;
    return make;
}

export default function makerFactory() {
    return {
        create,
        factory: creatorFactory
    };
}
