<template>
  <div>
    <header-top title="我的二维码"></header-top>
    <main class='scroll-content-2'>
      <section class="qr-container">
        <div class="head-box">
          <img :src="qrInfo.imgHeadUrl" alt="头像">
        </div>
        <div class="qr-box">
          <img src="http://jfh.jfeimao.com/gjfeng-web-client/upload/member/qr-code/922f6d9a39e80be4f248d91efaf177f5.png" alt="">
          <!-- <img :src="qrInfo.imgAppQrUrl" alt="二维码"> -->
        </div>
        <div class="qr-img img-1" :style="{'background-image':formatBg('qr-1.png')}"></div>
        <div class="qr-img img-2" :style="{'background-image':formatBg('qr-2.png')}"></div>
        <div class="qr-img img-3" :style="{'background-image':formatBg('qr-3.png')}"></div>
        <div class="qr-img img-4" :style="{'background-image':formatBg('qr-4.png')}"></div>
        <div class="qr-img img-5" :style="{'background-image':formatBg('qr-5.png')}"></div>
        <div class="qr-desc fs-16">消费变分红，红包天天有！</div>
      </section>
      <section class="share-container text-center">
        <h3 class="fs-16">分享到</h3>
        <ul class="flex just-around align-center">
          <li>
            <span class="iconfont self-weixin" style="font-size:.6rem;color:#6eb243"></span>
            <p class="fs-14">微信</p>
          </li>
          <li>
            <span class="iconfont self-pengyouquan" style="font-size:.6rem;color:#52bfa2;"></span>
            <p class="fs-14">朋友圈</p>
          </li>
          <li>
            <span class="iconfont self-weibo" style="font-size:.6rem;color:#cf6558;"></span>
            <p class="fs-14">微博</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import { myQr } from "../../api/index";
import { mixin } from "components/common/mixin";
export default {
  name: "Qrcode",
  data() {
    return {
      qrInfo: {},
      shares: {}
    };
  },
  components: { HeaderTop },
  computed: {},
  mixins: [mixin],
  created() {
    this.getQr();
    this.updateServices();
  },
  activated() {},
  methods: {
    getQr() {
      let vm = this;
      mui.ajax({
        url: myQr,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: this.$store.state.account,
          token: md5("myQr")
        },
        success(res) {
          vm.qrInfo = res.result;
        }
      });
    },
    updateServices() {
      plus.share.getServices(s => {
        for (var i in s) {
          var t = s[i];
          this.shares[t.id] = t;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.qr-container {
  position: relative;
  top: 1.3rem;
  width: 6.5rem;
  background-color: @white;
  margin: 0 auto;
  padding: 1rem 0 1.8rem;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(232, 142, 44, 0.3);
  text-align: center;
  .head-box {
    .h-cen;
    top: -1rem;
    .wh(1.8rem,1.8rem);
    border: 5px solid rgba(232, 142, 44, 0.3);
    border-radius: 50%;
    z-index: 5;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .qr-box {
    .wh(4rem,4rem);
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .qr-img {
    position: absolute;
    .wh(1rem,1rem);
    background-size: cover;
    opacity: 0.5;
    &.img-1 {
      top: 0.5rem;
      left: -0.2rem;
    }
    &.img-2 {
      opacity: 0.8;
      top: 0.3rem;
      right: 0.2rem;
    }
    &.img-3 {
      opacity: 1;
      bottom: 1.2rem;
      left: 0.4rem;
    }
    &.img-4 {
      right: -0.2rem;
      bottom: 0.2rem;
    }
    &.img-5 {
      right: 0.4rem;
      bottom: -0.2rem;
    }
  }
  .qr-desc {
    .h-cen;
    bottom: 0.8rem;
    width: 5rem;
  }
}
.share-container {
  background-color: @white;
  width: 6rem;
  margin: 2rem auto 0;
  padding: 0.3rem 0;
  color: #333;
  h3 {
    margin-bottom: @pd;
  }
  p {
    margin-top: @pd;
  }
}
</style>