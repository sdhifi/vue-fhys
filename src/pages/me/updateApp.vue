<template>
  <div>
    <header-top title="APP更新"></header-top>
    <main class='scroll-content-2'>
      <yd-button size="large" @click.native="getInfo">更新</yd-button>
    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import { findAppUpgredeByType } from "../../api/index";
export default {
  name: "UpdateApp",
  data() {
    return {
      type: ""
    };
  },
  components: { HeaderTop },
  computed: {},
  created() {},
  activated() {
    this.init();
  },
  methods: {
    init() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.type = isAndroid ? "0" : "1";
    },
    getInfo() {
      let vm = this;
      mui.ajax({
        url: findAppUpgredeByType,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          type:this.type,
          token:md5('findAppUpgredeByType')
        },
        success(res) {
          console.log(res.result)
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
</style>