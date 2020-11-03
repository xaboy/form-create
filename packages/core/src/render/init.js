import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {isValidChildren} from '@form-create/utils';


export default function useInit(Render) {
    extend(Render.prototype, {
        initOrgChildren() {
            this.orgChildren = {};
            const parsers = this.$handle.parsers;
            this.orgChildren = Object.keys(parsers).reduce((initial, id) => {
                const children = parsers[id].rule.children;
                initial[id] = is.trueArray(children) ? [...children] : [];

                return initial;
            }, {});

        },
        setOrgChildren(parser) {
            this.orgChildren[parser.id] = is.trueArray(parser.rule.children) ? [...parser.rule.children] : [];
        },
        rmOrgChildren(parser) {
            delete this.orgChildren[parser.id];
            if(isValidChildren(parser.rule.children)){
                parser.rule.children.forEach(h => h.__fc__ && this.rmOrgChildren(h.__fc__));
            }
        },
        clearOrgChildren() {
            this.orgChildren = {};
        },
        run() {
            if (!this.vm.isShow)
                return;

            this.$manager.updateOptions(this.$handle.options);
            this.$manager.beforeRender();

            const vn = this.$handle.sortList.map((id) => {
                return this.renderParser(this.$handle.parsers[id]);
            }).filter((val) => val !== undefined);

            return this.$manager.render(vn);
        },
    })
}
