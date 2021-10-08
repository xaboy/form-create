import WangEditor from 'wangeditor'
import {defineComponent} from 'vue';

const NAME = 'fcEditor';

let uni = 1;

export default defineComponent({
    name: NAME,
    props: {
        modelValue: String,
        init: Function,
        disabled: Boolean,
    },
    inheritAttrs: false,
    emits: ['update:modelValue'],
    data() {
        return {
            editor: {},
            uni: uni++,
        }
    },
    watch: {
        disabled() {
            this.enable();
        },
        modelValue(n) {
            if (n !== this.editor.txt.html()) {
                this.editor.txt.html(n);
            }
        }
    },
    methods: {
        enable() {
            this.disabled ? this.editor.disable() : this.editor.enable();
        },
        result() {
            this.$emit('update:modelValue', this.editor.txt.html())
        }
    },
    mounted() {
        this.editor = new WangEditor(`#editor${this.uni}`);
        this.editor.config.zIndex = 2;
        this.init && this.init(this.editor);
        this.editor.create();
        this.enable();
        this.editor.txt.html(this.modelValue);
    },
    render() {
        const attrs = {...this.$attrs};
        delete attrs.id;
        return <div {...attrs} onInput={this.result} id={`editor${this.uni}`} style="line-height: normal;"/>
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    }
});
