import {creatorFactory} from '@form-create/core/src/index';

const name = 'input';

const alias = {
    input: 'Input',
    textarea: 'Textarea',
    search: 'InputSearch',
    password: 'InputPassword',
}

export default {
    name,
    maker: (function () {
        return ['password', 'url', 'email', 'text', 'textarea', 'search'].reduce((maker, type) => {
            maker[type] = creatorFactory(name, {type});
            return maker;
        }, {
            idate: creatorFactory(name, {type: 'date'})
        });
    }()),
    render(children, ctx) {
        let type = ctx.prop.props.type;
        if (['textarea', 'search', 'password'].indexOf(type) === -1) type = 'input';
        return ctx.$render.vNode.make('A' + alias[type], ctx.prop, children);
    }
}
