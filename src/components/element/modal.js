import VNode from "../../factory/vNode";
import {_vue} from "../../core/formCreate";

const vNode = new VNode({});
const Modal = (options, cb) => {
    return {
        name: 'fc-modal',
        data() {
            return {
                visible: true,
                ...options
            }
        },
        render() {
            vNode.setVm(this);
            return vNode.modal({
                props: this.$data,
                on: {
                    close: this.onClose,
                    closed: this.onClosed,
                }
            }, [cb(vNode, this)])
        },
        methods: {
            onClose() {
                this.visible = false;
            },
            onClosed() {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
};

export function mount(options, content) {
    let $modal = _vue.extend(Modal(options, content)), $vm = new $modal().$mount();
    window.document.body.appendChild($vm.$el);
}

export function defaultOnHandle(src) {
    mount({title: '预览'}, (vNode) => {
        return vNode.make('img', {
            style: {width: '100%'},
            attrs: {src}
        })
    });
}

export default Modal;
