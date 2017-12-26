<template>
  <div>
    <header-top title="扫一扫"></header-top>
    <main class='scroll-content' style="background-color: #000000;">
      <div id="bcid">
        <p class="tip">...载入中...</p>
      </div>
    </main>
    <footer>
        <div class="fbt" @click="back">取　 消</div>
        <div class="fbt" @click="flash">开启闪光灯</div>
      </footer>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
export default {
  name: "Scan",
  data() {
    return {
      scan: null
    };
  },
  components: { HeaderTop },
  created() {},
  mounted() {
    this.initScan();
  },
  methods: {
    initScan() {
      this.scan = new plus.barcode.Barcode(
        "bcid",
        [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
        { frameColor: "#00FF00", scanbarColor: "#00FF00" }
      );
      this.scan.onmarked = function(type, code, file) {
        console.log(code);
        code = code.replace(/\n/g, "");
        plus.runtime.openURL(code);
      };
      this.scan.start();
    },
    back() {
      this.scan.close();
      this.scan.cancel();
      this.$router.go(-1);
      // mui.back();
    },
    flash() {
      this.scan.setFlash();
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
#bcid {
  width: 100%;
  position: absolute;
  top: 0;
  bottom:0;
  text-align: center;
  .tip {
    .hv-cen;
    color: @white;
    font-weight: bold;
    text-shadow: 0px -1px #103e5c;
    font-size: 0.32rem;
  }
}

footer {
  position: absolute;
  .wh(100%,1rem);
  bottom: 0px;
  line-height:1rem;
  text-align: center;
  color: @white;
  font-size: 0.32rem;
  .fbt {
    width: 50%;
    height: 100%;
    background-color: #ffcc33;
    float: left;
  }
  .fbt:active {
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
  }
}
</style>