import components from '../components';
import parsers from '../parsers';
import alias from './alias';
import manager from './manager';
import FormCreateFactory from '@form-create/core/src/index';
import makers from './maker';
import '../style/index.css';
import extendApi from './api';
import required from './provider';

function install(FormCreate) {
    FormCreate.componentAlias(alias);

    components.forEach(component => {
        FormCreate.component(component.name, component);
    });

    FormCreate.register(required);

    parsers.forEach((parser) => {
        FormCreate.parser(parser);
    });

    Object.keys(makers).forEach(name => {
        FormCreate.maker[name] = makers[name];
    });

    if (typeof window !== 'undefined' && window.ElementPlus) {
        FormCreate.useApp((_, app) => {
            app.use(window.ElementPlus);
        })
    }

}

export default function elmFormCreate() {
    return FormCreateFactory({
        ui: 'process.env.UI',
        version: 'process.env.VERSION',
        manager,
        extendApi,
        install,
        attrs: {
            normal: ['col', 'wrap'],
            array: ['className'],
            key: ['title', 'info'],
        }
    });
}
