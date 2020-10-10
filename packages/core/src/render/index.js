import VNode from '../factory/vNode';
import useCache from './cache';
import useRender from './render';
import useInit from './init';

export default function Render(handle) {
    this.$handle = handle;
    this.fc = handle.fc;
    this.vm = handle.vm;
    this.options = handle.options;
    this.$manager = handle.$manager;
    this.vNode = new VNode(this.vm);
    this.cache = {};
    this.renderList = {};
}

useInit(Render);
useCache(Render);
useRender(Render)
