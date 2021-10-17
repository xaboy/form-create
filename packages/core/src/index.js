import FormCreateFactory from './frame';
import fragment from './components/fragment';
import Creator, {creatorFactory} from './factory/creator';
import Manager from './factory/manager';
import {copyRule, copyRules, mergeRule, parseJson, toJson} from './frame/util';

export {
    creatorFactory, Creator, Manager,
    parseJson, toJson, copyRule, copyRules, mergeRule, fragment
};

export default FormCreateFactory;
