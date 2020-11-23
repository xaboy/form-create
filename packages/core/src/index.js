import formCreateFactory, {_vue as Vue} from './frame';
import Creator, {creatorFactory, creatorTypeFactory} from './factory/creator';
import Parser from './factory/parser';
import Manager from './factory/manager';
import {copyRule, copyRules, parseJson, toJson, mergeRule} from './frame/util';

export {
    creatorFactory, creatorTypeFactory, Creator, Manager,
    Vue, Parser, parseJson, toJson, copyRule, copyRules, mergeRule
};

export default formCreateFactory;
