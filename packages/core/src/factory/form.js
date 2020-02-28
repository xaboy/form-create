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
        let col = parser.rule.col || {}, mCol = {}, pCol = {}, global = this.options.global;

        if (!global)
            return col;

        if (global['*']) {
            mCol = global['*'].col || {};
        }

        if (global[parser.type] || global[parser.originType]) {
            pCol = global[parser.type].col || global[parser.originType].col || {};
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
