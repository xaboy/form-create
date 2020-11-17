import Api from '../frame/api';
import Render from '../render';
import extend from '@form-create/utils/lib/extend';
import {funcProxy} from '../frame/util';
import useInject from './inject';
import usePage from './page';
import useRender from './render';
import useLoader from './loader';
import useInput from './input';
import useHelper from './helper';
import useParser from './parser';
import useLifecycle from './lifecycle';


export default function Handler(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
        watching: false,
        isMounted: false,
        validate: {},
        formData: {},
        subForm: {},
        form: {},
        appendData: {},
        cycleLoad: null,
        loadedId: 1,
        nextTick: null,
        changeStatus: false,
        pageEnd: true,
        nextReload: () => {
            this.lifecycle('reload');
        }
    });

    funcProxy(this, {
        options() {
            return fc.options;
        },
        bus() {
            return fc.bus;
        },
    })

    this.initData(fc.rules);

    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = Api(this);
    this.usePage();
    this.loadRule();
    this.init();
    this.$manager.__init();
}

extend(Handler.prototype, {
    initData(rules) {
        extend(this, {
            fieldList: {},
            parsers: {},
            customData: {},
            sortList: [],
            rules,
            repeatRule: [],
        });
        useHelper(rules);
    },
    init() {
        const vm = this.vm;
        vm.$set(vm, 'formData', this.formData);
        vm.$f = this.api;
        vm.$emit('input', this.api);
        vm._updateValue(this.form);

        const f = this.fieldList;
        Object.keys(f).forEach(k => {
            const p = f[k];
            this.refreshUpdate(p, p.rule.value);
        })
    },
})

useInject(Handler);
usePage(Handler);
useRender(Handler);
useLoader(Handler);
useInput(Handler);
useParser(Handler);
useLifecycle(Handler);
