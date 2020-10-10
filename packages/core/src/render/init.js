import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';


export default function useInit(Render) {
    extend(Render.prototype, {
        initOrgChildren() {
            const parsers = this.$handle.parsers;
            this.orgChildren = Object.keys(parsers).reduce((initial, id) => {
                const children = parsers[id].rule.children;
                initial[id] = is.trueArray(children) ? [...children] : [];

                return initial;
            }, {});
        },
        run() {
            if (!this.vm.isShow)
                return;

            this.$manager.updateOptions(this.options);
            this.$manager.beforeRender();

            const vn = this.$handle.sortList.map((id) => {
                return this.renderParser(this.$handle.parsers[id]);
            }).filter((val) => val !== undefined);

            return this.$manager.render(vn);
        },
    })
}
