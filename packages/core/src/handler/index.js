import Api from '../frame/api';
import Render from '../render';
import extend from '@form-create/utils/lib/extend';
import {funcProxy} from '../frame/util';
import useInject from './inject';
import usePage from './page';
import useRender from './render';
import useLoader from './loader';
import useInput from './input';
import useContext from './context';
import useLifecycle from './lifecycle';
import useEffect from './effect';
import {reactive} from 'vue';


export default function Handler(fc) {
    funcProxy(this, {
        options() {
            return fc.options.value || {};
        },
        bus() {
            return fc.bus;
        },
    })
    extend(this, {
        fc,
        vm: fc.vm,
        watching: false,
        loading: false,
        reloading: false,
        noWatchFn: null,
        deferSyncFn: null,
        isMounted: false,
        formData: reactive({}),
        subForm: {},
        form: reactive({}),
        appendData: {},
        providers: {},
        cycleLoad: null,
        loadedId: 1,
        nextTick: null,
        changeStatus: false,
        pageEnd: true,
        nextReload: () => {
            this.lifecycle('reload');
        }
    });

    this.initData(fc.rules);

    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = fc.extendApi(Api(this), this);
}

extend(Handler.prototype, {
    initData(rules) {
        extend(this, {
            ctxs: {},
            fieldCtx: {},
            nameCtx: {},
            sort: [],
            rules,
        });
    },
    init() {
        this.appendData = {...(this.options.formData || {}), ...(this.fc.vm.props.modelValue || {}), ...this.appendData};
        this.useProvider();
        this.usePage();
        this.loadRule();
        this.$manager.__init();
    },
    isBreakWatch() {
        return this.loading || this.noWatchFn || this.reloading;
    }
})

useInject(Handler);
usePage(Handler);
useRender(Handler);
useLoader(Handler);
useInput(Handler);
useContext(Handler);
useLifecycle(Handler);
useEffect(Handler);
