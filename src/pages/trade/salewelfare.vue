<template>
  <div>
    <header-top title="销售福利"></header-top>
    <main class='scroll-content-2'>
      <section v-if="info.length">
        <ul>
          <li class="item flex just-between align-center" v-for="(item,index) in info" :key="index">
            <div class="flex-1">
              <p class="type">{{formatType(item.tradeType)}}</p>
              <p class="time">{{formatTime(item.addTime)}}</p>
            </div>
            <div class="money">{{item.tradeMoney}}</div>
          </li>
        </ul>
      </section>
      <section class="hv-cen text-center" v-else>
        <span class="iconfont self-noorder" style="font-size:40px;"></span>
        <p>没有数据</p>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { diviHis } from "../../api/index";
export default {
  name: "SaleWelfare",
  data() {
    return {
      info: []
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account"])
  },
  created() {},
  activated() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: diviHis,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: this.account,
          token: md5("diviHis")
        },
        success(res) {
          vm.info = res.result;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
</style>