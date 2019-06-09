import createFormCreate, {_vue as Vue} from './core/index';
import Creator, {creatorFactory, creatorTypeFactory} from './factory/creator';
import Handle from './core/handle';
import makerFactory from './factory/maker';
import Render from './core/render';
import VData from './factory/vData';
import VNode from './factory/vNode';
import BaseParser from './factory/parser';
import BaseForm from './factory/form';

console.log('-----------------------------')


export {
    creatorFactory, creatorTypeFactory, Creator, BaseForm,
    Handle, makerFactory, Render, VData, VNode, Vue, BaseParser
};

console.log('-----------------------------')

export default createFormCreate;
