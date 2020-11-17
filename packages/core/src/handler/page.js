import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';


export default function usePage(Handler) {
    extend(Handler.prototype, {
        usePage() {
            const page = this.options.page;
            if (!page) return;
            let first = 18;
            let limit = getLimit(this.rules);
            if (is.Object(page)) {
                if (page.first) first = parseInt(page.first, 10) || first;
                if (page.limit) limit = parseInt(page.limit, 10) || limit;
            }
            extend(this, {
                first,
                limit,
                pageEnd: this.rules.length <= first,
            })

            this.bus.$on('page-end', () => this.vm.$emit('page-end', this.api));
            this.pageLoad();
        },
        pageLoad() {
            this.api.nextTick(() => {
                if (this.pageEnd) {
                    this.bus.$emit('page-end');
                } else {
                    this.first += this.limit;
                    this.pageEnd = this.rules.length <= this.first;
                    this.loadRule();
                    this.pageLoad();
                    this.refresh();
                }
            });
        },
    })
}


function getLimit(rules) {
    return rules.length < 31 ? 31 : Math.ceil(rules.length / 3);
}
