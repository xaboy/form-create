import {functionalMerge, normalMerge, toArrayMerge} from '@form-create/utils/lib/mergeprops';


export const keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'native', 'hidden', 'inject', 'options', 'emit', 'link', 'prefix', 'suffix', 'update'];

export const arrayAttrs = ['validate', 'children', 'control'];

export const normalAttrs = ['effect'];

export function attrs() {
    return [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...arrayAttrs, ...normalAttrs];
}
