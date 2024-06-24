import components from '../components';
import parsers from '../parsers';
import alias from './alias';
import manager from './manager';
import FormCreateFactory from '@form-create/core/src/index';
import '../style/index.css';
import extendApi from './api';
import required from './provider';
import {Field} from 'vant';

function install(FormCreate) {
    FormCreate.componentAlias(alias);

    components.forEach(component => {
        FormCreate.component(component.name, component);
    });

    FormCreate.register(required);

    parsers.forEach((parser) => {
        FormCreate.parser(parser);
    });

    if (Field.props) {
        Field.props.modelValue = {
            type: [String, Number, Array, Object],
            default: '',
        };
    }
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
