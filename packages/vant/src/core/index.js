import components from '../components';
import parsers from '../parsers';
import alias from './alias';
import manager from './manager';
import FormCreateFactory from '@form-create/core/src/index';
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
}

export default function VantFormCreate() {
    return FormCreateFactory({
        ui: 'process.env.UI',
        version: 'process.env.VERSION',
        manager,
        extendApi,
        install,
        isMobile: true,
        attrs: {
            normal: ['col', 'wrap'],
            key: ['title', 'info'],
        }
    });
}
