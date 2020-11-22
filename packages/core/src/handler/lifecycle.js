import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';


export default function useLifecycle(Handler) {
    extend(Handler.prototype, {
        mounted() {
            const _mounted = () => {
                this.isMounted = true;
                this.lifecycle('mounted');
            }
            if (this.pageEnd) {
                _mounted();
            } else {
                this.bus.$once('page-end', _mounted);
            }
        },
        lifecycle(name) {
            const fn = this.options[name];
            is.Function(fn) && invoke(() => fn(this.api));
            this.vm.$emit(name, this.api);
        },
    })
}
