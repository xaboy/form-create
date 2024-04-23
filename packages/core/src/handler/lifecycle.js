import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {invoke, parseFn} from '../frame/util';
import toCase from '@form-create/utils/lib/tocase';


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
            const _fn = this.options[name] || this.options[toCase('on-' + name)];
            if (_fn) {
                const fn = parseFn(_fn);
                is.Function(fn) && invoke(() => fn(this.api));
            }
            this.vm.emit(name, this.api);
            this.bus.$emit(name, this.api);
        },
    })
}
