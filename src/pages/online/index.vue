<template>
  <div>
    <header-top title="网上商城" :back="false"></header-top>
    <main class='scroll-content'>
      
    </main>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'Online',
  data() {
    return {
      oldBack: mui.back,
    }
  },
  components: { HeaderTop ,FooterBar},
  computed: {

  },
  mixins:[mixin],
  beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.plusReady();
        })
    },
    beforeRouteLeave(to, from, next) {
        mui.back = this.oldBack;
        next();
    },
  created() {

  },
  activated() {

  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';


</style>