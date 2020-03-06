import createFormCreate, {_vue as Vue} from './core/index';
import Creator, {creatorFactory, creatorTypeFactory} from './factory/creator';
import Handle from './core/handle';
import makerFactory from './factory/maker';
import Render from './core/render';
import VData from './factory/vData';
import VNode from './factory/vNode';
import BaseParser from './factory/parser';
import BaseForm from './factory/form';
import baseApi from './core/api';
import {parseJson, toJson, copyRules, copyRule} from './core/util';

export {
    creatorFactory, creatorTypeFactory, Creator, BaseForm,
    Handle, makerFactory, Render, VData, VNode, Vue, BaseParser, parseJson, toJson, baseApi, copyRule, copyRules
};

export default createFormCreate;
