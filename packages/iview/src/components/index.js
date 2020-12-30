import checkbox from '@form-create/component-ivu-checkbox';
import frame from '@form-create/component-ivu-frame';
import radio from '@form-create/component-ivu-radio';
import select from '@form-create/component-ivu-select';
import tree from '@form-create/component-ivu-tree';
import upload from '@form-create/component-ivu-upload';
import group from '@form-create/component-ivu-group';
import subForm from '@form-create/component-sub-form';
import {ivuVersion} from '../core/config';

const components = [
    checkbox,
    radio,
    select,
    tree,
    subForm,
]

ivuVersion === 3 ? components.push(frame, upload, group) : components.push(frame.v2, upload.v2, group.v2);
export default components;
