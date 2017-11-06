<template>
    <div>
        <header-top title="Title"></header-top>
        <main class="main-content-2">

        </main>
    </div>
</template>
<script>
    import HeaderTop from 'components/header/index'
    import {} from '../../api/index'
    export default {
        name: "JDIndex",
        data() {
            return {

            }
        },
        components: {HeaderTop},
        activated() {

        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    @import '../../style/mixin.less';
</style>
