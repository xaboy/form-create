import {creatorFactory} from './creator';

const commonMaker = creatorFactory('');

export function create(type, field, title) {
    let make = commonMaker('', field);
    make._data.type = type;
    make._data.title = title;
    return make;
}

export function createTmp(template, vm, field, title) {
    let make = commonMaker('', field);
    make._data.type = 'template';
    make._data.template = template;
    make._data.title = title;
    make._data.vm = vm;
    return make;
}

export default function makerFactory() {
    return {
        create,
        createTmp,
        template: createTmp,
        factory: creatorFactory
    };
}
