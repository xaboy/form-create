import {defineComponent} from 'vue';

const NAME = 'FcFragment';

export default defineComponent({
    name: NAME,
    functional: true,
    render(h) {
        return h.$slots.default();
    }
})
