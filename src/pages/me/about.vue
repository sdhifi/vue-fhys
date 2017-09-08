<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2'>
      <iframe :src="videoUrl" frameborder="0"></iframe>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {aboutGjf} from '../../api/index'
export default {
  name: 'About',
  data() {
    return {
      videoUrl:'https://v.qq.com/iframe/player.html?vid=y0317vaal6b&tiny=0&auto=0'
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    //this.getVideo();
  },
  methods: {
    getVideo(){
      let vm = this;
      mui.ajax({
        url: aboutGjf,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          token:md5('aboutGjf')
        },
        success(res){
          vm.videoUrl = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
iframe{
  width: 100%;
  height: 100%;
}
</style>