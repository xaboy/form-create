import VData from './vData';
import VNode from './vNode';


export default class BaseForm {

    constructor(handle) {
        this.$handle = handle;
        this.vm = handle.vm;
        this.drive = this.$handle.fc.drive;
        this.options = handle.options;
        this.vNode = new VNode(this.vm);
        this.vData = new VData();
        this.unique = handle.id;
    }

    init() {
        this.$render = this.$handle.$render;
    }

    beforeRender() {

    }

    render() {

    }
}