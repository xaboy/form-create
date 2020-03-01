import components from '../components';
import parsers from '../parsers';
import getConfig from './config';
import nodes from './nodes';
import formRender from './form';
import createFormCreate, {VNode} from '@form-create/core';
import makers from '../makers';

VNode.use(nodes);

export const drive = {
    ui: process.env.UI,
    version: `${process.env.VERSION}`,
    formRender,
    components,
    parsers,
    makers,
    getConfig,
};

const {FormCreate, install} = createFormCreate(drive);

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
    if (window.Vue) {
        install(window.Vue);
    }
}

export default FormCreate;
