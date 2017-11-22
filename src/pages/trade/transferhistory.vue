<template>
  <div>
    <header-top :title="$route.query.type==0?'转移记录':'合并记录'"></header-top>
    <main class='scroll-content-2'>
      <yd-infinitescroll :callback="getInfo" ref="historyList">
        <ul slot="list">
          <li class="item">

          </li>
        </ul>
      </yd-infinitescroll>
    </main>
  </div>
</template>
<script>
import {mapState} from "vuex"
import HeaderTop from 'components/header/index'
import { findTransferHistory} from '../../api/index'
import {mixin} from "components/common/mixin"
export default {
  name: 'TransferHistory',
  data() {
    return {
      pageNo:1,
      info:[]
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account'])
  },
  created() {

  },
  mixins:[mixin],
  activated() {
this.getInfo();
  },
  methods: {
    getInfo(){
      let vm = this;
      mui.ajax({
        url: findTransferHistory,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          account:this.account,
          type:this.$route.query.type,
          pageNo:1,
          pageSize:10,
          token: md5(`findTransferHistory`)
        },
        success(res){
          let _result = res.result;
          vm.info = [...vm.info,..._result];
          if (_result.length < 10) {
            vm.$refs.historyList.$emit("ydui.infinitescroll.loadedDone");
            return;
          }
          vm.$refs.historyList.$emit("ydui.infinitescroll.finishLoad");
          vm.pageNo++;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';


</style>