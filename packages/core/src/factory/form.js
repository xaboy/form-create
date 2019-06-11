import VData from './vData';
import VNode from './vNode';
import {deepExtend} from '@form-create/utils';


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

    getGetCol(parser) {
        let col = parser.rule.col || {}, mCol = {}, pCol = {};

        if (!this.options.global)
            return col;

        if (this.options.global['*']) {
            mCol = this.options.global['*'].col || {};
        }

        if (this.options.global[parser.type]) {
            pCol = this.options.global[parser.type].col || {};
        }
        col = deepExtend(deepExtend(deepExtend({}, mCol), pCol), col);
        return col;
    }

    beforeRender() {

    }

    render() {

    }

    inputVData() {
    }
}
