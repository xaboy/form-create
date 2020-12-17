import FormCreateFactory from './frame';
import Creator, {creatorFactory, creatorTypeFactory} from './factory/creator';
import Manager from './factory/manager';
import {copyRule, copyRules, mergeRule, parseJson, toJson} from './frame/util';

export {
    creatorFactory, creatorTypeFactory, Creator, Manager,
    parseJson, toJson, copyRule, copyRules, mergeRule
};

export default FormCreateFactory;
