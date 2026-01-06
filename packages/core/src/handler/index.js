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
import {deepCopy} from '@form-create/utils/lib/deepextend';


export default function Handler(fc) {
    funcProxy(this, {
        options() {
            return fc.options.value || {};
        },
        bus() {
            return fc.bus;
        },
        preview() {
            if (fc.vm.props.preview != null) {
                return fc.vm.props.preview;
            } else if (fc.vm.setupState.parent && fc.vm.setupState.parent.props.preview != null) {
                return fc.vm.setupState.parent.props.preview;
            }
            return fc.options.value.preview || false;
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
        this.appendData = {...deepCopy(this.options.formData || {}), ...(this.fc.vm.props.modelValue || {}), ...this.appendData};
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
    beforeSubmit(formData) {
        return new Promise((resolve, reject) => {
            const res = this.options.beforeSubmit && invoke(() => this.options.beforeSubmit(formData, {api: this.api}));
            if (res && is.Function(res.then)) {
                res.then(resolve).catch(reject);
            } else if (res === false) {
                reject();
            } else {
                resolve();
            }
        });
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
