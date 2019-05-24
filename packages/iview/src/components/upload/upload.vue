<script>
export default {
    name: 'upload',
    props: {
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            uploadList: []
        }
    },
    render() {
        return (
            <div class="red" {...context.data}>
                {context.props.data}
            </div>
        );
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>

<style scoped>

</style>