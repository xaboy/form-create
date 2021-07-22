import {defineComponent, provide} from 'vue';

const NAME = 'FcFragment';

const PROPS = ['Field', 'Options', 'Rule'];

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: PROPS.map(v => 'formCreate' + v),
    setup(props) {
        Object.keys(props).forEach(k => {
            provide(k, props[k]);
        })
    },
    render() {
        return this.$slots.default();
    }
})
