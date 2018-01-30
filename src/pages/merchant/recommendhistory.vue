<template>
  <div>
    <header-top title="联盟商家推荐奖励"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { findMemberDirectMemberMoney } from "../../api/index";
export default {
  name: "RecommendHistory",
  data() {
    return {
      list: []
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account"])
  },
  created() {
    this.getInfo();
  },
  activated() {},
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: findMemberDirectMemberMoney,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: this.account,
          token: md5(`gjfengfindMemberDirectMemberMoney`)
        },
        success(res) {
          vm.list = res.result;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
</style>
