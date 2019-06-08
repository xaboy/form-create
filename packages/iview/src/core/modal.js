import {Vue, VNode} from '@form-create/core';

const vNode = new VNode();
const Modal = (options, cb) => {
    return {
        name: 'fc-modal',
        data() {
            return {
                value: true,
                ...options
            }
        },
        render() {
            vNode.setVm(this);
            return vNode.modal({
                props: this.$data,
                on: {
                    'on-visible-change': this.remove
                }
            }, [cb(vNode, this)])
        },
        methods: {
            onClose() {
                this.value = false;
            },
            remove() {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
};

export function mount(options, content) {
    let $modal = Vue.extend(Modal(options, content)), $vm = new $modal().$mount();
    window.document.body.appendChild($vm.$el);
}

export function defaultOnHandle(src, title) {
    mount({title, footerHide: true}, (vNode) => {
        return vNode.make('img', {
            style: {width: '100%'},
            attrs: {src}
        })
    });
}

export default Modal;
