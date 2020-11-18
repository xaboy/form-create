import components from '../components';
import parsers from '../parser';
import alias from './alias';
import manager from './manager';
import createFormCreate from '@form-create/core';
import makers from './maker';

export default function createElmFormCreate() {

    const FormCreate = createFormCreate({
        ui: `${process.env.UI}`,
        version: `${process.env.VERSION}`,
        manager
    });

    FormCreate.componentAlias(alias);

    components.forEach(component => {
        FormCreate.component(component.name, component);
    });

    parsers.forEach((parser) => {
        FormCreate.parser(parser);
    });

    Object.keys(makers).forEach(name => {
        FormCreate.maker[name] = makers[name];
    });

    return FormCreate;
}
