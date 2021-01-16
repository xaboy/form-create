import WangEditor from 'wangeditor'

const NAME = 'fcEditor';

let uni = 1;

export default {
    name: NAME,
    props: {
        value: String,
        init: Function,
        disabled: Boolean,
    },
    data() {
        return {
            editor: {},
            uni: uni++,
        }
    },
    watch: {
        disabled(n) {
            this.cacheRule.$f.disabled(n);
        },
        value(n) {
            if (n !== this.editor.txt.html()) {
                this.editor.txt.html(n);
            }
        }
    },
    methods: {
        result() {
            this.$emit('input', this.editor.txt.html())
        }
    },
    mounted() {
        this.editor = new WangEditor(`#editor${this.uni}`);
        this.init && this.init(this.editor);
        this.editor.create();
        this.editor.txt.html(this.value);
    },
    render() {
        return <div value={this.value} on-input={this.result} id={`editor${this.uni}`}/>
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    }
}
