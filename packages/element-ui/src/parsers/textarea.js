const name = 'textarea';
export default {
    name,
    mergeProp(ctx) {
        let {props} = ctx.prop;
        props.type = 'textarea';
        if (props && props.autosize && props.autosize.minRows) {
            props.rows = props.autosize.minRows || 2;
        }
    }
}
