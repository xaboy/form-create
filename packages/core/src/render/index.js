import VNode from '../factory/vNode';
import useCache from './cache';
import useRender from './render';
import useInit from './init';

export default function Render(handle) {
    this.$handle = handle;
    this.fc = handle.fc;
    this.vm = handle.vm;
    this.$manager = handle.$manager;
    this.vNode = new VNode(this.vm);
    //todo 数据回收
    this.cache = {};
    this.renderList = {};
    this.orgChildren = {};
}

useInit(Render);
useCache(Render);
useRender(Render)
