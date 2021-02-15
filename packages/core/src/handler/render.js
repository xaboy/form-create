import extend from '@form-create/utils/lib/extend';


export default function useRender(Handler) {
    extend(Handler.prototype, {
        clearNextTick() {
            this.nextTick && clearTimeout(this.nextTick);
            this.nextTick = null;
        },
        bindNextTick(fn) {
            this.clearNextTick();
            this.nextTick = setTimeout(() => {
                fn()
                this.nextTick = null;
            }, 10);
        },
        render() {
            // console.warn('%c render', 'color:green');
            ++this.loadedId;

            if (this.vm.unique > 0)
                return this.$render.render();
            else {
                this.vm.unique = 1;
                return [];
            }
        },
    });
}
