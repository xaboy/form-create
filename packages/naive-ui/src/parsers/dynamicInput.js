import is from '@form-create/utils/lib/type';

export default {
    name: 'dynamicInput',
    modelField: 'value',
    toFormValue(value) {
        return is.Undef(value) ? [] : value;
    }
}

