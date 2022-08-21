import {err} from '@form-create/utils/lib/console';
import {invoke} from './util';
import is from '@form-create/utils/lib/type';
import deepSet from '@form-create/utils/lib/deepset';

const fetch = function (fc) {

    function parseOpt(option) {
        if (is.String(option)) {
            option = {
                action: option,
                to: 'options'
            }
        }
        return option;
    }

    function run(inject, rule, api) {
        let option = inject.value;
        if (is.Function(option)) {
            option = option(rule, api);
        }
        option = parseOpt(option);
        if (!option || !option.action) {
            return false;
        }
        if (!option.to) {
            option.to = 'options';
        }
        const onError = option.onError;

        const check = () => {
            if (!inject.getValue()) {
                inject.clearProp();
                api.sync(rule);
                return true;
            }
        }

        const set = (val) => {
            if (val === undefined) {
                inject.clearProp();
                api.sync(rule);
            } else {
                deepSet(inject.getProp(), option.to, val);
            }
        }

        invoke(() => fc.create.fetch({
            ...option,
            onSuccess(body) {
                if (check()) return;
                let fn = (v) => v.data;
                if (is.Function(option.parse)) {
                    fn = option.parse;
                }
                set(fn(body, rule, api))
                api.sync(rule);
            },
            onError(e) {
                set(undefined)
                if (check()) return;
                (onError || ((e) => err(e.message || 'fetch fail ' + option.action)))(e, rule, api);
            }
        }, {inject, rule, api}));
        return true;
    }

    return {
        name: 'fetch',
        loaded(...args) {
            run(...args);
        },
        watch(inject, rule, api) {
            if (!run(inject, rule, api)) {
                inject.clearProp();
                api.sync(rule);
            }
        }
    };
}


const $required = {
    name: 'required',
    load(inject, rule, api) {
        const val = parseVal(inject.getValue());
        if (val.required === false) {
            inject.clearProp();
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
        $required.load(...args);
    }
}

function parseVal(val) {
    if (is.Boolean(val)) {
        return {required: val}
    } else if (is.String(val)) {
        return {message: val};
    } else if (is.Function(val)) {
        return {validator: val};
    } else if (!is.Object(val)) {
        return {};
    } else {
        return val;
    }
}

export default {
    fetch,
    required: $required,
};
