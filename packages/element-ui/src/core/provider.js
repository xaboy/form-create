import is from '@form-create/utils/lib/type';

const required = {
    name: 'required',
    load(inject, rule, api) {
        const val = parseVal(inject.getValue());
        if (val.required === false) {
            inject.clearProp();
            api.clearValidateState([rule.field]);
        } else {
            const validate = {
                required: true,
                validator(_, v, call) {
                    is.empty(v) ? call(validate.message) : call();
                },
                ...val,
            };
            if (!validate.message) {
                let title = rule.title || '';
                validate.message = ((typeof title === 'object' ? title.title : title) || '') + '不能为空';
            }
            inject.getProp().validate = [validate];
        }
        api.sync(rule);
    },
    watch(...args) {
        required.load(...args);
    }
}

function parseVal(val) {
    if (is.Boolean(val)) {
        return {required: val}
    } else if (is.String(val)) {
        return {message: val};
    } else if (is.Undef(val)) {
        return {required: false};
    } else if (is.Function(val)) {
        return {validator: val};
    } else if (!is.Object(val)) {
        return {};
    } else {
        return val;
    }
}


export default required
