<template>
  <div class="loading-layer" v-show="currentValue">
    <div class="lds-dual-ring flex just-center align-center">
      <div></div>
      <div></div>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props:{
    value:{
      type:Boolean,
      default:false
    },
    text:{
      type:String,
      default:"加载中请稍候"
    }
  },
  data() {
    return {
      currentValue:false,
    }
  },
  created(){
    this.currentValue = this.value;
  },
  watch:{
    value:{
      handler(val){
        this.currentValue = val;
      },
      immediate: true
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.loading-layer{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
  background-color: rgba(0,0,0,.5);
    
}
.lds-dual-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  .wh(100%,50%);
  -webkit-transform: translate(-50%,-50%) scale(.5);
  transform: translate(-50%,-50%) scale(.5);
  background-color: rgba(0,0,0,.8);
  border-radius: 20px;
  text-align: center;
}
.lds-dual-ring div {
  position: absolute;
  .wh(160px,160px);
  border-radius: 50%;
  border: 8px solid #000;
  border-color: #facd9e transparent #facd9e transparent;
  -webkit-animation: lds-dual-ring 1s linear infinite;
  animation: lds-dual-ring 1s linear infinite;
}
.lds-dual-ring div:nth-child(2) {
  .wh(120px,120px);
  border-color: transparent #389798 transparent #389798;
  -webkit-animation: lds-dual-ring_reverse 1s linear infinite;
  animation: lds-dual-ring_reverse 1s linear infinite;
}
.lds-dual-ring p{
	font-size: 24px;
	color: #fff;
	position: absolute;
	bottom: 10px;
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