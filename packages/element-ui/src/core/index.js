import components from '../components';
import parsers from '../parsers';
import alias from './alias';
import manager from './manager';
import createFormCreate, {VNode} from '@form-create/core';
import makers from '../makers';

export default function createElmFormCreate() {

    VNode.use(alias);

    const FormCreate = createFormCreate({
        ui: process.env.UI,
        version: `${process.env.VERSION}`,
        manager
    });

    components.forEach(component => {
        FormCreate.component(component.name, component);
    });

    parsers.forEach(({name, parser}) => {
        FormCreate.setParser(name, parser);
    });

    Object.keys(makers).forEach(name => {
        FormCreate.maker[name] = makers[name];
    });

    return FormCreate;
}
