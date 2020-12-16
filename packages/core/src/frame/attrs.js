import {functionalMerge, normalMerge, toArrayMerge} from '@form-create/utils/lib/mergeprops';


export const keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'title', 'native', 'info', 'hidden', 'inject', 'options', 'emit', 'link', 'prefix', 'suffix', 'update'];

export const arrayAttrs = ['validate', 'children', 'control', 'className'];

export const normalAttrs = ['col', 'effect', 'formItem'];

export const attrs = [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...arrayAttrs, ...normalAttrs];

export const allAttrs = [...attrs, 'ref', 'key'];
