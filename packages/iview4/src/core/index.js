import components from '../components';
import parsers from '../parsers';
import getConfig from './config';
import nodes from './nodes';
import formRender from './form';
import createFormCreate, {Creator, VNode} from '@form-create/core';
import makers from '../makers';
import {isPlainObject, toString} from '@form-create/utils';

VNode.use(nodes);

export const drive = {
    ui: process.env.UI,
    version: process.env.VERSION,
    formRender,
    components,
    parsers,
    makers,
    getConfig,
};

const {FormCreate, install} = createFormCreate(drive);

Creator.prototype.event = function (key, value) {
    let event;

    if (!isPlainObject(key)) {
        event = {[key]: value}
    } else {
        event = key;
    }

    Object.keys(event).forEach((eventName) => {
        const name = toString(eventName).indexOf('on-') === 0 ? eventName : `on-${eventName}`;
        this.on(name, event[eventName]);
    });
    return this;
};

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
    if (window.Vue) {
        install(window.Vue);
    }
}

export default FormCreate;
