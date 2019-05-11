import createFormCreate, {_vue as Vue} from 'src/formCreate';
import Creator, {creatorFactory, creatorTypeFactory} from 'creator';
import Handler from 'handler';
import makerFactory from 'maker';
import Render, {defaultRenderFactory} from 'render';
import VData from 'vData';
import VNode from 'vNode';

export {
    creatorFactory, creatorTypeFactory, Creator,
    Handler, makerFactory, Render, defaultRenderFactory, VData, VNode, Vue
}

export default createFormCreate;
