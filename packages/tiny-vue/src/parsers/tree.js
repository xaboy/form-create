import mergeProps from '@form-create/utils/lib/mergeprops';
import {hasProperty} from '@form-create/utils/lib/type';

export default {
    name: 'tree',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!hasProperty(props, 'showCheckbox')) {
            props.showCheckbox = true;
        }
        if (!hasProperty(props, 'nodeKey')) {
            props.nodeKey = 'id';
        }
        if (!hasProperty(props, 'defaultCheckedKeys')) {
            props.defaultCheckedKeys = ctx.rule.value;
        }
        mergeProps([{
            on: {
                check() {
                    if (ctx.el) {
                        ctx.prop.model.callback(ctx.el.getCheckedKeys());
                    }
                }
            }
        }], ctx.prop);
    }
};
