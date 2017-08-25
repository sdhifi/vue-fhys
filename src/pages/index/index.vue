<template>
    <div>
        <header-top></header-top>
        <main class="scroll-content">
           
        </main>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
export default {
    name: 'Home',
    data() {
        return {
            
        }
    },
    components: { HeaderTop, FooterBar }

}
</script>
<style lang='less' scoped>

</style>