import createFormCreate, {_vue as Vue} from './core/index';
import Creator, {creatorFactory, creatorTypeFactory} from './factory/creator';
import Handle from './core/handle';
import makerFactory from './factory/maker';
import Render from './core/render';
import VNode from './factory/vNode';
import BaseParser from './factory/parser';
import baseApi from './core/api';
import Manager from './factory/manager';
import {parseJson, toJson, copyRules, copyRule} from './core/util';

export {
    creatorFactory, creatorTypeFactory, Creator, Manager,
    Handle, makerFactory, Render, VNode, Vue, BaseParser, parseJson, toJson, baseApi, copyRule, copyRules
};

export default createFormCreate;
