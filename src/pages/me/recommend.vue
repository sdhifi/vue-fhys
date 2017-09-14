<template>
  <div>
    <header-top title="我推荐的人"></header-top>
    <main class='scroll-content-2'>
      <div v-if="info.length">有数据</div>
      <div v-else class="empty-data">
        <span class="iconfont self-noorder"></span>
        <p>没有数据</p>
      </div>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {getMemberLowerLevel} from '../../api/index'
export default {
  name: 'Recommend',
  data() {
    return {
      pageNo:1,
      info: []
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.getRecommend();
  },
  methods: {
    getRecommend(){
      let vm = this;
      mui.ajax({
        url: getMemberLowerLevel,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          superId:this.$route.params.id,
          pageNo:this.pageNo,
          pageSize:10,
          token:md5(`getMemberLowerLevel${this.$route.params.id}`)
        
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