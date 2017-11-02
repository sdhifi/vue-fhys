<template>
  <div>
    <header-top title="APP更新"></header-top>
    <main class='scroll-content-2'>
      <section class="app-info text-center">
        <div class="fs-15">当前版本：{{curVersion}}</div>
        <button @click="getInfo" class="save-btn">检查更新</button>
      </section>
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
      type: "",
      curVersion:'' //app版本
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
      this.curVersion = plus.runtime.version;
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
.app-info{
 .hv-cen;
  width:70%;
  div{
    margin-bottom: 10%;
  }
}
</style>