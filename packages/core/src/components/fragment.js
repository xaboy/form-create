import {defineComponent, provide, reactive, toRef, watch} from 'vue';
import {extend} from '@form-create/utils';

const NAME = 'FcFragment';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: ['formCreateInject', 'vnode'],
    setup(props) {
        const data = toRef(props, 'formCreateInject');
        const $inject = reactive({...data.value});
        watch(data, () => {
            extend($inject, data.value);
        });
        provide('formCreateInject', $inject);
    },
    render() {
        return this.vnode ? this.vnode : this.$slots.default();
    }
})
