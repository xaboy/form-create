import {creatorFactory} from '@form-create/core/src/index';

const name = 'input';
export default {
    name,
    maker: (function () {
        return ['password', 'url', 'email', 'text', 'textarea', 'search'].reduce((maker, type) => {
            maker[type] = creatorFactory(name, {type});
            return maker;
        }, {
            idate: creatorFactory(name, {type:'date'})
        });
    }()),
    render(children, ctx) {
        let type = ctx.prop.props.type;
        if (['textarea', 'search'].indexOf(type) === -1) type = 'input';

        type = (type === 'textarea' ? 'ATextarea' : (type === 'search' ? 'AInputSearch' : 'AInput'));
        return ctx.$render.vNode.make(type, ctx.prop, children);
    }
}
