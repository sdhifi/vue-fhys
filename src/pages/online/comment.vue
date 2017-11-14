<template>
  <div>
    <header-top title="商品评价"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import { getAllProCommetByPage } from "../../api/index";
export default {
  name: "Comment",
  data() {
    return {
      pageNo: 1,
      info: []
    };
  },
  components: { HeaderTop },
  computed: {},
  created() {},
  activated() {},
  methods: {
    getComment() {
      let vm = this;
      mui.ajax({
        url: getAllProCommetByPage,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          proId: this.$route.query.id,
          token: md5(`getAllProCommetByPage${this.$route.query.id}`)
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