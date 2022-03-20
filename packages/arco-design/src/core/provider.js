import is from '@form-create/utils/lib/type';

const required = {
    name: 'required',
    load(inject, rule, api) {
        const val = parseVa(inject.getValue());
        if (val.required === false) {
            inject.clearProp();
        } else {
            const validate = {
                ...val,
                required: true,
                validator(v, call) {
                    is.empty(v) && call(validate.message);
                }
            };
            if (!validate.message) {
                validate.message = rule.title + ' is required';
            }
            inject.getProp().validate = [validate];
        }
        api.sync(rule);
    },
    watch(...args) {
        required.load(...args);
    }
}

function parseVa(val) {
    if (is.Boolean(val)) {
        return {required: val}
    } else if (is.String(val)) {
        return {message: val};
    } else if (!is.Object(val)) {
        return {};
    } else {
        return val;
    }
}

export default required
