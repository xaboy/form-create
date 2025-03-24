import Api from '../frame/api';
import Render from '../render';
import extend from '@form-create/utils/lib/extend';
import {funcProxy, invoke} from '../frame/util';
import useInject from './inject';
import usePage from './page';
import useRender from './render';
import useLoader from './loader';
import useInput from './input';
import useContext from './context';
import useLifecycle from './lifecycle';
import useEffect from './effect';
import {reactive} from 'vue';
import is from '@form-create/utils/lib/type';


export default function Handler(fc) {
    funcProxy(this, {
        options() {
            return fc.options.value || {};
        },
        bus() {
            return fc.bus;
        },
        preview() {
            return (fc.vm.$options.propsData.preview != null ? fc.vm.$options.propsData.preview : (fc.options.value.preview || false));
        }
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
        subRuleData: reactive({}),
        subForm: {},
        form: reactive({}),
        appendData: {},
        ignoreFields: [],
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
    this.api = fc.extendApiFn.reduce((api, fn) => {
        const extendApi = invoke(() => fn(api, this));
        if (extendApi && extendApi !== api) {
            extend(api, extendApi);
        }
        return api;
    }, Api(this));
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
        this.updateAppendData();
        this.useProvider();
        this.usePage();
        this.loadRule();
        this.$manager.__init();
        this.lifecycle('created');
    },
    updateAppendData() {
        this.appendData = {...(this.options.formData || {}), ...(this.fc.vm.$options.propsData.value || {}), ...this.appendData};
    },
    isBreakWatch() {
        return this.loading || this.noWatchFn || this.reloading;
    },
    globalBeforeFetch(opt) {
        return new Promise((resolve, reject) => {
            const source = this.options.beforeFetch && invoke(() => this.options.beforeFetch(opt, {api: this.api}));
            if (source && is.Function(source.then)) {
                source.then(resolve).catch(reject);
            } else {
                resolve();
            }
        });
    },
    beforeFetch(opt) {
        return new Promise((resolve, reject) => {
            const res = opt && opt.beforeFetch && invoke(() => opt.beforeFetch(opt, {api: this.api}));
            if (res && is.Function(res.then)) {
                res.then(resolve).catch(reject);
            } else if (res === false) {
                reject();
            } else {
                resolve();
            }
        }).then(() => {
            return this.globalBeforeFetch(opt);
        });
    },
})

useInject(Handler);
usePage(Handler);
useRender(Handler);
useLoader(Handler);
useInput(Handler);
useContext(Handler);
useLifecycle(Handler);
useEffect(Handler);
