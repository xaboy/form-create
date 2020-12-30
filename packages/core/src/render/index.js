import useCache from './cache';
import useRender from './render';
import extend from '@form-create/utils/lib/extend';
import {funcProxy} from '../frame/util';

export default function Render(handle) {
    extend(this, {
        $handle: handle,
        fc: handle.fc,
        vm: handle.vm,
        $manager: handle.$manager,
        vNode: new handle.fc.CreateNode(handle.vm),
    });

    funcProxy(this, {
        options() {
            return handle.options;
        },
        sort() {
            return handle.sort;
        }
    })

    this.initCache();
    this.initRender();
}

useCache(Render);
useRender(Render)
