import VNode from '../factory/vNode';
import useCache from './cache';
import useRender from './render';

export default function Render(handle) {
    this.$handle = handle;
    this.fc = handle.fc;
    this.vm = handle.vm;
    this.$manager = handle.$manager;
    this.vNode = new VNode(this.vm);

    this.initCache();
    this.initRender();
}

useCache(Render);
useRender(Render)
