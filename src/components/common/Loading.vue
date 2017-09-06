<template>
  <div class="loading-layer" v-show="currentValue">
    <div class="lds-dual-ring">
      <div></div>
      <div></div>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "加载中请稍候"
    }
  },
  data() {
    return {
      currentValue: false,
    }
  },
  created() {
    this.currentValue = this.value;
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.loading-layer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  .just-cont(center);
  .align-items(center);
}

.lds-dual-ring {
  position: relative;
  .wh(3.2rem, 3.2rem);
  background-color: rgba(0, 0, 0, .8);
  border-radius: 10px;
}

.lds-dual-ring div {
  position: absolute;
  left: .6rem;
  top: .6rem;
  .wh(2rem, 2rem);
  border-radius: 50%;
  border: .1rem solid #000;
  border-color: #facd9e transparent #facd9e transparent;
  -webkit-animation: lds-dual-ring 1s linear infinite;
  animation: lds-dual-ring 1s linear infinite;
}

.lds-dual-ring div:nth-child(2) {
  left: .8rem;
  top: .8rem;
  .wh(1.6rem, 1.6rem);
  border-color: transparent #389798 transparent #389798;
  -webkit-animation: lds-dual-ring_reverse 1s linear infinite;
  animation: lds-dual-ring_reverse 1s linear infinite;
}

.lds-dual-ring p {
  position: absolute;
  bottom: 10px;
  font-size: 14px;
  line-height: 1;
  color: #fff;
  left: 0;
  right: 0;
  .text-center;
}

@keyframes lds-dual-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes lds-dual-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>