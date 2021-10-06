import {defineComponent} from 'vue';

const NAME = 'FcVnode';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: ['vnode'],
    render() {
        return this.vnode;
    }
})
