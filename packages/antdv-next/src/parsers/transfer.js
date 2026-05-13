export default {
    name: 'transfer',
    mergeProp(ctx) {
        if (!ctx.prop.props.render) {
            ctx.prop.props.render = (item) => {
                return item.title;
            };
        }
    },

};
