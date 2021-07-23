import {defineComponent, provide, reactive, toRef, watch} from 'vue';
import {extend} from '@form-create/utils';

const NAME = 'FcFragment';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: ['formCreate'],
    setup(props) {
        const data = toRef(props, 'formCreate');
        const $inject = reactive({...data.value});
        watch(data, () => {
            extend($inject, data.value);
        });
        provide('formCreate', $inject);
    },
    render() {
        return this.$slots.default();
    }
})
