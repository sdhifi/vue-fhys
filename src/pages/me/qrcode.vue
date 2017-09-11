<template>
  <div>
    <header-top title="我的二维码"></header-top>
    <main class='scroll-content-2' style="background-color:#fff;">
      <div class="qr-container" :style="{'background-image':formatBg('qrbg.jpg')}">
        <div class="head-info">
          <img :src="qrInfo.imgHeadUrl" alt="">
          <div class="head-name fs-16">
            <p>{{qrInfo.name||qrInfo.nickName||qrInfo.mobile}}</p>
            <span class="iconfont self-male" v-if="qrInfo.sex=='1'"></span>
            <span class="iconfont self-female" v-if="qrInfo.sex=='2'"></span>
          </div>
        </div>
        <img :src="qrInfo.imgAppQrUrl" alt="">
      </div>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { myQr } from '../../api/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'Qrcode',
  data() {
    return {
      qrInfo: {}
    }
  },
  components: { HeaderTop },
  computed: {

  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.getQr();
  },
  methods: {
    getQr() {
      let vm = this;
      mui.ajax({
        url: myQr,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: this.$store.state.account,
          token: md5('myQr')
        },
        success(res) {
          vm.qrInfo = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.qr-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-size: cover;
  background-repeat: no-repeat;
  .head-info {
    padding: .5rem 0 0 .5rem;
    .flex;
    .align-items(center);
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: 10px;
    }
    .head-name {
      color: @white;
      flex: 1;
      .self-male{
        color: @blue;
      }
      .self-female{
        color: @red;
      }
    }
  }
  >img {
    width: 3rem;
    margin: 1.5rem auto 0;
  }
}
</style>