<template>
  <div>
    <header-top title="附近"></header-top>
    <main class='scroll-content-2'>
      <section class="search-container">
        <router-link to="/home/search" class="search-input">
          <span class="iconfont-large self-search"></span>
          <span>搜索商家或商品</span>
        </router-link>
      </section>
      <yd-tab>
        <yd-tab-panel :label="item.columnName" v-for="(item,index) in info" :key="index">

        </yd-tab-panel>
      </yd-tab>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { near } from '../../api/index'
export default {
  name: 'Near',
  data() {
    return {
      info: []
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  created() {

  },
  activated() {
    this.getNear();
  },
  methods: {
    getNear() {
      let vm = this;
      mui.ajax({
        url: near,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          token: md5('near')
        },
        success(res) {
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