import WangEditor from 'wangeditor'

const NAME = 'fcEditor';

let uni = 1;

const _extends = Object.assign || function (a) {
    for (let b, c = 1; c < arguments.length; c++) {
        for (let d in b = arguments[c], b) {
            Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        }
    }

    return a;
}

export default {
    name: NAME,
    props: {
        value: String,
        init: Function,
        disabled: Boolean,
        config: Object,
    },
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
        value(n) {
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
            this.$emit('input', this.editor.txt.html())
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.editor = new WangEditor(`#editor${this.uni}`);
            this.editor.config.zIndex = 2;
            this.config && _extends(this.editor.config, this.config);
            this.init && this.init(this.editor);
            this.editor.create();
            this.enable();
            this.editor.txt.html(this.value);
        });
    },
    render() {
        return <div on-input={this.result} id={`editor${this.uni}`} style="line-height: normal;"/>
    },
    beforeDestroy() {
        this.editor && this.editor.destroy()
        this.editor = null
    }
}
