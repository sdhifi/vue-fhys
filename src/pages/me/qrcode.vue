<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2'  style="background-color:#fff;">
      <img :src="qrInfo.imgAppQrUrl" alt="">
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {myQr} from '../../api/index'
export default {
  name: 'Qrcode',
  data() {
    return {
      qrInfo:{}
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.getQr();
  },
  methods: {
    getQr(){
      let vm = this;
      mui.ajax({
        url: myQr,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          account:this.$store.state.account,
          token:md5('myQr')
        },
        success(res){
          vm.qrInfo = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';

</style>