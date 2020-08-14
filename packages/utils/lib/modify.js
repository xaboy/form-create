import Vue from 'vue';

export function $set(target, field, value) {
    Vue.set(target, field, value);
}

export function $del(target, field) {
    Vue.delete(target, field);
}
