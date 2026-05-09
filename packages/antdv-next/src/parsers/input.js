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
    modelField: 'value',
    render(children, ctx) {
        let type = ctx.prop.props.type;
        if (['textarea', 'search', 'password'].indexOf(type) === -1) type = 'input';

        type = {textarea: 'aTextarea', search: 'aInputSearch', password: 'aInputPassword'}[type] || 'aInput'
        return ctx.$render.vNode.make(type, ctx.prop, children);
    }
}
