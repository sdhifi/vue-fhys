<template>
  <div>
    <header-top title="转移记录"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { findTransferHistory} from '../../api/index'
export default {
  name: 'TransferHistory',
  data() {
    return {
      info:[]
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {

  },
  methods: {
    getInfo(){
      let vm = this;
      mui.ajax({
        url: findTransferHistory,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          type:this.$route.query.type,
          token: md5(`findTransferHistory`)
        },
        success(res){
          vm.info = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';


</style>