<template>
  <div>
    <header-top title="订单详情"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import {orderDetail} from "../../api/index";

export default {
  name: "OrderDetail",
  data() {
    return {
      info: {}
    };
  },
  components: { HeaderTop },
  computed: {},
  created() {},
  activated() {
    this.getDetail(this.$route.query.sn);
  },
  methods: {
    getDetail(id) {
      let vm = this;
      mui.ajax({
        url: orderDetail,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: this.account,
          orderSn: this.$route.query.sn,
          token: md5(`detail${this.account}${this.$route.query.sn}`)
        },
        success(res) {}
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
</style>