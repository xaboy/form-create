import components from '../components';
import parsers from '../parsers';
import alias from './alias';
import manager from './manager';
import FormCreateFactory from '@form-create/core/src/index';
import makers from './maker';
import '../style/index.css';
import extendApi from './api';
import ElementUI from 'element-plus';

function install(FormCreate) {
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
}

function appUse(app)
{
    app.use(ElementUI);
}

export default function elmFormCreate() {
    return FormCreateFactory({
        ui: `${process.env.UI}`,
        version: `${process.env.VERSION}`,
        manager,
        appUse,
        extendApi,
        install,
        attrs: {
            normal: ['col', 'wrap'],
            array: ['className'],
            key: ['title', 'info'],
        }
    });
}
