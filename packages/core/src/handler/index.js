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
import useRegister from './register';


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
        this.useProvider();
        this.usePage();
        this.loadRule();
        this.$manager.__init();
        this.vm.$set(this.vm, 'formData', this.formData);
    },
})

useInject(Handler);
usePage(Handler);
useRender(Handler);
useLoader(Handler);
useInput(Handler);
useParser(Handler);
useLifecycle(Handler);
useRegister(Handler);
